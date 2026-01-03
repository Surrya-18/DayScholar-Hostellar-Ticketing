import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Routes.css";

function Routes() {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/routes");
        setBuses(res.data);
      } catch (err) {
        console.error("Failed to fetch buses", err);
      }
    };
    fetchBuses();
  }, []);

  const getSeatClass = (seats) => {
    if (seats === 0) return "seats-full";
    if (seats <= 5) return "seats-low";
    if (seats <= 10) return "seats-medium";
    return "seats-available";
  };

  const handleBook = (busId) => {
    navigate(`/book/${busId}`);
  };

  return (
    <div className="routes-container">
      <h2>Available Bus Routes</h2>
      <div className="routes-grid">
        {buses.map((bus) => (
          <div key={bus._id} className="bus-card">
            <h3>{bus.from} → {bus.to}</h3>
            <p>Date: {new Date(bus.date).toISOString().split("T")[0]}</p>

            <p>Time: {bus.time}</p>
            <p>Fare: ₹{bus.fare}</p>

            <p className={`seats-status ${getSeatClass(bus.availableSeats)}`}>
              Seats Left: {bus.availableSeats}
            </p>

            <button
              className="book-btn"
              onClick={() => handleBook(bus._id)}
              disabled={bus.availableSeats === 0}
            >
              {bus.availableSeats === 0 ? "Full" : "Book Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Routes;
