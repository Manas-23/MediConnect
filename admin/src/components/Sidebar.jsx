import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const adminLinks = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/all-appointments', label: 'Appointments', icon: '📅' },
  { path: '/add-doctor', label: 'Add Doctor', icon: '➕' },
  { path: '/doctors-list', label: 'Doctors List', icon: '👥' },
]

 const doctorLinks = [
  { path: '/doctor', label: 'Dashboard', icon: '📊' },
  { path: '/doctor/appointments', label: 'Appointments', icon: '📅' },
  { path: '/doctor/profile', label: 'Profile', icon: '👤' },
]

  const links = aToken ? adminLinks : dToken ? doctorLinks : []

  return (
    <aside className='w-64 min-h-[calc(100vh-73px)] bg-[#0f0f1a] border-r border-white/5 p-4 hidden md:block'>
      <div className='space-y-1'>
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            end
            className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            isActive
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/10 border border-blue-500/30 text-blue-400'
             : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
             }`
              }
          >
            <span className='text-lg'>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar

