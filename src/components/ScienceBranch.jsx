import React from 'react'
import { useLang } from '../i18n.jsx'
import { gradeData, subjectIcons, subjectColors, subjectNames } from '../data/gradeData'
import FloatingParticles from './FloatingParticles'
import Breadcrumb from './Breadcrumb'

const ScienceBranch = ({ setCurrentPage, selectedGrade, selectedSubject, branch }) => {
  const { lang } = useLang()
  const topics = gradeData[selectedGrade][selectedSubject][branch]
  const branchNames = {
    physics: lang === 'hi' ? 'भौतिकी' : 'Physics',
    chemistry: lang === 'hi' ? 'रसायन विज्ञान' : 'Chemistry',
    biology: lang === 'hi' ? 'जीव विज्ञान' : 'Biology'
  }
  const branchIcons = {
    physics: '⚡',
    chemistry: '🧪',
    biology: '🌱'
  }
  const branchColors = {
    physics: 'from-stem-green to-green-600',
    chemistry: 'from-stem-blue to-blue-600',
    biology: 'from-stem-purple to-purple-600'
  }

  const handleTopicClick = (topic) => {
    const scienceGames = {
      'physics': 'physicsSnakeLadderGame',
      'chemistry': 'chemistrySegregationGame',
      'biology': 'biologyFlipCardGame'
    }
    
    setCurrentPage(scienceGames[branch], {
      grade: selectedGrade,
      subject: selectedSubject,
      branch: branch,
      topic: topic
    })
  }

  const handleBackToScience = () => {
    setCurrentPage('topicSelection', { grade: selectedGrade, subject: selectedSubject })
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
          <div className={`w-16 h-16 bg-gradient-to-r ${branchColors[branch]} rounded-full flex items-center justify-center mr-4`}>
            <span className="text-3xl">{branchIcons[branch]}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Grade{' '}
            <span className="bg-gradient-to-r from-stem-blue to-stem-purple bg-clip-text text-transparent">
              {selectedGrade}
            </span>
          </h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className={`bg-gradient-to-r ${branchColors[branch]} bg-clip-text text-transparent`}>
            {branchNames[branch]}
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {lang === 'hi' ? 'सीखना शुरू करने के लिए विषय चुनें। प्रत्येक विषय में इंटरैक्टिव पाठ, खेल और चुनौतियाँ हैं!' : `Choose a ${branchNames[branch].toLowerCase()} topic to start learning. Each topic contains interactive lessons, games, and challenges!`}
        </p>
      </div>

      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              onClick={() => handleTopicClick(topic)}
              className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-${(index % 5) + 1}`}
            >
              <div className={`bg-gradient-to-br ${branchColors[branch]}/20 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full flex flex-col group-hover:shadow-2xl`}>
                
                {/* Topic Icon */}
                <div className={`w-20 h-20 bg-gradient-to-r ${branchColors[branch]} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:animate-glow mx-auto`}>
                  <span className="text-2xl">{branchIcons[branch]}</span>
                </div>
                
                {/* Topic Title */}
                <h3 className="text-xl font-bold text-white mb-4 text-center leading-tight">
                  {topic}
                </h3>
                
                {/* Topic Description Placeholder */}
                <p className="text-gray-300 text-sm text-center mb-6 flex-grow">
                  {lang === 'hi' ? 'इंटरैक्टिव पाठ और रोचक गतिविधियाँ आपका इंतज़ार कर रही हैं!' : `Interactive lessons and engaging activities await you in this ${branchNames[branch].toLowerCase()} topic!`}
                </p>
                
                {/* Progress Indicator */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div className={`bg-gradient-to-r ${branchColors[branch]} h-2 rounded-full transition-all duration-300 group-hover:w-full`} style={{ width: '0%' }}></div>
                </div>
                
                {/* Hover Effect */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <div className={`w-10 h-10 bg-gradient-to-r ${branchColors[branch]} rounded-full flex items-center justify-center mx-auto`}>
                    <span className="text-white text-lg">→</span>
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
            Ready to Start Learning {branchNames[branch]}?
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Each topic is designed with interactive content, games, and assessments to make learning fun and effective. 
            Click on any topic to begin your {branchNames[branch].toLowerCase()} learning journey!
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
            onClick={handleBackToScience}
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {lang === 'hi' ? '← विज्ञान पर वापस' : '← Back to Science'}
          </button>
          <button
            onClick={handleBackToSubjects}
            className="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {lang === 'hi' ? '← विषयों पर वापस' : '← Back to Subjects'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScienceBranch
