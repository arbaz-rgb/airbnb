const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

router.get("/book/:homeId", bookingController.getBookingForm);
router.post("/book", bookingController.postBooking);
router.get("/my-bookings", bookingController.getUserBookings);

module.exports = router;
