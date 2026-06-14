import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]'>

      {/* Background Effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-2000'></div>
        {/* Grid */}
        <div className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      <div className='max-w-7xl mx-auto px-6 pt-32 pb-20 w-full'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>

          {/* Left Content */}
          <div className='space-y-8 fade-in-up'>

            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2'>
              <div className='pulse-dot'></div>
              <span className='text-blue-400 text-sm font-medium'>Trusted by 10,000+ patients</span>
            </div>

            {/* Headline */}
            <div className='space-y-4'>
              <h1 className='text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight'>
                Book Your
                <span className='block glow-text'>Doctor</span>
                <span className='block text-white'>Instantly</span>
              </h1>
              <p className='text-slate-400 text-lg leading-relaxed max-w-lg'>
                Connect with certified specialists in seconds. No waiting rooms, no hassle — just healthcare that works around your schedule.
              </p>
            </div>

            {/* Stats */}
            <div className='flex gap-8'>
              {[
                { value: '500+', label: 'Doctors' },
                { value: '50K+', label: 'Patients' },
                { value: '4.9★', label: 'Rating' },
              ].map((stat, i) => (
                <div key={i} className='text-center'>
                  <div className='text-2xl font-bold text-white'>{stat.value}</div>
                  <div className='text-slate-500 text-sm'>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-wrap gap-4'>
              <button
                onClick={() => navigate('/doctors')}
                className='btn-primary flex items-center gap-2 text-base px-8 py-4'
              >
                Find a Doctor
                <span>→</span>
              </button>
              <button
                onClick={() => navigate('/about')}
                className='flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 font-medium transition-all duration-200 text-base'
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content — Doctor Cards Visual */}
          <div className='relative hidden lg:block'>

            {/* Main Card */}
            <div className='glass-card p-6 ml-8'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl'>
                  🏥
                </div>
                <div>
                  <div className='text-white font-bold text-lg'>Find Specialists</div>
                  <div className='text-slate-400 text-sm'>20+ specialities available</div>
                </div>
              </div>

              {/* Speciality Pills */}
              <div className='flex flex-wrap gap-2 mb-6'>
                {['Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Gynecologist', 'General Physician'].map((s, i) => (
                  <span key={i} className='px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:border-blue-500/40 hover:text-blue-400 transition-all cursor-pointer'>
                    {s}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigate('/doctors')}
                className='w-full py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 font-semibold text-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all'
              >
                Browse All Doctors →
              </button>
            </div>

            {/* Floating Appointment Card */}
            <div className='absolute -top-8 -right-4 glass-card p-4 w-56 float-animation'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-lg'>✅</div>
                <div>
                  <div className='text-white text-sm font-semibold'>Appointment</div>
                  <div className='text-green-400 text-xs'>Confirmed!</div>
                </div>
              </div>
              <div className='text-slate-400 text-xs'>Today at 3:00 PM</div>
              <div className='text-slate-300 text-xs font-medium'>Dr. Rahul Sharma</div>
            </div>

            {/* Floating Rating Card */}
            <div className='absolute -bottom-6 -left-4 glass-card p-4 w-48'>
              <div className='text-yellow-400 text-lg mb-1'>★★★★★</div>
              <div className='text-white text-sm font-semibold'>4.9/5 Rating</div>
              <div className='text-slate-400 text-xs'>From 12,000+ reviews</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

