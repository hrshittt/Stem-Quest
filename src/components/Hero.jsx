import React from 'react'

const Hero = ({ setCurrentPage }) => {
  const handleGetStarted = () => {
    setCurrentPage('gradeSelection')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
          onError={(e) => {
            console.error('Video error:', e.target.error);
            // Hide video and show fallback if video fails to load
            e.target.style.display = 'none';
            const fallback = document.getElementById('video-fallback');
            if (fallback) fallback.style.display = 'block';
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Background */}
        <div 
          id="video-fallback"
          className="w-full h-full bg-gradient-to-br from-stem-blue via-stem-purple to-stem-green animate-pulse hidden"
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-dark-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-12 animate-float">
          <span className="bg-gradient-to-r from-stem-blue via-stem-purple to-stem-green bg-clip-text text-transparent">
            Welcome to STEM Quest
          </span>
        </h1>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="px-12 py-6 bg-gradient-to-r from-stem-blue to-stem-purple hover:from-stem-purple hover:to-stem-blue text-white text-2xl font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-pulse-slow"
        >
          GET STARTED
        </button>
      </div>
    </div>
  )
}

export default Hero
