const Booking = require("../models/Booking");
const BusRoute = require("../models/BusRoute");

exports.bookSeat = async (req, res) => {
  const userId = req.user.userId;
  const { busId } = req.body;

  try {
    const bus = await BusRoute.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus route not found" });

    if (bus.availableSeats <= 0)
      return res.status(400).json({ message: "No seats available" });

   
    bus.availableSeats -= 1;
    await bus.save();

   
   

    const booking = new Booking({
      userId,
      busId,
      fare:bus.fare 
    });

    await booking.save();

    res.status(201).json({ message: "Seat booked", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyBookings = async (req, res) => {
  const userId = req.user.userId; 

  try {
    const bookings = await Booking.find({ userId })
      .populate("busId"); 
    
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.userId;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

   
    if (booking.userId.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

   
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

  
    booking.status = "cancelled";
    await booking.save();

 
    const bus = await BusRoute.findById(booking.busId);
    if (bus) {
      bus.availableSeats += 1;
      await bus.save();
    }

    res.status(200).json({ message: "Booking cancelled", booking });
  } catch (error) {
    console.error("Cancel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

