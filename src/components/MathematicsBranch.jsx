import React from 'react'
import { gradeData, subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'

const MathematicsBranch = ({ setCurrentPage, selectedGrade, selectedSubject }) => {
  const topics = gradeData[selectedGrade][selectedSubject]
  const subjectName = subjectNames[selectedSubject]
  const subjectIcon = subjectIcons[selectedSubject]
  const subjectColor = subjectColors[selectedSubject]

  const handleTopicClick = (topic, gameType = 'maze') => {
    const gamePage = gameType === 'stapoo' ? 'stapooGame' : 'mazeGame'
    setCurrentPage(gamePage, {
      grade: selectedGrade,
      subject: selectedSubject,
      topic: topic
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
          Choose a topic to begin learning!
        </p>
      </div>

      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-300 hover:scale-105`}
            >
              <div className={`bg-gradient-to-br ${subjectColor}/20 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col`}>
                {/* Topic Icon */}
                <div className={`w-20 h-20 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  <span className="text-2xl">🧮</span>
                </div>
                
                {/* Topic Title */}
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  {topic}
                </h3>
                
                {/* Game Options */}
                <div className="text-center mt-auto space-y-3">
                  <button
                    onClick={() => handleTopicClick(topic, 'maze')}
                    className="w-full px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                  >
                    🎮 Maze Game
                  </button>
                  <button
                    onClick={() => handleTopicClick(topic, 'stapoo')}
                    className="w-full px-4 py-2 rounded-full text-sm font-semibold bg-yellow-600 hover:bg-yellow-700 text-white transition-colors duration-300"
                  >
                    🦶 Stapoo Game
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={handleBackToSubjects}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
        >
          ← Back to Subjects
        </button>
      </div>
    </div>
  )
}

export default MathematicsBranch
