import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className='py-24 bg-[#0a0a0f]'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-16 text-center'>

          {/* Background glow */}
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/20 blur-3xl'></div>

          <div className='relative z-10 space-y-6'>
            <span className='badge inline-block'>Get Started Today</span>
            <h2 className='text-4xl lg:text-5xl font-black text-white'>
              Your Health,<br />
              <span className='glow-text'>Our Priority</span>
            </h2>
            <p className='text-slate-400 text-lg max-w-xl mx-auto'>
              Join thousands of patients who trust Prescripto for their healthcare needs. Book your first appointment today.
            </p>
            <div className='flex flex-wrap gap-4 justify-center'>
              <button
                onClick={() => navigate('/login')}
                className='btn-primary px-10 py-4 text-base'
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate('/doctors')}
                className='px-10 py-4 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 font-medium transition-all text-base'
              >
                Browse Doctors
              </button>
            </div>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center gap-8 pt-4'>
              {[
                { icon: '🔒', text: 'HIPAA Compliant' },
                { icon: '⚡', text: 'Instant Booking' },
                { icon: '💳', text: 'Secure Payments' },
                { icon: '📱', text: '24/7 Support' },
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-2 text-slate-400 text-sm'>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner

