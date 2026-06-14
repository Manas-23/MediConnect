import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }

  return (
    <nav className='sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between'>
      
      {/* Logo */}
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg'>
          <span className='text-white font-bold text-sm'>P</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-white font-bold text-xl tracking-tight'>
            Presc<span className='text-blue-400'>ripto</span>
          </span>
          <span className='px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium'>
            {aToken ? 'Admin' : 'Doctor'}
          </span>
        </div>
      </div>

      {/* Right */}
      <button
        onClick={logout}
        className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all'
      >
        🚪 Logout
      </button>
    </nav>
  )
}

export default Navbar

