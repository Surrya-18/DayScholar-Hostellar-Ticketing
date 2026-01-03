import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

   const handleLogout = () => {
  
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">🎟️ Day-Scholar Booking</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!token && (
          <li><Link to="/login">Login / Register</Link></li>
        )}

        {token && user?.role === "user" && (
          <>
            <li><Link to="/bookings">Routes</Link></li>
            <li><Link to="/myBookings">My Bookings</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}

        {token && user?.role === "admin" && (
          <>
            <li><Link to="/admin">Admin Dashboard</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
