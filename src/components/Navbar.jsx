import React, { useState, useEffect } from 'react'
import { useLang } from '../i18n.jsx'

const Navbar = ({ currentPage, setCurrentPage, pageHistory, setPageHistory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { lang: language, setLang, t } = useLang()

  const navItems = [
    { name: t('home'), id: 'home' },
    { name: t('about'), id: 'about' },
    { name: t('contact'), id: 'contact' },
    { name: t('login'), id: 'login' }
  ]

  

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (pageHistory && pageHistory.length > 1) {
        const newHistory = [...pageHistory]
        newHistory.pop() // Remove current page
        const previousPage = newHistory[newHistory.length - 1]
        setPageHistory(newHistory)
        setCurrentPage(previousPage)
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [pageHistory, setPageHistory, setCurrentPage])

  const handleBackClick = () => {
    if (pageHistory && pageHistory.length > 1) {
      const newHistory = [...pageHistory]
      newHistory.pop() // Remove current page
      const previousPage = newHistory[newHistory.length - 1]
      setPageHistory(newHistory)
      setCurrentPage(previousPage)
      // Update browser history
      window.history.back()
    } else {
      setCurrentPage('home')
    }
  }

  const handlePageClick = (pageId) => {
    setCurrentPage(pageId)
    // Update browser history
    window.history.pushState({ page: pageId }, '', `#${pageId}`)
  }

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Left side - Back button and Logo */}
          <div className="flex items-center space-x-3">
            {/* Back Button */}
            {currentPage !== 'home' && (
              <button
                onClick={handleBackClick}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition duration-300 group"
                title="Go back"
              >
                <svg 
                  className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {/* Logo - Website Name */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handlePageClick('home')}
                className="flex items-center space-x-2 text-white hover:text-stem-blue transition duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-stem-blue to-stem-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ST</span>
                </div>
                <span className="text-2xl font-bold">STEM Quest</span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    currentPage === item.id
                      ? 'text-stem-blue bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Language selector */}
              <div className="ml-4">
                <select
                  value={language}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-gray-800 text-gray-200 border border-gray-700 rounded-md px-3 py-2 text-sm hover:bg-gray-700"
                  title="Select language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 border-t border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handlePageClick(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  currentPage === item.id
                    ? 'text-stem-blue bg-gray-700'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
