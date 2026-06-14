import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointments = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, backendUrl, token, getDoctorsData, setToken } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [loading, setLoading] = useState(false)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchDocInfo = () => {
    const doc = doctors.find(d => d._id === docId)
    setDocInfo(doc)
  }

  const getAvailableSlots = async () => {
  setDocSlots([])
  let today = new Date()

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)

    let endTime = new Date(today)
    endTime.setDate(today.getDate() + i)
    endTime.setHours(21, 0, 0, 0)

    if (today.getDate() === currentDate.getDate()) {
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    } else {
      currentDate.setHours(10)
      currentDate.setMinutes(0)
    }

    let timeSlots = []

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })

      let day = currentDate.getDate()
      let month = currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      // Safe check — won't crash if slots_booked is undefined
      const slotsBooked = docInfo?.slots_booked || {}
      const bookedSlots = slotsBooked[slotDate] || []
      const isBooked = bookedSlots.includes(formattedTime)

      if (!isBooked) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }

    setDocSlots(prev => [...prev, timeSlots])
  }
}

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Please login to book an appointment')
      return navigate('/login')
    }
    if (!slotTime) {
      toast.warning('Please select a time slot')
      return
    }
    setLoading(true)
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Appointment booked successfully!')
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Booking failed. Try again.')
    }
    setLoading(false)
  }

  useEffect(() => { fetchDocInfo() }, [doctors, docId])
  useEffect(() => { if (docInfo) getAvailableSlots() }, [docInfo])

  if (!docInfo || !doctors.length) return (
  <div className='min-h-screen bg-[#0a0a0f] flex items-center justify-center'>
    <div className='text-center'>
      <div className='w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
      <p className='text-slate-400'>Loading doctor info...</p>
    </div>
  </div>
)

  return (
    <div className='min-h-screen bg-[#0a0a0f] pt-28 pb-20'>
      <div className='max-w-5xl mx-auto px-6'>

        {/* Doctor Info Card */}
        <div className='glass-card p-8 mb-8 flex flex-col md:flex-row gap-8'>

          {/* Image */}
          <div className='flex-shrink-0'>
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className='w-48 h-48 rounded-2xl object-cover bg-gradient-to-br from-blue-500/20 to-purple-500/20'
            />
          </div>

          {/* Info */}
          <div className='flex-1 space-y-4'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <h1 className='text-3xl font-black text-white'>{docInfo.name}</h1>
                <span className='px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold'>
                  ✓ Verified
                </span>
              </div>
              <p className='text-slate-400'>{docInfo.degree} — {docInfo.speciality}</p>
            </div>

            <div className='flex flex-wrap gap-4'>
              {[
                { icon: '⭐', value: '4.9/5', label: 'Rating' },
                { icon: '👥', value: '500+', label: 'Patients' },
                { icon: '🏆', value: docInfo.experience, label: 'Experience' },
              ].map((stat, i) => (
                <div key={i} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center'>
                  <div className='text-lg'>{stat.icon}</div>
                  <div className='text-white font-bold text-sm'>{stat.value}</div>
                  <div className='text-slate-500 text-xs'>{stat.label}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className='text-white font-semibold mb-2'>About</h3>
              <p className='text-slate-400 text-sm leading-relaxed'>{docInfo.about}</p>
            </div>

            <div className='flex items-center gap-3 pt-2'>
              <span className='text-slate-400 text-sm'>Consultation Fee:</span>
              <span className='text-2xl font-black text-blue-400'>
                 {docInfo.fee || docInfo.fees || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className='glass-card p-8 mb-8'>
          <h2 className='text-xl font-bold text-white mb-6'>
            Select Appointment Slot
          </h2>

          {/* Day Selector */}
          <div className='flex gap-3 overflow-x-auto pb-3 mb-6'>
            {docSlots.map((slots, index) => (
              <button
                key={index}
                onClick={() => { setSlotIndex(index); setSlotTime('') }}
                className={`flex-shrink-0 flex flex-col items-center px-5 py-4 rounded-2xl border transition-all duration-200 ${
                  slotIndex === index
                    ? 'bg-gradient-to-b from-blue-500 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/30'
                    : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className='text-xs font-semibold mb-1'>
                  {slots[0] && daysOfWeek[slots[0].datetime.getDay()]}
                </span>
                <span className='text-2xl font-black'>
                  {slots[0] && slots[0].datetime.getDate()}
                </span>
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className='flex flex-wrap gap-3 mb-8'>
            {docSlots[slotIndex]?.length > 0 ? (
              docSlots[slotIndex].map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    slotTime === slot.time
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className='text-slate-500 text-sm'>No slots available for this day</p>
            )}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            disabled={loading || !slotTime}
            className='btn-primary px-10 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24' fill='none'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'></path>
                </svg>
                Booking...
              </span>
            ) : (
              `Book Appointment ${slotTime ? `at ${slotTime}` : ''} →`
            )}
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      </div>
    </div>
  )
}

export default Appointments

