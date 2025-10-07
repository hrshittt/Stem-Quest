import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GradeSelection from './components/GradeSelection'
import SubjectSelection from './components/SubjectSelection'
import GameModeSelection from './components/GameModeSelection'
import DifficultySelection from './components/DifficultySelection'
import GameInterface from './components/GameInterface'
import TopicSelection from './components/TopicSelection'
import ScienceBranch from './components/ScienceBranch'
import MathematicsBranch from './components/MathematicsBranch'
import MazeGame from './components/MazeGame'
import StapooGame from './components/StapooGame'
import ProblemSolvingGames from './components/ProblemSolvingGames'
import HangmanGame from './components/HangmanGame'
import ChemistrySegregationGame from './components/ChemistrySegregationGame'
import BiologyFlipCardGame from './components/BiologyFlipCardGame'
import PhysicsSnakeLadderGame from './components/PhysicsSnakeLadderGame'
import AboutSection from './components/AboutSection'
import WhyGamifiedSection from './components/WhyGamifiedSection'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [pageData, setPageData] = useState({})
  const [pageHistory, setPageHistory] = useState(['home'])
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en')

  const handlePageChange = (page, data = {}) => {
    setCurrentPage(page)
    setPageData(data)
    
    // Update page history
    setPageHistory(prev => {
      const newHistory = [...prev]
      if (newHistory[newHistory.length - 1] !== page) {
        newHistory.push(page)
      }
      return newHistory
    })
    
    // Update browser history
    window.history.pushState({ page, data }, '', `#${page}`)
    
    console.log('Page changed to:', page, 'with data:', data)
  }

  const t = (en, hi) => (language === 'hi' ? hi : en)

  useEffect(() => {
    const stored = localStorage.getItem('lang')
    if (stored && stored !== language) setLanguage(stored)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero setCurrentPage={handlePageChange} />
      case 'gradeSelection':
        return <GradeSelection setCurrentPage={handlePageChange} />
      case 'subjectSelection':
        return <SubjectSelection setCurrentPage={handlePageChange} selectedGrade={pageData.grade} />
      case 'gameModeSelection':
        return <GameModeSelection setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} />
      case 'difficultySelection':
        return <DifficultySelection setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} mode={pageData.mode} />
      case 'gameInterface':
        return <GameInterface setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} mode={pageData.mode} difficulty={pageData.difficulty} />
      case 'topicSelection':
        return <TopicSelection setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} />
      case 'scienceBranch':
        return <ScienceBranch setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} branch={pageData.branch} />
      case 'mathematicsBranch':
        return <MathematicsBranch setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} />
      case 'mazeGame':
        return <MazeGame setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} topic={pageData.topic} />
      case 'stapooGame':
        return <StapooGame setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} topic={pageData.topic} />
      case 'problemSolvingGames':
        return <ProblemSolvingGames setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} topic={pageData.topic} />
      case 'hangmanGame':
        return <HangmanGame setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} topic={pageData.topic} />
      case 'chemistrySegregationGame':
        return <ChemistrySegregationGame setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} topic={pageData.topic} />
      case 'biologyFlipCardGame':
        return <BiologyFlipCardGame setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} topic={pageData.topic} />
      case 'physicsSnakeLadderGame':
        return <PhysicsSnakeLadderGame setCurrentPage={handlePageChange} selectedGrade={pageData.grade} selectedSubject={pageData.subject} topic={pageData.topic} />
      case 'about':
        return <AboutSection />
      case 'contact':
        return <div className="min-h-screen bg-gray-900 text-white pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8 text-stem-blue">Contact Us</h1>
            <p className="text-xl mb-8">Get in touch with the STEM Quest team</p>
            <div className="bg-gray-800 p-8 rounded-2xl">
              <p className="text-lg mb-4">Email: contact@stemquest.com</p>
              <p className="text-lg mb-4">Phone: (555) 123-4567</p>
              <p className="text-lg">Address: 123 Education St, Learning City, LC 12345</p>
            </div>
          </div>
        </div>
      case 'login':
        return <LoginPage setCurrentPage={handlePageChange} />
      case 'signup':
        return <SignupPage setCurrentPage={handlePageChange} />
      default:
        return <Hero setCurrentPage={handlePageChange} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        pageHistory={pageHistory}
        setPageHistory={setPageHistory}
      />
      {renderPage()}
      {currentPage === 'home' && (
        <>
          <AboutSection />
          <WhyGamifiedSection />
        </>
      )}
      <Footer />
    </div>
  )
}

export default App
