import React from 'react'
import { gradeData, subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'
import Breadcrumb from './Breadcrumb'

const TopicSelection = ({ setCurrentPage, selectedGrade, selectedSubject }) => {
  let topics = []
  let subjectName = subjectNames[selectedSubject]
  let subjectIcon = subjectIcons[selectedSubject]
  let subjectColor = subjectColors[selectedSubject]

  // Handle different subject structures
  if (selectedSubject === 'science') {
    // Science has subcategories: physics, chemistry, biology
    subjectName = "Science"
  } else {
    // Other subjects have direct topic arrays
    topics = gradeData[selectedGrade][selectedSubject]
  }

  const handleTopicClick = (topic) => {
    if (selectedSubject === 'mathematics') {
      setCurrentPage('mazeGame', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic: topic
      })
    } else if (selectedSubject === 'science') {
      const scienceGames = {
        'physics': {
          'Motion and Force': 'brickBreaker',
          'Energy': 'brickBreaker'
        },
        'chemistry': {
          'Combustion & Flame': 'chemistryLab',
          'Coal & Petroleum': 'chemistryLab',
          'Materials: Metals & Non-Metals': 'chemistryLab'
        },
        'biology': {
          'Cell Biology': 'dnaGame',
          'Genetics': 'dnaGame'
        }
      }
      setCurrentPage('scienceGame', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic: topic,
        gameType: selectedBranch ? scienceGames[selectedBranch][topic] : 'chemistryLab'
      })
    } else if (selectedSubject === 'problemSolving') {
      // For problem solving, we'll show both game options
      setCurrentPage('problemSolvingGames', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic: topic
      })
    } else if (selectedSubject === 'technology') {
      // For technology, route to hangman game
      setCurrentPage('hangmanGame', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic: topic
      })
    }
  }

  const handleBackToSubjects = () => {
    setCurrentPage('subjectSelection', { grade: selectedGrade })
  }

  const handleBackToGrades = () => {
    setCurrentPage('gradeSelection')
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
          Choose a topic to start learning. Each topic contains interactive lessons, games, and challenges!
        </p>
      </div>

            {/* Content based on subject type */}
      {selectedSubject === 'science' ? (
        /* Science Subcategories */
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['physics', 'chemistry', 'biology'].map((branch, index) => (
              <div
                key={branch}
                onClick={() => setCurrentPage('scienceBranch', { 
                  grade: selectedGrade, 
                  subject: selectedSubject, 
                  branch 
                })}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-${index + 1}`}
              >
                <div className="bg-gradient-to-br from-stem-green/20 to-stem-blue/20 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col group-hover:shadow-2xl">
                  
                  {/* Branch Icon */}
                  <div className="w-24 h-24 bg-gradient-to-br from-stem-green to-stem-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:animate-glow mx-auto">
                    <span className="text-3xl">
                      {branch === 'physics' && '⚡'}
                      {branch === 'chemistry' && '🧪'}
                      {branch === 'biology' && '🌱'}
                    </span>
                  </div>
                  
                  {/* Branch Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 text-center capitalize">
                    {branch}
                  </h3>
                  
                  {/* Branch Description */}
                  <p className="text-gray-300 text-sm text-center mb-6 flex-grow">
                    {branch === 'physics' && "Explore forces, energy, and the physical world"}
                    {branch === 'chemistry' && "Discover matter, reactions, and chemical processes"}
                    {branch === 'biology' && "Learn about living organisms and life processes"}
                  </p>
                  
                  {/* Hover Effect */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-stem-green to-stem-blue rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-lg">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Regular Topics Grid */
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => handleTopicClick(topic)}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-${(index % 5) + 1}`}
              >
                <div className={`bg-gradient-to-br ${subjectColor}/20 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col group-hover:shadow-2xl`}>
                  
                  {/* Topic Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:animate-glow mx-auto`}>
                    <span className="text-2xl">📚</span>
                  </div>
                  
                  {/* Topic Title */}
                  <h3 className="text-xl font-bold text-white mb-4 text-center leading-tight">
                    {topic}
                  </h3>
                  
                  {/* Topic Description Placeholder */}
                  <p className="text-gray-300 text-sm text-center mb-6 flex-grow">
                    Interactive lessons and engaging activities await you in this topic!
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div className={`bg-gradient-to-r ${subjectColor} h-2 rounded-full transition-all duration-300 group-hover:w-full`} style={{ width: '0%' }}></div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <div className={`w-10 h-10 bg-gradient-to-r ${subjectColor} rounded-full flex items-center justify-center mx-auto`}>
                      <span className="text-white text-lg">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="text-center mt-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Each topic is designed with interactive content, games, and assessments to make learning fun and effective. 
            Click on any topic to begin your learning journey!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-stem-green">
              <span className="text-2xl mr-2">🎮</span>
              <span className="text-white">Interactive Games</span>
            </div>
            <div className="flex items-center text-stem-blue">
              <span className="text-2xl mr-2">📊</span>
              <span className="text-white">Progress Tracking</span>
            </div>
            <div className="flex items-center text-stem-purple">
              <span className="text-2xl mr-2">🏆</span>
              <span className="text-white">Achievements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons at Bottom */}
      <div className="text-center mt-12 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBackToSubjects}
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            ← Back to Subjects
          </button>
          <button
            onClick={handleBackToGrades}
            className="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            ← Back to Grades
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopicSelection
