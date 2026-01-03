import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/CreateRoute.css";

function CreateRoute() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    totalSeats: "",
    fare: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/routes/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Route created successfully!");
      setFormData({
        from: "",
        to: "",
        date: "",
        time: "",
        totalSeats: "",
        fare: "",
      });

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create route");
    }
  };

  return (
    <div className="create-route-container">
      <h2>Create New Bus Route</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="from"
          placeholder="From"
          value={formData.from}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="fare"
          placeholder="Fare"
          value={formData.fare}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Route</button>
      </form>
    </div>
  );
}

export default CreateRoute;
