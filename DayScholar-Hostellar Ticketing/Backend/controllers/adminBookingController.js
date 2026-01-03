const Booking = require("../models/Booking");
exports.getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    } 

    const bookings = await Booking.find()
      .populate("userId", "name email")   
      .populate("busId", "from to time date"); 

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error getting all bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};