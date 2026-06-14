import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAppointments = () => {
  const { token, backendUrl, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);
  const navigate = useNavigate();

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUsersAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      setPayingId(appointmentId);
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Payment failed. Try again.");
    }
    setPayingId(null);
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
      getDoctorsData();
    }
  }, [token]);

  const getStatusBadge = (item) => {
    if (item.cancelled) return { label: "Cancelled", color: "text-red-400 bg-red-500/10 border-red-500/20" };
    if (item.isCompleted) return { label: "Completed", color: "text-green-400 bg-green-500/10 border-green-500/20" };
    if (item.payment) return { label: "Paid", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    return { label: "Pending Payment", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <span className="badge mb-3 inline-block">Dashboard</span>
          <h1 className="text-4xl font-black text-white mb-2">
            My <span className="glow-text">Appointments</span>
          </h1>
          <p className="text-slate-400">{appointments.length} total appointments</p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 h-32 shimmer"></div>
            ))}
          </div>

        /* Empty State */
        ) : appointments.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-white text-xl font-bold mb-2">No appointments yet</h3>
            <p className="text-slate-400 mb-6">Book your first appointment with a doctor</p>
            <button
              onClick={() => navigate("/doctors")}
              className="btn-primary inline-block"
            >
              Find Doctors →
            </button>
          </div>

        /* Appointments List */
        ) : (
          <div className="space-y-4">
            {appointments.map((item, index) => {
              const status = getStatusBadge(item);
              return (
                <div key={index} className="glass-card p-6 flex flex-col sm:flex-row gap-5">

                  {/* Doctor Image */}
                  <img
                    src={item.docData?.image}
                    alt={item.docData?.name}
                    className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 bg-blue-500/10"
                  />

                  {/* Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="text-white font-bold text-lg">{item.docData?.name}</h3>
                        <p className="text-slate-400 text-sm">{item.docData?.speciality}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                      <span>📅 {slotDateFormat(item.slotDate)}</span>
                      <span>⏰ {item.slotTime}</span>
                      {item.docData?.address?.line1 && (
                        <span>📍 {item.docData.address.line1}</span>
                      )}
                      <span>💰 ₹{item.docData?.fee || item.docData?.fees || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 justify-center min-w-[140px]">

                    {/* Already Paid */}
                    {!item.cancelled && item.payment && !item.isCompleted && (
                      <div className="px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                        ✅ Paid
                      </div>
                    )}

                    {/* Pay Now */}
                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <button
                        onClick={() => handlePayment(item._id)}
                        disabled={payingId === item._id}
                        className="px-5 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {payingId === item._id ? (
                          <span className="flex items-center gap-2 justify-center">
                            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "💳 Pay Online"
                        )}
                      </button>
                    )}

                    {/* Cancel */}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        disabled={item.payment}
                        className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    )}

                    {/* Cancelled */}
                    {item.cancelled && !item.isCompleted && (
                      <div className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                        ❌ Cancelled
                      </div>
                    )}

                    {/* Completed */}
                    {item.isCompleted && (
                      <div className="px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                        ✅ Completed
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

