import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const AddDoctor = () => {
  const [docImage, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { backendUrl, aToken } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImage) {
        return toast.error("Image not Selected");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("image", docImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setAbout("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setFee("");
        setDocImg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-6 w-full" onSubmit={onSubmitHandler}>

      {/* Header */}
      <div className="mb-6">
        <span className="badge mb-2 inline-block">Manage Doctors</span>
        <h1 className="text-3xl font-black text-white">
          Add <span className="glow-text">Doctor</span>
        </h1>
      </div>

      <div className="glass-card p-8 w-full max-w-4xl">

        {/* Upload Image */}
        <div className="flex items-center gap-5 mb-8">
          <label htmlFor="docImage" className="cursor-pointer group">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border-2 border-dashed border-white/10 group-hover:border-blue-500/40 transition-all flex items-center justify-center">
              {docImage ? (
                <img
                  src={URL.createObjectURL(docImage)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">📷</span>
              )}
            </div>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="docImage"
            className="hidden"
          />
          <div>
            <p className="text-white font-semibold text-sm">Upload Doctor Picture</p>
            <p className="text-slate-500 text-xs">PNG or JPG, square recommended</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Doctor Name</label>
              <input
                className="dark-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. John Doe"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Doctor Email</label>
              <input
                className="dark-input"
                type="email"
                placeholder="doctor@prescripto.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Doctor Password</label>
              <div className="relative">
                <input
                  className="dark-input pr-12"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Experience</label>
              <select
                className="dark-input"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(y => (
                  <option key={y} value={`${y} Year`} className="bg-[#0f0f1a]">{y} Year</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Doctor Fee (₹)</label>
              <input
                type="number"
                placeholder="500"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="dark-input"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Speciality</label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="dark-input"
              >
                {["General physician","Gynecologist","Dermatologist","Pediatricians","Neurologist","Gastroenterologist"].map(s => (
                  <option key={s} value={s} className="bg-[#0f0f1a]">{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Education</label>
              <input
                type="text"
                placeholder="MBBS, MD"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="dark-input"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Address</label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="dark-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="dark-input"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="text-slate-400 text-sm mb-2 block">About Doctor</label>
          <textarea
            className="dark-input resize-none"
            placeholder="Write a short bio about the doctor..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={5}
            required
          />
        </div>

        {/* Submit */}
        <button
          className="btn-primary mt-6 px-10 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "Add Doctor →"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;


