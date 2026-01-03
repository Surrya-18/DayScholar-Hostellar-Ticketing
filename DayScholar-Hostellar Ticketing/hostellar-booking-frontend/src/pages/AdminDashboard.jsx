import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/AdminDashboard.css";

function AdminDashboard() {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/routes");
      setRoutes(res.data);
    } catch (err) {
      console.error("Failed to fetch routes", err);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>🛠️ Admin Dashboard</h2>
      <button className="create-btn" onClick={() => navigate("/createroute")}>
        ➕ Create New Route
      </button>

      <h3 className="route-heading">📋 All Bus Routes</h3>
      <table className="routes-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Time</th>
            <th>Fare</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id}>
              <td>{route.from}</td>
              <td>{route.to}</td>
              <td>{route.date}</td>
              <td>{route.time}</td>
              <td>₹{route.fare}</td>
              <td>
                {route.availableSeats} / {route.totalSeats}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
