const mongoose = require('mongoose');
function getDateOnly() {
  const now = new Date();
  return new Date(now.setHours(0, 0, 0, 0));
}
const busRouteSchema = new mongoose.Schema({
  from: String,
  to: String,
   date: { type: Date, default: getDateOnly },
  time: String,
  fare: Number,
  totalSeats: Number,
  availableSeats: Number
});

module.exports = mongoose.model('BusRoute', busRouteSchema);
