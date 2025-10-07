import React from 'react'

const WhyGamifiedSection = () => {
  const benefits = [
    {
      icon: '🎯',
      title: 'Increased Engagement',
      description: 'Games naturally capture attention and maintain focus longer than traditional methods.',
      color: 'from-stem-blue to-blue-600'
    },
    {
      icon: '🏆',
      title: 'Immediate Feedback',
      description: 'Students receive instant results, helping them understand concepts faster.',
      color: 'from-stem-green to-green-600'
    },
    {
      icon: '🔄',
      title: 'Active Learning',
      description: 'Hands-on interaction promotes deeper understanding and retention.',
      color: 'from-stem-purple to-purple-600'
    },
    {
      icon: '🚀',
      title: 'Progress Tracking',
      description: 'Visual progress indicators motivate students to continue learning.',
      color: 'from-stem-orange to-orange-600'
    },
    {
      icon: '🤝',
      title: 'Collaborative Learning',
      description: 'Multiplayer features encourage teamwork and peer learning.',
      color: 'from-stem-red to-red-600'
    },
    {
      icon: '💡',
      title: 'Creative Problem Solving',
      description: 'Game scenarios challenge students to think outside the box.',
      color: 'from-stem-blue to-stem-purple'
    }
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why{' '}
            <span className="bg-gradient-to-r from-stem-green to-stem-blue bg-clip-text text-transparent">
              Gamified Learning
            </span>{' '}
            Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Research shows that gamification in education leads to better engagement, 
            improved retention, and increased motivation. Here's why our approach works:
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden"
            >
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600 hover:border-transparent transition-all duration-300 transform hover:scale-105 h-full">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Section */}
        <div className="bg-gradient-to-r from-stem-green/20 to-stem-blue/20 rounded-3xl p-8 border border-stem-green/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Backed by Research</h3>
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                Studies have consistently shown that gamified learning environments lead to:
              </p>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-center">
                  <span className="text-stem-green mr-3">✓</span>
                  25% increase in learning retention
                </li>
                <li className="flex items-center">
                  <span className="text-stem-green mr-3">✓</span>
                  40% improvement in engagement levels
                </li>
                <li className="flex items-center">
                  <span className="text-stem-green mr-3">✓</span>
                  60% higher completion rates
                </li>
                <li className="flex items-center">
                  <span className="text-stem-green mr-3">✓</span>
                  Better problem-solving skills
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <div className="text-6xl mb-4">📊</div>
                <h4 className="text-xl font-semibold text-white mb-2">Proven Results</h4>
                <p className="text-gray-300">
                  Our platform has helped thousands of students improve their STEM skills 
                  through engaging, interactive learning experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of students who are already learning smarter with STEM Quest.
          </p>
          <button className="bg-gradient-to-r from-stem-blue to-stem-purple hover:from-stem-purple hover:to-stem-blue text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default WhyGamifiedSection
