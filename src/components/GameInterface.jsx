import React, { useState, useEffect } from 'react'
import { subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'

const GameInterface = ({ setCurrentPage, selectedGrade, selectedSubject, mode, difficulty }) => {
  const [isLoading, setIsLoading] = useState(true)
  const subjectName = subjectNames[selectedSubject]
  const subjectIcon = subjectIcons[selectedSubject]
  const subjectColor = subjectColors[selectedSubject]

  // Hide loading overlay after iframe loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Hide after 3 seconds to ensure game loads

    return () => clearTimeout(timer)
  }, [])

  const handleBackToDifficulty = () => {
    setCurrentPage('difficultySelection', { 
      grade: selectedGrade, 
      subject: selectedSubject, 
      mode 
    })
  }

  const handleBackToGameModes = () => {
    setCurrentPage('gameModeSelection', { 
      grade: selectedGrade, 
      subject: selectedSubject 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4">
      <FloatingParticles />
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mr-3`}>
            <span className="text-2xl">{subjectIcon}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Grade{' '}
            <span className="bg-gradient-to-r from-stem-blue to-stem-purple bg-clip-text text-transparent">
              {selectedGrade}
            </span>
          </h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          <span className={`bg-gradient-to-r ${subjectColor} bg-clip-text text-transparent`}>
            {subjectName} Ultimate Challenge
          </span>
        </h2>
        <p className="text-lg text-gray-300">
          Difficulty: <span className="capitalize text-white font-semibold">{difficulty}</span>
        </p>
      </div>

      {/* Game Container */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-600">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              🎮 Algebra Adventure Game
            </h3>
            <p className="text-gray-300 text-sm">
              Solve mathematical puzzles and escape challenges in this interactive algebra game!
            </p>
          </div>
          
          {/* Game iframe */}
          <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden bg-black">
            <iframe
              src="https://roomescapemaker.com/u/7Tac0caT7/algebra"
              title="Algebra Adventure Game"
              className="w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => setIsLoading(false)}
            />
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-stem-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading Game...</p>
                  <p className="text-gray-400 text-sm mt-2">Please wait while the game loads</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Instructions */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-600">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            🎯 How to Play
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-stem-blue mr-2">1.</span>
                <span>Use arrow keys or WASD to move around</span>
              </div>
              <div className="flex items-start">
                <span className="text-stem-blue mr-2">2.</span>
                <span>Click on objects to interact with them</span>
              </div>
              <div className="flex items-start">
                <span className="text-stem-blue mr-2">3.</span>
                <span>Solve algebra puzzles to progress</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-stem-green mr-2">4.</span>
                <span>Collect items and use them strategically</span>
              </div>
              <div className="flex items-start">
                <span className="text-stem-green mr-2">5.</span>
                <span>Think logically to escape each room</span>
              </div>
              <div className="flex items-start">
                <span className="text-stem-green mr-2">6.</span>
                <span>Complete all challenges to win!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBackToDifficulty}
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            ← Back to Difficulty
          </button>
          <button
            onClick={handleBackToGameModes}
            className="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            ← Back to Game Modes
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameInterface
