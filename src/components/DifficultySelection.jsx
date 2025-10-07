import React from 'react'
import { subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'
import Breadcrumb from './Breadcrumb'

const DifficultySelection = ({ setCurrentPage, selectedGrade, selectedSubject, mode }) => {
  const subjectName = subjectNames[selectedSubject]
  const subjectIcon = subjectIcons[selectedSubject]
  const subjectColor = subjectColors[selectedSubject]
  const difficulties = [
    { level: 'easy', icon: '😊', color: 'from-green-400 to-green-600', description: 'Perfect for beginners. Start your journey here!' },
    { level: 'medium', icon: '😐', color: 'from-yellow-400 to-yellow-600', description: 'For those who want a balanced challenge.' },
    { level: 'hard', icon: '😤', color: 'from-red-400 to-red-600', description: 'Expert level. Are you ready for this?' }
  ]

  const handleDifficultySelect = (difficulty) => {
    // Launch the actual game interface
    setCurrentPage('gameInterface', { 
      grade: selectedGrade, 
      subject: selectedSubject, 
      mode, 
      difficulty 
    })
  }

  const handleBackToGameModes = () => {
    setCurrentPage('gameModeSelection', { grade: selectedGrade, subject: selectedSubject })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4">
      <FloatingParticles />
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mr-4`}>
            <span className="text-3xl">{subjectIcon}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Grade{' '}
            <span className="bg-gradient-to-r from-stem-blue to-stem-purple bg-clip-text text-transparent">
              {selectedGrade}
            </span>
          </h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className={`bg-gradient-to-r ${subjectColor} bg-clip-text text-transparent`}>
            Ultimate Challenge
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Choose your difficulty level for the {subjectName.toLowerCase()} ultimate challenge!
        </p>
      </div>

      {/* Difficulty Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {difficulties.map((difficulty, index) => (
            <div
              key={difficulty.level}
              onClick={() => handleDifficultySelect(difficulty.level)}
              className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-${index + 1}`}
            >
              <div className={`bg-gradient-to-br ${difficulty.color}/20 backdrop-blur-sm rounded-3xl p-10 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:shadow-2xl`}>
                
                {/* Difficulty Icon */}
                <div className={`w-32 h-32 bg-gradient-to-r ${difficulty.color} rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:animate-glow`}>
                  <span className="text-6xl">{difficulty.icon}</span>
                </div>
                
                {/* Difficulty Level */}
                <h3 className="text-4xl font-bold text-white mb-6 capitalize">
                  {difficulty.level}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {difficulty.description}
                </p>
                
                {/* Features */}
                <div className="bg-white/10 rounded-2xl p-4 mb-6">
                  <p className="text-white font-semibold text-sm">
                    {difficulty.level === 'easy' && "🎯 Simple questions\n⏱️ More time per question\n💡 Helpful hints available"}
                    {difficulty.level === 'medium' && "🎯 Balanced difficulty\n⏱️ Standard time limits\n💡 Some hints available"}
                    {difficulty.level === 'hard' && "🎯 Complex questions\n⏱️ Limited time\n💡 No hints - pure skill!"}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${difficulty.color} rounded-full flex items-center justify-center mx-auto`}>
                    <span className="text-white text-2xl">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center mt-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready for the Challenge?
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Each difficulty level offers a unique experience. Start with Easy to build confidence, 
            or jump straight to Hard if you're feeling adventurous!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-green-400">
              <span className="text-2xl mr-2">🎯</span>
              <span className="text-white">Easy: Build Foundation</span>
            </div>
            <div className="flex items-center text-yellow-400">
              <span className="text-2xl mr-2">⚖️</span>
              <span className="text-white">Medium: Balanced Challenge</span>
            </div>
            <div className="flex items-center text-red-400">
              <span className="text-2xl mr-2">🔥</span>
              <span className="text-white">Hard: Ultimate Test</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button at Bottom */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={handleBackToGameModes}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center mx-auto"
        >
          ← Back to Game Modes
        </button>
      </div>
    </div>
  )
}

export default DifficultySelection
