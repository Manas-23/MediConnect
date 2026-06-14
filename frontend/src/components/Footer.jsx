import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='bg-[#0f0f1a] border-t border-white/5'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>

          {/* Brand */}
          <div className='col-span-1 md:col-span-2 space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>P</span>
              </div>
              <span className='text-white font-bold text-xl'>Prescripto</span>
            </div>
            <p className='text-slate-400 text-sm leading-relaxed max-w-sm'>
              Making quality healthcare accessible to everyone. Book appointments with verified doctors instantly.
            </p>
            <div className='flex gap-3'>
              {['Twitter', 'LinkedIn', 'Instagram'].map((s, i) => (
                <div key={i} className='w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/10 transition-all'>
                  <span className='text-slate-400 text-xs'>{s[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className='space-y-4'>
            <h4 className='text-white font-semibold'>Quick Links</h4>
            <div className='space-y-3'>
              {['Home', 'All Doctors', 'About', 'Contact'].map((link, i) => (
                <div key={i} className='text-slate-400 hover:text-blue-400 text-sm cursor-pointer transition-colors'>
                  {link}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h4 className='text-white font-semibold'>Contact</h4>
            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-slate-400 text-sm'>
                <span>📧</span> support@prescripto.com
              </div>
              <div className='flex items-center gap-2 text-slate-400 text-sm'>
                <span>📞</span> +91 98765 43210
              </div>
              <div className='flex items-center gap-2 text-slate-400 text-sm'>
                <span>📍</span> Mumbai, Maharashtra
              </div>
            </div>
          </div>
        </div>

        <div className='divider'></div>

        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-slate-500 text-sm'>© 2025 Prescripto. All rights reserved.</p>
          <div className='flex gap-6'>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
              <span key={i} className='text-slate-500 hover:text-slate-300 text-sm cursor-pointer transition-colors'>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

