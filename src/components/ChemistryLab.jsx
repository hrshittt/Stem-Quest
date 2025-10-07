import React, { useState, useRef, useEffect } from 'react'
import FloatingParticles from './FloatingParticles'

const ChemistryLab = ({ setCurrentPage, selectedGrade, selectedSubject, selectedTopic, questions }) => {
  const [currentExperiment, setCurrentExperiment] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [experimentsCompleted, setExperimentsCompleted] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const canvasRef = useRef(null)
  const subjectName = "Chemistry"

  // Setup canvas for animations
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const drawBeaker = (x, y) => {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + 60, y)
      ctx.lineTo(x + 70, y + 100)
      ctx.lineTo(x - 10, y + 100)
      ctx.closePath()
      ctx.strokeStyle = '#ffffff'
      ctx.stroke()
    }

    const drawBubbles = (x, y, time) => {
      for (let i = 0; i < 5; i++) {
        const offset = Math.sin(time * 0.01 + i) * 10
        const size = Math.abs(Math.sin(time * 0.01 + i)) * 5 + 2
        
        ctx.beginPath()
        ctx.arc(x + offset, y - (time % 100) - i * 20, size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.fill()
      }
    }

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (isAnimating) {
        // Draw main beaker
        drawBeaker(canvas.width / 2 - 30, 50)
        
        // Animate bubbles
        drawBubbles(canvas.width / 2, 130, time)
        
        // Color change animation based on current experiment
        if (questions[currentExperiment]?.visualSetup?.animation === 'color-change') {
          const alpha = Math.abs(Math.sin(time * 0.002))
          ctx.fillStyle = `rgba(255, 192, 203, ${alpha})` // Pink color for basic solutions
          ctx.fillRect(canvas.width / 2 - 25, 70, 50, 70)
        }
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate(0)
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAnimating, currentExperiment, questions])

  const handleStartExperiment = () => {
    setIsAnimating(true)
    setShowQuestion(true)
  }

  const handleAnswer = (answer) => {
    setUserAnswer(answer)
  }

  const handleSubmit = () => {
    const correct = userAnswer === questions[currentExperiment].correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    setIsAnimating(false)
    
    if (correct) {
      setExperimentsCompleted(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentExperiment < questions.length - 1) {
      setCurrentExperiment(prev => prev + 1)
      setShowQuestion(false)
      setUserAnswer('')
      setIsCorrect(null)
      setShowResult(false)
      setIsAnimating(false)
    } else {
      // All experiments completed
      handleBackToTopics()
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
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Chemistry Lab - Grade {selectedGrade}
        </h1>
        <h2 className="text-2xl text-stem-blue mb-4">{selectedTopic}</h2>
        <p className="text-gray-300">
          Conduct experiments and answer questions to progress!
        </p>
      </div>

      {/* Lab Interface */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-600">
          {/* Canvas for animations */}
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="w-full bg-gray-900/50 rounded-xl mb-6"
          />

          {/* Experiment Controls */}
          {!showQuestion && !showResult && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Experiment {currentExperiment + 1} of {questions.length}
              </h3>
              <button
                onClick={handleStartExperiment}
                className="px-8 py-4 bg-stem-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300"
              >
                Start Experiment
              </button>
            </div>
          )}

          {/* Question */}
          {showQuestion && !showResult && (
            <div className="bg-gray-700 rounded-2xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                {questions[currentExperiment].question}
              </h4>
              
              <div className="space-y-3">
                {questions[currentExperiment].options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={userAnswer === option}
                      onChange={() => handleAnswer(option)}
                      className="text-stem-blue focus:ring-stem-blue"
                    />
                    <span className="text-white">{option}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  className="px-8 py-4 bg-stem-green hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-300"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="text-center">
              <div className={`text-2xl font-bold mb-4 ${
                isCorrect ? 'text-green-400' : 'text-red-400'
              }`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
              </div>
              
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-stem-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300"
              >
                {currentExperiment < questions.length - 1 ? 'Next Experiment' : 'Complete Lab'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600">
          <div className="flex justify-between items-center text-white">
            <div className="text-center">
              <p className="text-sm text-gray-400">Experiments</p>
              <p className="text-xl font-bold">{experimentsCompleted}/{questions.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-xl font-bold">
                {Math.round((experimentsCompleted / questions.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="text-center mb-8">
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

export default ChemistryLab
