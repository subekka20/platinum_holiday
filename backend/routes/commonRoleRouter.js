const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const { 
    getAllBookings,
    getBookingChargesWithCouponCodeAndCorrespondingDiscount,
    findAllVendors,
    getAllAirports
 } = require("../controller/commonRoleController");
 
//endpoint to get all bookings
 router.get("/get-all-bookings", authMiddleware, getAllBookings);

//endpoint to get all booking charges with coupon code and discount
router.get("/find-all-booking-charges-couponcode-discount", getBookingChargesWithCouponCodeAndCorrespondingDiscount);

//endpoint to find all vendors
 router.get("/find-all-vendors", findAllVendors);

//endpoint to get all the airports name in the db
router.get("/get-all-airports", getAllAirports);
 

 module.exports = router;