import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Welcome back!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden'>

      {/* Background Effects */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none'></div>
      <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none'></div>

      <div className='w-full max-w-md relative z-10'>

        {/* Logo */}
        <div className='text-center mb-8'>
          <div
            className='inline-flex items-center gap-3 cursor-pointer group'
            onClick={() => navigate('/')}
          >
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg'>
              <span className='text-white font-bold'>P</span>
            </div>
            <span className='text-white font-bold text-2xl'>Prescripto</span>
          </div>
        </div>

        {/* Card */}
        <div className='glass-card p-8'>

          {/* Header */}
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              {state === 'Login' ? 'Welcome back 👋' : 'Create account 🚀'}
            </h2>
            <p className='text-slate-400 text-sm'>
              {state === 'Login'
                ? 'Sign in to book appointments with top doctors'
                : 'Join thousands of patients on Prescripto'}
            </p>
          </div>

          {/* Toggle */}
          <div className='flex bg-white/5 rounded-xl p-1 mb-6 border border-white/10'>
            {['Login', 'Sign Up'].map((tab) => (
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

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='space-y-4'>
            {state === 'Sign Up' && (
              <div>
                <label className='text-slate-400 text-sm mb-2 block'>Full Name</label>
                <input
                  type='text'
                  placeholder='John Doe'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='dark-input'
                  required
                />
              </div>
            )}

            <div>
              <label className='text-slate-400 text-sm mb-2 block'>Email Address</label>
              <input
                type='email'
                placeholder='john@example.com'
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
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors text-sm'
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full py-4 text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24' fill='none'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'></path>
                  </svg>
                  Please wait...
                </span>
              ) : (
                state === 'Login' ? 'Sign In →' : 'Create Account →'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className='text-center text-slate-500 text-sm mt-6'>
            {state === 'Login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setState(state === 'Login' ? 'Sign Up' : 'Login')}
              className='text-blue-400 hover:text-blue-300 font-medium transition-colors'
            >
              {state === 'Login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login


