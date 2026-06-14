import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(d => d.speciality === speciality && d._id !== docId)
      setRelated(filtered.slice(0, 3))
    }
  }, [doctors, docId, speciality])

  if (related.length === 0) return null

  return (
    <div>
      <h2 className='text-xl font-bold text-white mb-6'>
        Related <span className='glow-text'>Doctors</span>
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {related.map((doctor, index) => (
          <div
            key={index}
            onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }}
            className='glass-card p-5 cursor-pointer group'
          >
            <div className='relative mb-4 overflow-hidden rounded-2xl'>
              <img
                src={doctor.image}
                alt={doctor.name}
                className='w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2 py-1'>
                <div className='pulse-dot'></div>
                <span className='text-green-400 text-xs'>Available</span>
              </div>
            </div>
            <h3 className='text-white font-bold group-hover:text-blue-400 transition-colors'>{doctor.name}</h3>
            <p className='text-slate-400 text-sm'>{doctor.speciality}</p>
           <p className='text-blue-400 text-sm font-semibold mt-2'>₹{doctor.fee || doctor.fees}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors

