import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
import Bookings from './pages/Routes';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import CreateRoute from './pages/CreateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/book/:busId" element={<BookingForm />} />
      <Route path="/myBookings" element={<MyBookings/>}/>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/createroute" element={<CreateRoute/>}/>
    </Routes>
  );
}

export default App;
