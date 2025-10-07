import React from 'react'
import { subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'
import Breadcrumb from './Breadcrumb'

const GameModeSelection = ({ setCurrentPage, selectedGrade, selectedSubject }) => {
  const subjectName = subjectNames[selectedSubject]
  const subjectIcon = subjectIcons[selectedSubject]
  const subjectColor = subjectColors[selectedSubject]

  const handleUltimateGame = () => {
    setCurrentPage('difficultySelection', { 
      grade: selectedGrade, 
      subject: selectedSubject, 
      mode: 'ultimate' 
    })
  }

  const handleIndividualTopics = () => {
    setCurrentPage('topicSelection', { 
      grade: selectedGrade, 
      subject: selectedSubject 
    })
  }

  const handleBackToSubjects = () => {
    setCurrentPage('subjectSelection', { grade: selectedGrade })
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
            {subjectName}
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Choose how you want to learn and play with {subjectName.toLowerCase()} concepts!
        </p>
      </div>

      {/* Game Mode Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ultimate Game Mode */}
          <div
            onClick={handleUltimateGame}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-1"
          >
            <div className={`bg-gradient-to-br ${subjectColor}/20 backdrop-blur-sm rounded-3xl p-10 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:shadow-2xl`}>
              
              {/* Mode Icon */}
              <div className={`w-32 h-32 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:animate-glow`}>
                <span className="text-6xl">🎯</span>
              </div>
              
              {/* Mode Title */}
              <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                Ultimate Challenge
              </h3>
              
              {/* Mode Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Test your knowledge across all {subjectName.toLowerCase()} topics in one comprehensive game! 
                Mix concepts and challenge yourself with integrated learning.
              </p>
              
              {/* Features */}
              <div className="bg-white/10 rounded-2xl p-4 mb-6">
                <p className="text-white font-semibold text-sm">
                  ✨ All topics mixed together<br/>
                  🎮 Comprehensive gameplay<br/>
                  🏆 Ultimate achievement unlock
                </p>
              </div>
              
              {/* Hover Effect */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-12 h-12 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mx-auto`}>
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Topics Mode */}
          <div
            onClick={handleIndividualTopics}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-2"
          >
            <div className={`bg-gradient-to-br ${subjectColor}/20 backdrop-blur-sm rounded-3xl p-10 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:shadow-2xl`}>
              
              {/* Mode Icon */}
              <div className={`w-32 h-32 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:animate-glow`}>
                <span className="text-6xl">📚</span>
              </div>
              
              {/* Mode Title */}
              <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                Individual Topics
              </h3>
              
              {/* Mode Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Focus on specific topics one at a time. Perfect for targeted learning and mastering individual concepts before moving forward.
              </p>
              
              {/* Features */}
              <div className="bg-white/10 rounded-2xl p-4 mb-6">
                <p className="text-white font-semibold text-sm">
                  📖 Topic-by-topic learning<br/>
                  🎯 Focused practice<br/>
                  📈 Progressive skill building
                </p>
              </div>
              
              {/* Hover Effect */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-12 h-12 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mx-auto`}>
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center mt-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Choose Your Learning Style
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong>Ultimate Challenge:</strong> Perfect for testing overall knowledge and mixing concepts.<br/>
            <strong>Individual Topics:</strong> Ideal for focused learning and building strong foundations.
          </p>
        </div>
      </div>

      {/* Back Button at Bottom */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={handleBackToSubjects}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center mx-auto"
        >
          ← Back to Subjects
        </button>
      </div>
    </div>
  )
}

export default GameModeSelection
