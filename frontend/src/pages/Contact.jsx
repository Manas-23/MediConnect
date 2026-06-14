import React from "react";

const Contact = () => {
  return (
    <div className='min-h-screen bg-[#0a0a0f] pt-28 pb-20'>
      <div className='max-w-6xl mx-auto px-6'>

        {/* Header */}
        <div className='text-center mb-16'>
          <span className='badge mb-4 inline-block'>Get In Touch</span>
          <h1 className='section-title text-white mb-4'>
            Contact <span className='glow-text'>Us</span>
          </h1>
          <p className='text-slate-400 max-w-xl mx-auto'>
            Have questions? We'd love to hear from you. Reach out to our team anytime.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-10 items-center'>

          {/* Image / Visual */}
          <div className='glass-card p-8'>
            <div className='aspect-square rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center'>
              <div className='text-center space-y-4'>
                <div className='text-6xl'>🏥</div>
                <p className='text-white font-bold text-xl'>Prescripto HQ</p>
                <p className='text-slate-400 text-sm'>Making healthcare accessible</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className='space-y-8'>

            {/* Office */}
            <div className='glass-card p-6'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='text-xl'>📍</span>
                <h3 className='text-white font-bold text-lg'>Our Office</h3>
              </div>
              <p className='text-slate-400 mb-4'>
                Mumbai, Maharashtra<br />
                India - 400001
              </p>
              <div className='space-y-2'>
                <p className='text-slate-300 text-sm flex items-center gap-2'>
                  <span>📞</span> +91 98765 43210
                </p>
                <p className='text-slate-300 text-sm flex items-center gap-2'>
                  <span>📧</span> manasdeshmukh827@gmail.com
                </p>
              </div>
            </div>

            {/* Careers */}
            <div className='glass-card p-6'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-xl'>💼</span>
                <h3 className='text-white font-bold text-lg'>Careers at Prescripto</h3>
              </div>
              <p className='text-slate-400 mb-5'>
                Learn more about our teams and job openings. We're always looking for talented people.
              </p>
              <button className='btn-primary'>
                Explore Jobs →
              </button>
            </div>

            {/* Quick Links */}
            <div className='glass-card p-6'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='text-xl'>⏰</span>
                <h3 className='text-white font-bold text-lg'>Working Hours</h3>
              </div>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between text-slate-400'>
                  <span>Monday - Friday</span>
                  <span className='text-slate-300'>9:00 AM - 8:00 PM</span>
                </div>
                <div className='flex justify-between text-slate-400'>
                  <span>Saturday</span>
                  <span className='text-slate-300'>10:00 AM - 6:00 PM</span>
                </div>
                <div className='flex justify-between text-slate-400'>
                  <span>Sunday</span>
                  <span className='text-slate-300'>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;