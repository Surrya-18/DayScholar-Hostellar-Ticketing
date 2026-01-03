const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "BusRoute" },
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
  bookedAt: { type: Date, default: Date.now },
  fare: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);
