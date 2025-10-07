import React from 'react'

const AboutSection = () => {
  const features = [
    {
      icon: '🧮',
      title: 'Interactive Math',
      description: 'Engage with mathematical concepts through interactive simulations and problem-solving games.'
    },
    {
      icon: '🔬',
      title: 'Science Exploration',
      description: 'Discover scientific principles through virtual experiments and hands-on activities.'
    },
    {
      icon: '🧠',
      title: 'Critical Thinking',
      description: 'Develop logical reasoning and analytical skills through challenging puzzles and scenarios.'
    },
    {
      icon: '💻',
      title: 'Technology & Coding',
      description: 'Learn programming fundamentals and technology concepts with age-appropriate content.'
    }
  ]

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-stem-blue to-stem-purple bg-clip-text text-transparent">
              STEM Quest
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            STEM Quest is an innovative educational platform designed to make learning engaging, 
            interactive, and fun for students in grades 6-12. We believe that education should 
            be an adventure, not a chore.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600 hover:border-stem-blue transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-stem-blue/20 to-stem-purple/20 rounded-3xl p-8 border border-stem-blue/30">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              To transform traditional education by creating an immersive, gamified learning 
              experience that inspires curiosity, fosters creativity, and builds confidence in 
              STEM subjects. We're committed to making complex concepts accessible and enjoyable 
              for every student, regardless of their learning style or background.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-stem-blue mb-2">7</div>
            <div className="text-gray-300">Grade Levels</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-stem-green mb-2">5</div>
            <div className="text-gray-300">Core Subjects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-stem-purple mb-2">100+</div>
            <div className="text-gray-300">Interactive Lessons</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
