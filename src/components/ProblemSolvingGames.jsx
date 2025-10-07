import React from 'react'
import { gradeData, subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'

const ProblemSolvingGames = ({ setCurrentPage, selectedGrade, selectedSubject, topic }) => {
  const subjectName = subjectNames[selectedSubject]
  const subjectIcon = subjectIcons[selectedSubject]
  const subjectColor = subjectColors[selectedSubject]

  const handleGameSelection = (gameType) => {
    if (gameType === 'stapoo') {
      setCurrentPage('stapooGame', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic: topic
      })
    } else {
      // Handle existing problem solving games
      const problemSolvingGames = {
        'Pattern Recognition': 'hopscotch',
        'Problem-Solving Skills': 'towerClimb',
        'Detective and Mystery': 'detectiveMystery',
        'Simple puzzles': 'hopscotch',
        'Logical reasoning games': 'hopscotch',
        'Sequence/ordering problems': 'hopscotch',
        'Sudoku-like puzzles': 'hopscotch',
        'Word & number riddles': 'hopscotch',
        'Venn diagram puzzles': 'hopscotch',
        'Brain teasers': 'hopscotch',
        'Logical grids': 'hopscotch',
        'Analogies': 'hopscotch',
        'Problem-based puzzles': 'hopscotch',
        'Critical thinking scenarios': 'hopscotch',
        'Strategy puzzles': 'hopscotch',
        'Critical reasoning problems': 'hopscotch',
        'Pattern-based math games': 'hopscotch',
        'Real-world problem solving': 'hopscotch',
        'Advanced logic puzzles': 'hopscotch',
        'Problem-solving case studies': 'towerClimb',
        'Critical decision-making games': 'detectiveMystery',
        'Analytical puzzles': 'hopscotch'
      }
      
      const gamePage = problemSolvingGames[topic] || 'hopscotch'
      setCurrentPage(gamePage, {
        grade: selectedGrade,
        subject: selectedSubject,
        topic: topic
      })
    }
  }

  const handleBackToTopics = () => {
    setCurrentPage('topicSelection', { 
      grade: selectedGrade, 
      subject: selectedSubject 
    })
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
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {topic}
        </h3>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Click on the Stapoo Game to start your learning adventure!
        </p>
      </div>

      {/* Game Option */}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center">
          {/* Stapoo Game Option */}
          <div
            onClick={() => handleGameSelection('stapoo')}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 hover:border-yellow-400 transition-all duration-300 h-full flex flex-col group-hover:shadow-2xl">
              {/* Game Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:animate-glow mx-auto">
                <span className="text-4xl">🦶</span>
              </div>
              
              {/* Game Title */}
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Stapoo Game
              </h3>
              
              {/* Game Description */}
              <p className="text-gray-300 text-center mb-6 flex-grow">
                Traditional hopscotch game with 10 blocks. Answer questions correctly to hop through each block and reach the finish line!
              </p>
              
              {/* Features */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-yellow-300">
                  <span className="text-lg mr-2">⭐</span>
                  <span className="text-white">10 progressive blocks</span>
                </div>
                <div className="flex items-center text-yellow-300">
                  <span className="text-lg mr-2">🎯</span>
                  <span className="text-white">Topic-specific questions</span>
                </div>
                <div className="flex items-center text-yellow-300">
                  <span className="text-lg mr-2">🏆</span>
                  <span className="text-white">Score tracking</span>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-lg">→</span>
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
            Ready to Start Learning?
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The Stapoo Game is designed to enhance your problem-solving and critical thinking skills through 
            an engaging traditional hopscotch experience with topic-specific questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-yellow-400">
              <span className="text-2xl mr-2">🦶</span>
              <span className="text-white">Stapoo Hopscotch</span>
            </div>
            <div className="flex items-center text-green-400">
              <span className="text-2xl mr-2">🧠</span>
              <span className="text-white">Critical Thinking</span>
            </div>
            <div className="flex items-center text-blue-400">
              <span className="text-2xl mr-2">🎯</span>
              <span className="text-white">Problem Solving</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={handleBackToTopics}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
        >
          ← Back to Topics
        </button>
      </div>
    </div>
  )
}

export default ProblemSolvingGames
