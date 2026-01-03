import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./BookingForm.css"; 

function BookingForm() {
  const { busId } = useParams();
  const [bus, setBus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/routes/${busId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBus(res.data);
      } catch (err) {
        console.error("Error fetching bus details", err);
        alert(err.response?.data?.message || "Unauthorized or failed to fetch bus");
      }
    };

    fetchBus();
  }, [busId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post(
        "http://localhost:5000/api/bookings/book",
        { busId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (!bus) return <p>Loading bus details...</p>;

  return (
    <div className="booking-container">
      <h2>Confirm Your Booking</h2>
      <div className="booking-card">
        <p><strong>From:</strong> {bus.from}</p>
        <p><strong>To:</strong> {bus.to}</p>
        <p><strong>Date:</strong> {bus.date}</p>
        <p><strong>Time:</strong> {bus.time}</p>
        <p><strong>Fare:</strong> ₹{bus.fare}</p>
        <p><strong>Seats Left:</strong> {bus.availableSeats}</p>

        <button
          onClick={handleBooking}
          className="confirm-btn"
          disabled={bus.availableSeats === 0}
        >
          {bus.availableSeats === 0 ? "Bus Full" : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default BookingForm;
