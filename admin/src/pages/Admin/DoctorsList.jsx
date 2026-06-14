import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <span className="badge mb-2 inline-block">Manage Doctors</span>
        <h1 className="text-3xl font-black text-white">
          All <span className="glow-text">Doctors</span>
        </h1>
        <p className="text-slate-400 mt-1">{doctors.length} doctors registered</p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {doctors.map((item, index) => (
          <div
            className="glass-card overflow-hidden group"
            key={index}
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                className="w-full h-48 object-cover bg-blue-500/10 group-hover:scale-105 transition-transform duration-500"
                src={item.image}
                alt=""
              />
              {item.available && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                  <div className="pulse-dot"></div>
                  <span className="text-green-400 text-xs font-medium">Live</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                {item.name}
              </p>
              <p className="text-slate-400 text-sm mb-3">{item.speciality}</p>

              {/* Availability Toggle */}
              <label
                htmlFor={`available${item._id}`}
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    id={`available${item._id}`}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-white/10 rounded-full peer-checked:bg-blue-500/40 border border-white/10 peer-checked:border-blue-500/40 transition-all"></div>
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-slate-400 peer-checked:bg-blue-400 peer-checked:translate-x-5 rounded-full transition-all"></div>
                </div>
                <span className="text-slate-300 text-sm font-medium">
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <div className="glass-card p-16 text-center">
          <div className="text-5xl mb-4">👨‍⚕️</div>
          <h3 className="text-white text-xl font-bold mb-2">No doctors added yet</h3>
          <p className="text-slate-400">Add your first doctor to get started</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;

