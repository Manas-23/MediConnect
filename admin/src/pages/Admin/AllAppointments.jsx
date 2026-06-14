import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <span className="badge mb-2 inline-block">Bookings</span>
        <h1 className="text-3xl font-black text-white">
          All <span className="glow-text">Appointments</span>
        </h1>
        <p className="text-slate-400 mt-1">{appointments?.length || 0} total appointments</p>
      </div>

      <div className="glass-card overflow-hidden">

        {/* Table Header - Desktop only */}
        <div className="hidden lg:grid grid-cols-[0.4fr_2.5fr_0.8fr_2fr_2.5fr_1fr_1fr] gap-4 px-6 py-4 border-b border-white/5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Status</p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 lg:grid-cols-[0.4fr_2.5fr_0.8fr_2fr_2.5fr_1fr_1fr] gap-4 px-6 py-4 items-center text-sm hover:bg-white/5 transition-all"
              >
                {/* Index - desktop only */}
                <p className="hidden lg:block text-slate-500">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3 col-span-2 lg:col-span-1">
                  <img
                    className="w-9 h-9 rounded-xl object-cover bg-blue-500/10"
                    src={item.userData.image}
                    alt=""
                  />
                  <p className="text-white font-medium">{item.userData.name}</p>
                </div>

                {/* Age - desktop only */}
                <p className="hidden lg:block text-slate-400">
                  {calculateAge(item.userData.dob)}
                </p>

                {/* Date & Time */}
                <div>
                  <p className="text-slate-400 text-xs lg:hidden mb-0.5">Date & Time</p>
                  <p className="text-slate-300">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>

                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-9 h-9 rounded-xl object-cover bg-purple-500/10"
                    src={item.docData.image}
                    alt=""
                  />
                  <p className="text-white font-medium">{item.docData.name}</p>
                </div>

                {/* Fee */}
                <div>
                  <p className="text-slate-400 text-xs lg:hidden mb-0.5">Fee</p>
                  <p className="text-blue-400 font-semibold">
                    {currency} {item.docData.fee}
                  </p>
                </div>

                {/* Status / Action */}
                <div>
                  {item.cancelled ? (
                    <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                      Cancelled
                    </span>
                  ) : !item.isCompleted ? (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center text-sm"
                      title="Cancel appointment"
                    >
                      ✕
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-16">
              <p className="text-slate-500 font-medium">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
