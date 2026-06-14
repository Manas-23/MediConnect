import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const [activeFilter, setActiveFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const specialities = [
    'General physician', 'Gynecologist', 'Dermatologist',
    'Pediatricians', 'Neurologist', 'Gastroenterologist', 'Cardiologist'
  ]

  useEffect(() => {
    let filtered = doctors
    if (speciality) {
      setActiveFilter(speciality)
      filtered = doctors.filter(d => d.speciality === speciality)
    }
    if (searchQuery) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.speciality.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilterDoc(filtered)
  }, [doctors, speciality, searchQuery])

  const handleFilter = (spec) => {
    const newFilter = activeFilter === spec ? '' : spec
    setActiveFilter(newFilter)
    if (newFilter) {
      navigate(`/doctors/${newFilter}`)
    } else {
      navigate('/doctors')
    }
  }

  return (
    <div className='min-h-screen bg-[#0a0a0f] pt-28 pb-20'>
      <div className='max-w-7xl mx-auto px-6'>

        {/* Page Header */}
        <div className='mb-10'>
          <span className='badge mb-3 inline-block'>Find Doctors</span>
          <h1 className='text-4xl font-black text-white mb-3'>
            Browse <span className='glow-text'>Specialists</span>
          </h1>
          <p className='text-slate-400'>
            {filterDoc.length} doctors available
            {activeFilter ? ` in ${activeFilter}` : ''}
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>

          {/* Sidebar Filters */}
          <div className='lg:w-64 flex-shrink-0'>
            <div className='glass-card p-5 sticky top-28'>
              <h3 className='text-white font-semibold mb-4 text-sm uppercase tracking-wider'>
                Specialities
              </h3>
              <div className='space-y-2'>
                {specialities.map((spec, i) => (
                  <button
                    key={i}
                    onClick={() => handleFilter(spec)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeFilter === spec
                        ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>

              {activeFilter && (
                <button
                  onClick={() => { setActiveFilter(''); navigate('/doctors') }}
                  className='w-full mt-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-sm transition-all'
                >
                  ✕ Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>

            {/* Search Bar */}
            <div className='relative mb-6'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>🔍</span>
              <input
                type='text'
                placeholder='Search doctors by name or speciality...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='dark-input pl-12'
              />
            </div>

            {/* Doctors Grid */}
            {filterDoc.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                {filterDoc.map((doctor, index) => (
                  <div
                    key={index}
                    onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }}
                    className='glass-card p-5 cursor-pointer group'
                  >
                    <div className='relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10'>
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className='w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                      <div className='absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1'>
                        <div className='pulse-dot'></div>
                        <span className='text-green-400 text-xs font-medium'>Available</span>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <h3 className='text-white font-bold text-lg group-hover:text-blue-400 transition-colors'>
                        {doctor.name}
                      </h3>
                      <p className='text-slate-400 text-sm'>{doctor.speciality}</p>
                      <p className='text-slate-500 text-xs'>{doctor.experience} experience</p>

                      <div className='flex items-center justify-between pt-3 border-t border-white/5'>
                        <div className='flex items-center gap-1'>
                          <span className='text-yellow-400 text-sm'>★</span>
                          <span className='text-slate-300 text-sm font-medium'>4.9</span>
                        </div>
                        <span className='text-blue-400 text-sm font-semibold'>
                              ₹{doctor.fee || doctor.fees || 'N/A'}
                        </span>
                      </div>

                      <button className='w-full py-2.5 mt-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-all'>
                        Book Appointment →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-20 glass-card'>
                <div className='text-5xl mb-4'>🔍</div>
                <h3 className='text-white text-xl font-bold mb-2'>No doctors found</h3>
                <p className='text-slate-400'>Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors

