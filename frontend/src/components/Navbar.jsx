import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        
        {/* Logo */}
        <div 
          className='flex items-center gap-3 cursor-pointer group'
          onClick={() => navigate('/')}
        >
          <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300'>
            <span className='text-white font-bold text-sm'>P</span>
          </div>
          <span className='text-white font-bold text-xl tracking-tight'>
            Presc<span className='text-blue-400'>ripto</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex items-center gap-1'>
          {[
            { path: '/', label: 'Home' },
            { path: '/doctors', label: 'All Doctors' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-400 bg-blue-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-3'>
          <button
           onClick={() => window.open('https://mediconnect-admin-zeta.vercel.app', '_blank')}
            className='hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-200'
          >
            <span>⚙️</span>
            Admin Panel
          </button>

          {token ? (
            <div className='relative group'>
              <div className='flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 transition-all duration-200'>
                <img 
                  src={userData?.image || '/default-avatar.png'} 
                  className='w-7 h-7 rounded-full object-cover' 
                  alt='user'
                />
                <span className='text-sm text-slate-300 hidden sm:block'>
                  {userData?.name?.split(' ')[0]}
                </span>
                <span className='text-slate-500 text-xs'>▾</span>
              </div>
              {/* Dropdown */}
              <div className='absolute right-0 top-full mt-2 w-48 bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden'>
                <div className='p-1'>
                  <button 
                    onClick={() => navigate('/my-profile')}
                    className='w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all'
                  >
                    👤 My Profile
                  </button>
                  <button 
                    onClick={() => navigate('/my-appointments')}
                    className='w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all'
                  >
                    📅 My Appointments
                  </button>
                  <div className='h-px bg-white/5 mx-3 my-1'></div>
                  <button 
                    onClick={logout}
                    className='w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-all'
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='btn-primary text-sm'
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

