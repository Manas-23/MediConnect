import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Welcome back, Admin!')
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
         localStorage.setItem('dToken', data.token)
         setDToken(data.token)
          toast.success('Welcome back, Doctor!')
         navigate('/doctor')
          } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error('Login failed. Check credentials.')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden'>

      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none'></div>
      <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none'></div>

      <div className='w-full max-w-md relative z-10'>

        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg'>
              <span className='text-white font-bold'>P</span>
            </div>
            <span className='text-white font-bold text-2xl'>Prescripto</span>
          </div>
          <p className='text-slate-500 text-sm mt-2'>Dashboard Panel</p>
        </div>

        <div className='glass-card p-8'>

          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              {state} Login 🔐
            </h2>
            <p className='text-slate-400 text-sm'>
              Sign in to access your {state.toLowerCase()} dashboard
            </p>
          </div>

          {/* Toggle */}
          <div className='flex bg-white/5 rounded-xl p-1 mb-6 border border-white/10'>
            {['Admin', 'Doctor'].map((tab) => (
              <button
                key={tab}
                onClick={() => setState(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  state === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-4'>
            <div>
              <label className='text-slate-400 text-sm mb-2 block'>Email Address</label>
              <input
                type='email'
                placeholder='admin@prescripto.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='dark-input'
                required
              />
            </div>

            <div>
              <label className='text-slate-400 text-sm mb-2 block'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='dark-input pr-12'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm'
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full py-4 text-base mt-2 disabled:opacity-50'
            >
              {loading ? 'Signing in...' : `Sign In as ${state} →`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

