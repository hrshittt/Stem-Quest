import React from 'react'
import { subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'
import Breadcrumb from './Breadcrumb'

const SubjectSelection = ({ setCurrentPage, selectedGrade }) => {
  const subjects = selectedGrade >= 11 
    ? ['mathematics', 'science', 'coding']
    : ['mathematics', 'science', 'problemSolving', 'technology']

  const handleSubjectClick = (subject) => {
    if (selectedGrade >= 11) {
      // For grades 11-12, go directly to topic selection
      setCurrentPage('topicSelection', { grade: selectedGrade, subject })
    } else {
      // For grades 6-10, go to game mode selection
      setCurrentPage('gameModeSelection', { grade: selectedGrade, subject })
    }
  }

  const handleBackToGrades = () => {
    setCurrentPage('gradeSelection')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4">
      <FloatingParticles />
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Grade{' '}
          <span className="bg-gradient-to-r from-stem-blue to-stem-purple bg-clip-text text-transparent">
            {selectedGrade}
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose a subject to explore exciting topics and start learning!
        </p>
      </div>

      {/* Subject Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map((subject, index) => (
            <div
              key={subject}
              onClick={() => handleSubjectClick(subject)}
              className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-${index + 1}`}
            >
                             <div className={`bg-gradient-to-br ${subjectColors[subject]}/20 backdrop-blur-sm rounded-3xl p-10 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:shadow-2xl`}>
                
                {/* Subject Icon */}
                <div className={`w-32 h-32 bg-gradient-to-br ${subjectColors[subject]} rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:animate-glow`}>
                  <span className="text-6xl">{subjectIcons[subject]}</span>
                </div>
                
                {/* Subject Name */}
                <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                  {subjectNames[subject]}
                </h3>
                
                {/* Subject Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {subject === 'mathematics' && "Explore numbers, shapes, and mathematical concepts"}
                  {subject === 'science' && "Discover the wonders of the natural world"}
                  {subject === 'problemSolving' && "Develop critical thinking and logical reasoning"}
                  {subject === 'technology' && "Learn about modern technology and everyday STEM"}
                </p>
                
                {/* Hover Effect */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${subjectColors[subject]} rounded-full flex items-center justify-center mx-auto`}>
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
            Ready to Start Learning?
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Each subject contains carefully curated topics designed specifically for Grade {selectedGrade}. 
            Click on any subject to explore its topics and begin your learning journey!
          </p>
        </div>
      </div>

      {/* Back Button at Bottom */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={handleBackToGrades}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center mx-auto"
        >
          ← Back to Grades
        </button>
      </div>
    </div>
  )
}

export default SubjectSelection
