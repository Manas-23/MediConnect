import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    getDashData,
    dashData,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card h-28 shimmer"></div>
          ))}
        </div>
        <div className="glass-card h-64 shimmer"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <span className="badge mb-2 inline-block">Overview</span>
        <h1 className="text-3xl font-black text-white">
          Doctor <span className="glow-text">Dashboard</span>
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-5">
        {[
          { icon: "💰", value: `${currency} ${dashData.earnings}`, label: "Earnings", color: "from-green-500/20 to-green-600/5 border-green-500/20" },
          { icon: "📅", value: dashData.appointments, label: "Appointments", color: "from-blue-500/20 to-blue-600/5 border-blue-500/20" },
          { icon: "🧑‍🤝‍🧑", value: dashData.patients, label: "Patients", color: "from-purple-500/20 to-purple-600/5 border-purple-500/20" },
        ].map((stat, i) => (
          <div
            key={i}
            className="glass-card p-6 flex items-center gap-4 min-w-[220px] flex-1 cursor-pointer hover:-translate-y-1"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} border flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/5">
          <span className="text-xl">📋</span>
          <p className="font-semibold text-white">Latest Bookings</p>
        </div>

        <div className="divide-y divide-white/5">
          {dashData.latestAppointments.length !== 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-4 gap-4 hover:bg-white/5 transition-all"
                key={index}
              >
                <img
                  className="rounded-xl w-11 h-11 object-cover bg-blue-500/10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-white font-semibold">
                    {item.userData.name}
                  </p>
                  <p className="text-slate-400">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>

                {item.cancelled ? (
                  <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center text-sm"
                      title="Cancel"
                    >
                      ✕
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all flex items-center justify-center text-sm"
                      title="Complete"
                    >
                      ✓
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center px-6 py-12">
              <p className="text-slate-500 font-medium">
                No Appointments Booked
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

