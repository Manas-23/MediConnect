import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyStripe = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const appointmentId = searchParams.get('appointmentId')
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verify-stripe`,
        { success, appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Payment successful! 🎉')
      } else {
        toast.error('Payment failed')
      }
    } catch (err) {
      toast.error('Verification failed')
    }
    navigate('/my-appointments')
  }

  useEffect(() => {
    if (token) verifyPayment()
  }, [token])

  return (
    <div className='min-h-screen bg-[#0a0a0f] flex items-center justify-center'>
      <div className='text-center glass-card p-12'>
        <div className='w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
        <p className='text-slate-400'>Verifying your payment...</p>
      </div>
    </div>
  )
}

export default VerifyStripe