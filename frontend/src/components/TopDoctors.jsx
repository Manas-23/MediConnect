import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className='py-24 bg-[#0a0a0f]'>
      <div className='max-w-7xl mx-auto px-6'>

        {/* Section Header */}
        <div className='text-center mb-16'>
          <span className='badge mb-4 inline-block'>Our Experts</span>
          <h2 className='section-title text-white mb-4'>
            Top <span className='glow-text'>Doctors</span>
          </h2>
          <p className='text-slate-400 max-w-xl mx-auto text-lg'>
            Hand-picked specialists with proven track records. Book appointments with the best in the field.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {doctors.slice(0, 8).map((doctor, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }}
              className='glass-card p-5 cursor-pointer group'
            >
              {/* Doctor Image */}
              <div className='relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10'>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className='w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500'
                />
                {/* Available Badge */}
                <div className='absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1'>
                  <div className='pulse-dot'></div>
                  <span className='text-green-400 text-xs font-medium'>Available</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className='space-y-2'>
                <h3 className='text-white font-bold text-lg group-hover:text-blue-400 transition-colors'>
                  {doctor.name}
                </h3>
                <p className='text-slate-400 text-sm'>{doctor.speciality}</p>

                <div className='flex items-center justify-between pt-3 border-t border-white/5'>
                  <div className='flex items-center gap-1'>
                    <span className='text-yellow-400 text-sm'>★</span>
                    <span className='text-slate-300 text-sm font-medium'>4.9</span>
                    <span className='text-slate-500 text-xs'>(120+)</span>
                  </div>
                  <span className='text-blue-400 text-sm font-semibold'>
                    ₹{doctor.fee ||doctor.fees}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className='text-center mt-12'>
          <button
            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
            className='btn-primary px-10 py-4 text-base'
          >
            View All Doctors →
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopDoctors

