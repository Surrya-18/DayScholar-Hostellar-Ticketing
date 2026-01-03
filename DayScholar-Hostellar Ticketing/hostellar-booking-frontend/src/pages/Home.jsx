import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCTA = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "user") {
      navigate("/bookings");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="home-container">
        <h1 className="home-title">🏫 Day-Scholar Ticket Booking</h1>
        <p className="home-subtitle">
          Book your daily ride from home to campus with just a few clicks.
        </p>

        <button className="home-cta" onClick={handleCTA}>
          Book Your Ticket
        </button>
      </div>
    </div>
  );
}

export default Home;
