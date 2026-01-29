// Use global fetch if available (Node 18+), otherwise dynamically import node-fetch (ESM)
const fetch = (...args) =>
  typeof globalThis.fetch === "function"
    ? globalThis.fetch(...args)
    : import("node-fetch").then(({ default: f }) => f(...args));

let cachedToken = null;
let cachedTokenExpiry = 0; // epoch ms

async function getAccessToken() {
  const now = Date.now();

  // Reuse token if still valid (with 60s buffer)
  if (cachedToken && now < cachedTokenExpiry - 60_000) {
    return cachedToken;
  }

  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Missing MS_TENANT_ID / MS_CLIENT_ID / MS_CLIENT_SECRET env vars");
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Token error: ${res.status} ${JSON.stringify(data)}`);
  }

  cachedToken = data.access_token;
  // expires_in is seconds
  cachedTokenExpiry = now + (data.expires_in * 1000);

  return cachedToken;
}

async function sendEmail(to, subject, html) {
  try {
    const fromEmail = process.env.NODEMAILER_USER;
    if (!fromEmail) {
      throw new Error("Missing NODEMAILER_USER (sender email)");
    }

    const token = await getAccessToken();

    // Use /users/{sender}/sendMail (works well for application permissions)
    const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromEmail)}/sendMail`;

    const payload = {
      message: {
        subject: subject,
        body: {
          contentType: "HTML",
          content: html || "",
        },
        toRecipients: [
          {
            emailAddress: { address: to },
          },
        ],
      },
      saveToSentItems: true,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Graph sendMail returns 202 Accepted on success
    if (res.status === 202) {
      return {
        emailSent: true,
        message: "Email sent successfully (Graph API)",
        info: { status: res.status },
      };
    }

    const errText = await res.text(); // Graph often returns useful JSON text
    return {
      emailSent: false,
      message: "Email sending failed (Graph API)",
      error: { status: res.status, body: errText },
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      emailSent: false,
      message: "Email sending failed",
      error: error?.message || error,
    };
  }
}

module.exports = sendEmail;
