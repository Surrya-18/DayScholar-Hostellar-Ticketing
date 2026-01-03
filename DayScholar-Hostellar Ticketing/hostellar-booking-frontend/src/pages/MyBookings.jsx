import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/MyBookings.css"; 

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        alert(err.response?.data?.message || "Could not load your bookings");
      }
    };

    fetchBookings();
  }, []);

  if (bookings.length === 0) {
    return <p className="no-bookings-msg">🚌 No bookings made yet.</p>;
  }

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>
      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <p><strong>From:</strong> {booking.busId?.from}</p>
            <p><strong>To:</strong> {booking.busId?.to}</p>
            <p>
            <strong>Date:</strong>{" "}
             {booking.busId?.date
                ? new Date(booking.busId.date).toISOString().split("T")[0]
                : "N/A"}
            </p>


            <p><strong>Time:</strong> {booking.busId?.time}</p>
            <p><strong>Fare:</strong> ₹{booking.fare}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`booking-status ${
                  booking.status === "cancelled" ? "status-cancelled" : "status-booked"
                }`}
              >
                {booking.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
