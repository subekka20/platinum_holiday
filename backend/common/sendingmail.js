const User = require('../models/userModel');
const VendorTerminal = require('../models/vendorTerminalModel');
const ServiceType = require('../models/serviceTypeModel');
const sendEmail = require('./mailService');

const sendEmailToUser = async (booking, user, type) => {
    // Get company details
    const company = await User.findById(booking.companyId)
        .select("email companyName serviceType overView pickUpProcedure dropOffProcedure")
        .lean()
        .exec();

    if (!company) {
        throw new Error("Company not found");
    }

    // Get vendor terminal details
    const vendorTerminal = await VendorTerminal.findOne({ vendor_id: booking.companyId })
        .lean()
        .exec();

    let serviceTypeDescription = '';
    if (vendorTerminal) {
        // Get service type description from ServiceType table
        const serviceTypeData = await ServiceType.findOne({ type: vendorTerminal.service_type })
            .lean()
            .exec();
        
        if (serviceTypeData) {
            serviceTypeDescription = serviceTypeData.description;
        }
    }

    return sendEmail(
        user.email,
        `Booking ${type === "Cancelled"
            ? "Cancelled!"
            : type === "Failed"
                ? "Failed!"
                : "Confirmed!"
        }`,
        `
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link
                  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                  rel="stylesheet">
              <title>Platinum Holiday Service</title>
          </head>
  
          <body>
          <style>
                  * {
                      box-sizing: border-box;
                      font-family: "Poppins", sans-serif !important;
                      scroll-behavior: smooth;
                      margin: 0;
                      padding: 0;
                  }
  
                  .mt-1 {
                      margin-top: .25rem !important;
                  }
  
                  .mt-2 {
                      margin-top: .5rem !important;
                  }
  
                  .mt-3 {
                      margin-top: 1rem !important;
                  }
  
                  .mt-4 {
                      margin-top: 1.5rem !important;
                  }
  
                  .mt-5 {
                      margin-top: 3rem !important;
                  }
  
                  .mb-1 {
                      margin-bottom: .25rem !important;
                  }
  
                  .mb-2 {
                      margin-bottom: .5rem !important;
                  }
  
                  .mb-3 {
                      margin-bottom: 1rem !important;
                  }
  
                  .mb-4 {
                      margin-bottom: 1.5rem !important;
                  }
  
                  .mb-5 {
                      margin-bottom: 3rem !important;
                  }
  
                  .text-bold {
                      font-weight: 600 !important;
                  }
  
                  .text-center {
                      text-align: center;
                  }
  
                  .font-weight-normal {
                      font-weight: 400 !important;
                  }
  
                  .booking_info_area ul {
                      padding-left: 40px;
                  }
  
                  .booking_info_area ul li {
                      font-size: 14px;
                      color: #000;
                      margin-bottom: 5px;
                  }
  
                  .booking_info_area {
                      position: relative;
                      padding: 20px;
                  }
  
                  .booking_info_header {
                      width: 100%;
                      position: relative;
                      background-color: #e7e7fa;
                      padding: 15px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 10px;
                  }
  
                  .booking_info_header img {
                      height: 60px;
                      object-fit: contain;
                  }
  
                  .booking_info_title {
                      font-size: 25px;
                      color: #000;
                      font-weight: 700;
                      margin: 20px 0 30px 0;
                  }
  
                  .booking_info_area p {
                      font-size: 14px;
                      color: #000;
                      font-weight: 400;
                  }
  
                  .booking_head {
                      font-size: 20px;
                      color: #000;
                      margin-bottom: 20px;
                  }
  
                  .booking_sub_head {
                      font-size: 16px;
                      color: #000;
                      margin-bottom: 15px;
                  }
  
                  .booking_info_area a {
                      color: #d12788;
                      text-wrap: nowrap;
                  }
  
                  .booking_footer_text {
                      font-size: 16px;
                      font-weight: 400;
                  }
  
                  .booking_accept_area {
                      display: flex;
                      gap: 15px;
                      flex-wrap: wrap;
                      align-items: center;
                      justify-content: center;
                  }
  
                  .table-container {
                      width: 100%;
                      overflow-x: auto;
                  }
  
                  table {
                      width: 100%;
                      border-collapse: collapse;
                      font-size: 14px;
                  }
  
                  thead th {
                      background-color: #f2f2f2;
                      text-align: left;
                      padding: 10px;
                      border: 1px solid #ddd;
                  }
  
                  tbody th {
                      background-color: #f9f9f9;
                      text-align: left;
                      padding: 10px;
                      border: 1px solid #ddd;
                  }
  
                  tbody td {
                      padding: 10px;
                      border: 1px solid #ddd;
                  }
  
                  @media screen and (max-width: 600px) {
  
                      table,
                      tbody,
                      th,
                      td,
                      tr {
                          display: block;
                          width: 100%;
                      }
  
                      tbody th,
                      tbody td {
                          text-align: left;
                          padding-left: 15px;
                          padding-right: 15px;
                          position: relative;
                      }
  
                      tbody th::before,
                      tbody td::before {
                          content: attr(data-label);
                          position: absolute;
                          left: 0;
                          width: 100%;
                          padding-left: 10px;
                          font-weight: bold;
                          text-align: left;
                      }
                  }
              </style>
              <div class="booking_info_area">
                  <div class="booking_info_header">
                      <img src="https://www.theparkingdeals.co.uk/assets/images/logo.png" alt="Platinum Holiday Service">
                  </div>
                  <h3 class="booking_info_title">Booking ${type === "Cancelled"
            ? "Cancelled!"
            : type === "Failed"
                ? "Failed!"
                : "Confirmed!"
        }</h3>
                  <p class="mb-4">Dear ${user.firstName},</p>
  
                  <p class="mb-3">
                      Thank you for booking with
                      <b> ${company.companyName}</b>
                      through us. You will find your booking details and
                      next steps below. You can
                      view, amend or print your booking online by visiting our Manage my booking page.
                  </p>
  
                  <h4 class="booking_head">
                      Booking ${type === "Cancelled"
            ? "Cancelled!"
            : type === "Failed"
                ? "Failed!"
                : "Confirmed!"
        }:&nbsp;
                      <span>${booking.bookingId}</span>
                  </h4>
  
                  <div class="table-container">
                      <table>
                          <tbody>
                              <tr>
                                  <th>Booked By</th>
                                  <td>${user.title} ${user.firstName} ${user.lastname || ""
        }</td>
                                  <th>Flying From</th>
                                  <td>${booking.airportName}</td>
                              </tr>
                              <tr>
                                  <th>Service</th>
                                  <td>${company.companyName}</td>
                                  <th>Inbound Flight</th>
                                  <td>${booking.travelDetail.inBoundFlight || "-"
        }</td>
                              </tr>
                              <tr>
                                  <th>Service Type</th>
                                  <td>${company.serviceType}</td>
                                  <th>Extras</th>
                                  <td>Cancellation Cover: ${booking.cancellationCoverFee ? "Yes" : "No"
        }</td>
                              </tr>
                              <tr>
                                  <th>From</th>
                                  <td>${booking.dropOffDate} ${booking.dropOffTime
        }</td>
                                  <th>Inbound Terminal</th>
                                  <td>${booking.travelDetail.arrivalTerminal
        }</td>
                              </tr>
                              <tr>
                                  <th>To</th>
                                  <td>${booking.pickUpDate} ${booking.pickUpTime
        }</td>
                                  <th>Outbound Terminal</th>
                                  <td>${booking.travelDetail.departureTerminal
        }</td>
                              </tr>
                              ${booking.vehicleDetail
            .map(
                (vehicle) => `
                              <tr>
                                  <th colspan="4" class="text-center">Vehicle Details</th>
                              </tr>
                              <tr>
                                  <th>Reg No</th>
                                  <td>${vehicle.regNo}</td>
                                  <th>Color</th>
                                  <td>${vehicle.color}</td>
                              </tr>
                              <tr>
                                  <th>Make</th>
                                  <td>${vehicle.make || "-"}</td>
                                  <th>Model</th>
                                  <td>${vehicle.model || "-"}</td>
                              </tr>`
            )
            .join("")}
                              <tr>
                                  <th colspan="4" class="text-center">Total Amount: £${booking.totalPayable
        }</th>
                              </tr>
                          </tbody>
                      </table>
                      
                  </div>

                  ${serviceTypeDescription ? `
                  <h4 class="booking_head mt-5">
                      Service Type Information
                  </h4>
                  <p class="mb-3">
                      ${serviceTypeDescription}
                  </p>
                  ` : ''}

                  ${company.overView ? `
                  <h4 class="booking_head mt-5">
                      Service Overview
                  </h4>
                  <p class="mb-3">
                      ${company.overView}
                  </p>
                  ` : ''}

                  ${company.dropOffProcedure ? `
                  <h4 class="booking_head mt-4">
                      Drop-Off Procedure
                  </h4>
                  <div class="mb-3">
                      ${company.dropOffProcedure}
                  </div>
                  ` : ''}

                  ${company.pickUpProcedure ? `
                  <h4 class="booking_head mt-4">
                      Pick-Up Procedure
                  </h4>
                  <div class="mb-3">
                      ${company.pickUpProcedure}
                  </div>
                  ` : ''}

                  <p class="mt-4">
                      Note: Platinum Holiday Service acts as booking agents only and do not store or handle customer vehicles. 
                      Your service delivery contract will be with <span>${company.companyName}.</span>
                  </p>

                  <p class="mt-2">
                      For any questions or support, please contact us:
                  </p>
                  
                  <p class="mt-2">
                      <b>Phone: <a href="tel:07777135649">07777135649</a></b>
                  </p>
                  <p class="mt-2">
                      <b>Email: <a href="mailto:info@platinumholidayservice.co.uk">info@platinumholidayservice.co.uk</a></b>
                  </p>

                  <h6 class="mt-5 booking_footer_text">
                      Platinum Holiday Service is a trading name of Air Travel Extras Limited. Platinum Holiday Service uses 3rd party payment
                      processing companies to accept payments. Therefore, you may see their name on your bank/card statements.
                  </h6>

                  <h6 class="mt-3 booking_footer_text mb-4">
                      <b>
                          We use cookies to improve your experience on our site. By continuing to browse the site, you agree to
                          our use of
                          <a href="https://www.theparkingdeals.co.uk/terms-and-conditions" rel="noopener"
                              target="_blank">cookies</a>
                          &nbsp;&&nbsp;
                          <a href="https://www.theparkingdeals.co.uk/privacy-policy" rel="noopener"
                              target="_blank">privacy-policy</a>
                      </b>
                  </h6>

                  <hr class="mb-3">

                  <h4 class="booking_head mb-2">
                      Contact Us
                  </h4>

                  <p>
                      <b>
                          <a href="mailto:info@platinumholidayservice.co.uk">
                              info@platinumholidayservice.co.uk
                          </a>
                      </b>
                  </p>

                  <p class="mt-2">
                      <b><a href="tel:07777135649">07777135649</a></b>
                  </p>

                  <hr class="mt-4">

                  <h4 class="booking_head mt-4 mb-2 text-center">
                      We Accept
                  </h4>

                  <div class="booking_accept_area">
                      <img src="https://i.ibb.co/tmGWs0x/6220ac7d912013c51947f9c6.png" height="50" alt="Stripe">
                  </div>
              </div>
          </body>
          `
    );
};

const sendEmailToCompany = async (booking, user, type) => {
    const company = await User.findById(booking.companyId)
        .select("email companyName serviceType")
        .lean()
        .exec();

    if (!company) {
        throw new Error("Company not found");
    }

    return sendEmail(
        company.email,
        `${type === "Cancelled"
            ? "Parking Slot Booking Cancelled!"
            : type === "Failed"
                ? "Parking Slot Booking Failed!"
                : "Parking slot has been Booked!"
        }`,
        `
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link
                  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                  rel="stylesheet">
              <title>Platinum Holiday Service</title>
          </head>
  
          <body>
          <style>
                  * {
                      box-sizing: border-box;
                      font-family: "Poppins", sans-serif !important;
                      scroll-behavior: smooth;
                      margin: 0;
                      padding: 0;
                  }
  
                  .mt-1 {
                      margin-top: .25rem !important;
                  }
  
                  .mt-2 {
                      margin-top: .5rem !important;
                  }
  
                  .mt-3 {
                      margin-top: 1rem !important;
                  }
  
                  .mt-4 {
                      margin-top: 1.5rem !important;
                  }
  
                  .mt-5 {
                      margin-top: 3rem !important;
                  }
  
                  .mb-1 {
                      margin-bottom: .25rem !important;
                  }
  
                  .mb-2 {
                      margin-bottom: .5rem !important;
                  }
  
                  .mb-3 {
                      margin-bottom: 1rem !important;
                  }
  
                  .mb-4 {
                      margin-bottom: 1.5rem !important;
                  }
  
                  .mb-5 {
                      margin-bottom: 3rem !important;
                  }
  
                  .text-bold {
                      font-weight: 600 !important;
                  }
  
                  .text-center {
                      text-align: center;
                  }
  
                  .font-weight-normal {
                      font-weight: 400 !important;
                  }
  
                  .booking_info_area ul {
                      padding-left: 40px;
                  }
  
                  .booking_info_area ul li {
                      font-size: 14px;
                      color: #000;
                      margin-bottom: 5px;
                  }
  
                  .booking_info_area {
                      position: relative;
                      padding: 20px;
                  }
  
                  .booking_info_header {
                      width: 100%;
                      position: relative;
                      background-color: #e7e7fa;
                      padding: 15px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 10px;
                  }
  
                  .booking_info_header img {
                      height: 60px;
                      object-fit: contain;
                  }
  
                  .booking_info_title {
                      font-size: 25px;
                      color: #000;
                      font-weight: 700;
                      margin: 20px 0 30px 0;
                  }
  
                  .booking_info_area p {
                      font-size: 14px;
                      color: #000;
                      font-weight: 400;
                  }
  
                  .booking_head {
                      font-size: 20px;
                      color: #000;
                      margin-bottom: 20px;
                  }
  
                  .booking_sub_head {
                      font-size: 16px;
                      color: #000;
                      margin-bottom: 15px;
                  }
  
                  .booking_info_area a {
                      color: #d12788;
                      text-wrap: nowrap;
                  }
  
                  .booking_footer_text {
                      font-size: 16px;
                      font-weight: 400;
                  }
  
                  .booking_accept_area {
                      display: flex;
                      gap: 15px;
                      flex-wrap: wrap;
                      align-items: center;
                      justify-content: center;
                  }
  
                  .table-container {
                      width: 100%;
                      overflow-x: auto;
                  }
  
                  table {
                      width: 100%;
                      border-collapse: collapse;
                      font-size: 14px;
                  }
  
                  thead th {
                      background-color: #f2f2f2;
                      text-align: left;
                      padding: 10px;
                      border: 1px solid #ddd;
                  }
  
                  tbody th {
                      background-color: #f9f9f9;
                      text-align: left;
                      padding: 10px;
                      border: 1px solid #ddd;
                  }
  
                  tbody td {
                      padding: 10px;
                      border: 1px solid #ddd;
                  }
  
                  @media screen and (max-width: 600px) {
  
                      table,
                      tbody,
                      th,
                      td,
                      tr {
                          display: block;
                          width: 100%;
                      }
  
                      tbody th,
                      tbody td {
                          text-align: left;
                          padding-left: 15px;
                          padding-right: 15px;
                          position: relative;
                      }
  
                      tbody th::before,
                      tbody td::before {
                          content: attr(data-label);
                          position: absolute;
                          left: 0;
                          width: 100%;
                          padding-left: 10px;
                          font-weight: bold;
                          text-align: left;
                      }
                  }
              </style>
  
              <div class="booking_info_area">
                  <div class="booking_info_header">
                      <img src="https://www.theparkingdeals.co.uk/assets/images/logo.png" alt="Platinum Holiday Service">
                  </div>
                  
                  <h4 class="booking_head">
                      Booking ${type === "Cancelled"
            ? "Cancelled!"
            : type === "Failed"
                ? "Failed!"
                : "Confirmed!"
        }:&nbsp;
                      <span>${booking.bookingId}</span>
                  </h4>
  
                  <div class="table-container">
                      <table>
                          <tbody>
                              <tr>
                                  <th>Booked By</th>
                                  <td>${user.title} ${user.firstName} ${user.lastname || ""
        }</td>
                                  <th>Flying From</th>
                                  <td>${booking.airportName}</td>
                              </tr>
                              <tr>
                                  <th>Service</th>
                                  <td>${company.companyName}</td>
                                  <th>Inbound Flight</th>
                                  <td>${booking.travelDetail.inBoundFlight || "-"
        }</td>
                              </tr>
                              <tr>
                                  <th>From</th>
                                  <td>${booking.dropOffDate} ${booking.dropOffTime
        }</td>
                                  <th>Inbound Terminal</th>
                                  <td>${booking.travelDetail.arrivalTerminal
        }</td>
                              </tr>
                              <tr>
                                  <th>To</th>
                                  <td>${booking.pickUpDate} ${booking.pickUpTime
        }</td>
                                  <th>Outbound Terminal</th>
                                  <td>${booking.travelDetail.departureTerminal
        }</td>
                              </tr>
                              <tr>
                                  <th>Mobile Number</th>
                                  <td>${user.mobileNumber}</td>
                                  <th>Service Type</th>
                                  <td>${company.serviceType}</td>
                              </tr>
                              ${booking.vehicleDetail
            .map(
                (vehicle) => `
                              <tr>
                                  <th colspan="4" class="text-center">Vehicle Details</th>
                              </tr>
                              <tr>
                                  <th>Reg No</th>
                                  <td>${vehicle.regNo}</td>
                                  <th>Color</th>
                                  <td>${vehicle.color}</td>
                              </tr>
                              <tr>
                                  <th>Make</th>
                                  <td>${vehicle.make || "-"}</td>
                                  <th>Model</th>
                                  <td>${vehicle.model || "-"}</td>
                              </tr>`
            )
            .join("")}
                              <tr>
                                  <th colspan="4" class="text-center">Total Amount: £${booking.bookingQuote
        }</th>
                              </tr>
                          </tbody>
                      </table>
                      
                  </div>
  
                  <h6 class="mt-5 booking_footer_text">
                      Platinum Holiday Service is a trading name of Air Travel Extras Limited. Platinum Holiday Service uses 3rd party payment
                      processing companies to accept payments. Therefore, you may see their name on your bank/card statements.
                  </h6>
  
                  <h6 class="mt-3 booking_footer_text mb-4">
                      <b>
                          We use cookies to improve your experience on our site. By continuing to browse the site, you agree to
                          our use of
                          <a href="https://www.theparkingdeals.co.uk/terms-and-conditions" rel="noopener"
                              target="_blank">cookies</a>
                          &nbsp;&&nbsp;
                          <a href="https://www.theparkingdeals.co.uk/privacy-policy" rel="noopener"
                              target="_blank">privacy-policy</a>
                      </b>
                  </h6>
  
                  <hr class="mb-3 ">
  
                  <h4 class="booking_head mb-2">
                      Contact Us
                  </h4>
  
                  <p>
                      <b>
                          <a href="mailto:info@platinumholidayservice.co.uk">
                              info@platinumholidayservice.co.uk
                          </a>
                      </b>
                  </p>
  
                  <p class="mt-2">
                      <b><a href="tel:07777135649">07777135649</a></b>
                  </p>
  
                  <hr class="mt-4">
              </div>
          </body>
                `
    );
};

module.exports = { sendEmailToUser, sendEmailToCompany };