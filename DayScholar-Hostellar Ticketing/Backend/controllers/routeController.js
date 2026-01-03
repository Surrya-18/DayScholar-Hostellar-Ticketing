const BusRoute = require("../models/BusRoute");

exports.createRoute = async (req, res) => {
  const { from, to, time,fare, totalSeats } = req.body;
  try {
    const route = new BusRoute({
      from,
      to,
      time,
      fare,
      totalSeats,
      availableSeats: totalSeats
    });
    await route.save();
    res.status(201).json({ message: "Route created successfully", route });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await BusRoute.find();
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getBusById = async (req, res) => {
  try {
    const bus = await BusRoute.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (err) {
    console.error("Error fetching bus:", err);
    res.status(500).json({ message: "Server error" });
  }
};