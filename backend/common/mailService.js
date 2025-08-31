const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587, // or 587 if you use TLS
    secure: false, // use SSL, set to false if using port 587
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_USER_PASSWORD
    }
});

const sendEmail = (to, subject, html) => {
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: to,
        subject: subject,
        html: html,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                resolve({
                    emailSent: false,
                    message: "Email sending failed",
                    error: error
                });
            } else {
                console.log('Email sent:', info.response);
                resolve({
                    emailSent: true,
                    message: "Email sent successfully",
                    info: info
                });
            }
        });
    });
};

module.exports = sendEmail;
