const express = require("express");
const router = express.Router();
const { bookSeat, getMyBookings } = require("../controllers/bookingController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getAllBookings } = require("../controllers/adminBookingController");
const { cancelBooking } = require("../controllers/bookingController");


router.post("/book", authMiddleware, bookSeat);
router.get("/my", authMiddleware, getMyBookings);
router.put("/cancel/:id", authMiddleware, cancelBooking);


router.get("/all", authMiddleware, getAllBookings);


module.exports = router;
