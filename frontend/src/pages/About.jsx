import React from "react";

const About = () => {
  const features = [
    {
      icon: "⚡",
      title: "Efficiency",
      description: "Streamlined appointment scheduling that fits into your busy lifestyle."
    },
    {
      icon: "🌐",
      title: "Convenience",
      description: "Access to a network of trusted healthcare professionals in your area."
    },
    {
      icon: "🎯",
      title: "Personalization",
      description: "Tailored recommendations and reminders to help you stay on top of your health."
    }
  ];

  return (
    <div className='min-h-screen bg-[#0a0a0f] pt-28 pb-20'>
      <div className='max-w-6xl mx-auto px-6'>

        {/* Header */}
        <div className='text-center mb-16'>
          <span className='badge mb-4 inline-block'>Our Story</span>
          <h1 className='section-title text-white mb-4'>
            About <span className='glow-text'>Us</span>
          </h1>
        </div>

        {/* Main Content */}
        <div className='grid md:grid-cols-2 gap-12 items-center mb-20'>

          <div className='glass-card p-8'>
            <div className='aspect-square rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center'>
              <div className='text-center space-y-4'>
                <div className='text-6xl'>👨‍⚕️</div>
                <p className='text-white font-bold text-xl'>Trusted Healthcare</p>
                <p className='text-slate-400 text-sm'>500+ verified doctors</p>
              </div>
            </div>
          </div>

          <div className='space-y-6 text-slate-400 leading-relaxed'>
            <p>
              Welcome to <span className='text-white font-semibold'>Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p>
              Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>

            <div className='glass-card p-6 mt-4'>
              <h3 className='text-white font-bold text-lg mb-2 flex items-center gap-2'>
                <span>🎯</span> Our Vision
              </h3>
              <p className='text-slate-400'>
                Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <div className='text-center mb-12'>
            <span className='badge mb-4 inline-block'>Our Edge</span>
            <h2 className='section-title text-white'>
              Why <span className='glow-text'>Choose Us</span>
            </h2>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {features.map((feature, index) => (
              <div key={index} className='glass-card p-8 text-center'>
                <div className='text-5xl mb-4'>{feature.icon}</div>
                <h3 className='text-white font-bold text-lg mb-3'>{feature.title}</h3>
                <p className='text-slate-400 text-sm leading-relaxed'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;