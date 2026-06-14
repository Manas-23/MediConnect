import React from 'react'
import { useNavigate } from 'react-router-dom'
import { specialityData } from '../assets/assets'

const SpecialityMenu = () => {
  const navigate = useNavigate()

  const icons = ['🫀', '🧠', '🦷', '👶', '🦴', '👁️', '🩺', '💊', '🤰', '🧴']

  return (
    <section className='py-24 bg-[#0f0f1a]'>
      <div className='max-w-7xl mx-auto px-6'>

        {/* Header */}
        <div className='text-center mb-16'>
          <span className='badge mb-4 inline-block'>Browse By</span>
          <h2 className='section-title text-white mb-4'>
            Find by <span className='glow-text'>Speciality</span>
          </h2>
          <p className='text-slate-400 max-w-lg mx-auto text-lg'>
            Choose your medical speciality and connect with the right expert instantly.
          </p>
        </div>

        {/* Speciality Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {specialityData.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/doctors/${item.speciality}`); scrollTo(0, 0) }}
              className='glass-card p-6 cursor-pointer group text-center'
            >
              <div className='text-4xl mb-3 group-hover:scale-110 transition-transform duration-300'>
                {icons[index % icons.length]}
              </div>
              <div className='text-slate-300 text-sm font-medium group-hover:text-blue-400 transition-colors'>
                {item.speciality}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu

