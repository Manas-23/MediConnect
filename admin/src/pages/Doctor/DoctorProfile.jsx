import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return (
      <div className="p-6">
        <div className="glass-card h-96 shimmer"></div>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <span className="badge mb-2 inline-block">Account</span>
        <h1 className="text-3xl font-black text-white">
          My <span className="glow-text">Profile</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Profile Image Card */}
        <div className="glass-card p-6 lg:w-72 flex-shrink-0">
          <img
            className="w-full rounded-2xl object-cover bg-blue-500/10 mb-4"
            src={profileData.image}
            alt=""
          />
          <div className="text-center">
            <p className="text-white font-bold text-lg">{profileData.name}</p>
            <p className="text-slate-400 text-sm">{profileData.speciality}</p>
          </div>
        </div>

        {/* Details Card */}
        <div className="glass-card p-8 flex-1">

          {/* Name + Experience */}
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              {profileData.experience}
            </span>
          </div>
          <p className="text-slate-400 mb-6">
            {profileData.degree} — {profileData.speciality}
          </p>

          {/* About */}
          <div className="mb-6">
            <p className="text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">About</p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {profileData.about}
            </p>
          </div>

          <div className="divider"></div>

          {/* Fee */}
          <div className="mb-5">
            <label className="text-slate-400 text-sm font-semibold mb-2 block uppercase tracking-wider">
              Appointment Fee
            </label>
            {isEdit ? (
              <div className="flex items-center gap-2 max-w-xs">
                <span className="text-blue-400 font-bold text-lg">{currency}</span>
                <input
                  type="number"
                  value={profileData.fee}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fee: e.target.value,
                    }))
                  }
                  className="dark-input"
                />
              </div>
            ) : (
              <p className="text-2xl font-black text-blue-400">
                {currency}{profileData.fee}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="text-slate-400 text-sm font-semibold mb-2 block uppercase tracking-wider">
              Address
            </label>
            {isEdit ? (
              <div className="space-y-3 max-w-md">
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                  className="dark-input"
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                  className="dark-input"
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className="text-slate-300 text-sm">
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </p>
            )}
          </div>

          {/* Availability Toggle */}
          <div className="mb-6">
            <label
              htmlFor="available"
              className={`flex items-center gap-2 w-fit ${isEdit ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  checked={profileData.available}
                  id="available"
                  className="sr-only peer"
                  disabled={!isEdit}
                />
                <div className="w-10 h-5 bg-white/10 rounded-full peer-checked:bg-blue-500/40 border border-white/10 peer-checked:border-blue-500/40 transition-all"></div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-slate-400 peer-checked:bg-blue-400 peer-checked:translate-x-5 rounded-full transition-all"></div>
              </div>
              <span className="text-slate-300 text-sm font-medium">
                {profileData.available ? "Available" : "Unavailable"}
              </span>
            </label>
          </div>

          {/* Edit/Save Button */}
          {!isEdit ? (
            <button
              className="px-8 py-3 rounded-xl border border-blue-500/30 text-blue-400 text-sm font-semibold hover:bg-blue-500/10 transition-all"
              onClick={() => setIsEdit(true)}
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <button
              className="btn-primary px-8 py-3"
              onClick={updateProfile}
            >
              💾 Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

