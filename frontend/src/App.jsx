import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Doctors from "./pages/Doctors.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact.jsx";
import Appointments from "./pages/Appointments.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyStripe from './pages/VerifyStripe.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
        toastStyle={{
          background: '#0f0f1a',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#e2e8f0'
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointments />} />
        <Route path='/verify-stripe' element={<VerifyStripe />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

 