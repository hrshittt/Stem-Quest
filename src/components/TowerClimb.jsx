import React, { useState, useRef, useEffect } from 'react'
import FloatingParticles from './FloatingParticles'

const TowerClimb = ({ setCurrentPage, selectedGrade, selectedSubject, selectedTopic, questions }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 350 })
  const [climbing, setClimbing] = useState(false)
  
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  
  // Initialize game
  useEffect(() => {
    if (!questions || questions.length === 0) return
    setCurrentQuestion(questions[0])
  }, [questions])

  // Game animation loop
  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let time = 0

    const drawTower = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw tower background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#1a365d')
      gradient.addColorStop(1, '#2d3748')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw stars
      for (let i = 0; i < 50; i++) {
        const x = Math.sin(time * 0.001 + i) * 10 + (i * 20) % canvas.width
        const y = Math.cos(time * 0.001 + i) * 10 + (i * 15) % canvas.height
        const size = Math.abs(Math.sin(time * 0.002 + i)) * 2 + 1
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(time * 0.002 + i))})`
        ctx.fill()
      }
      
      // Draw tower levels
      const levelHeight = 50
      const towerWidth = 200
      const towerX = (canvas.width - towerWidth) / 2
      
      for (let i = 0; i <= currentLevel; i++) {
        const y = canvas.height - (i * levelHeight) - levelHeight
        
        // Draw level platform
        ctx.fillStyle = '#4a5568'
        ctx.fillRect(towerX, y, towerWidth, 10)
        
        // Add decorative elements
        ctx.fillStyle = '#718096'
        for (let j = 0; j < 4; j++) {
          ctx.fillRect(towerX + (j * 60) + 10, y - 20, 40, 20)
        }
        
        // Level number
        ctx.fillStyle = '#ffffff'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(`Level ${i + 1}`, canvas.width / 2, y + 30)
      }
      
      // Draw player
      if (!climbing) {
        const bobY = Math.sin(time * 0.1) * 5
        drawPlayer(ctx, playerPosition.x, playerPosition.y + bobY)
      } else {
        const progress = (time % 30) / 30
        const startY = playerPosition.y
        const targetY = playerPosition.y - 50
        const currentY = startY + (targetY - startY) * progress
        
        drawPlayer(ctx, playerPosition.x, currentY)
        
        if (progress > 0.9) {
          setClimbing(false)
          setPlayerPosition(prev => ({ ...prev, y: targetY }))
        }
      }
      
      time++
      animationRef.current = requestAnimationFrame(drawTower)
    }
    
    drawTower()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameStarted, currentLevel, playerPosition, climbing])

  const drawPlayer = (ctx, x, y) => {
    // Draw player shadow
    ctx.beginPath()
    ctx.ellipse(x, y + 30, 15, 5, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.fill()
    
    // Draw rope
    ctx.beginPath()
    ctx.moveTo(x, y - 20)
    ctx.lineTo(x, y + 20)
    ctx.strokeStyle = '#cbd5e0'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Draw climbing gear
    ctx.beginPath()
    ctx.arc(x, y, 15, 0, Math.PI * 2)
    ctx.fillStyle = '#ed8936'
    ctx.fill()
    
    // Draw harness details
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.strokeStyle = '#dd6b20'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Draw helmet
    ctx.beginPath()
    ctx.arc(x, y - 10, 8, 0, Math.PI * 2)
    ctx.fillStyle = '#f6ad55'
    ctx.fill()
  }

  const handleStartGame = () => {
    setGameStarted(true)
    showNextQuestion()
  }

  const showNextQuestion = () => {
    if (currentLevel < questions.length - 1) {
      setCurrentQuestion(questions[currentLevel + 1])
      setShowQuestion(true)
      setUserAnswer('')
      setIsCorrect(null)
      setShowHint(false)
      setHintIndex(0)
    } else {
      setGameCompleted(true)
    }
  }

  const handleAnswer = (answer) => {
    setUserAnswer(answer)
  }

  const handleShowHint = () => {
    if (hintIndex < currentQuestion.hints.length - 1) {
      setHintIndex(prev => prev + 1)
    }
    setShowHint(true)
  }

  const handleSubmit = () => {
    const correct = currentQuestion.type === 'mcq'
      ? userAnswer === currentQuestion.correctAnswer
      : Math.abs(parseFloat(userAnswer) - currentQuestion.correctAnswer) < 0.1
    
    setIsCorrect(correct)
    if (correct) {
      setScore(prev => prev + 100)
      setTimeout(() => {
        setShowQuestion(false)
        setClimbing(true)
        setCurrentLevel(prev => prev + 1)
        showNextQuestion()
      }, 1500)
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
          Tower Climb - Grade {selectedGrade}
        </h1>
        <h2 className="text-2xl text-stem-blue mb-4">{selectedTopic}</h2>
        <p className="text-gray-300">
          Solve problems to climb higher!
        </p>
      </div>

      {/* Game Container */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-600">
          {/* Game Canvas */}
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full bg-gray-900/50 rounded-xl mb-6"
          />

          {/* Game Controls */}
          {!gameStarted && !gameCompleted && (
            <div className="text-center">
              <button
                onClick={handleStartGame}
                className="px-8 py-4 bg-stem-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300"
              >
                Start Climbing
              </button>
            </div>
          )}

          {/* Question Modal */}
          {showQuestion && currentQuestion && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-2xl w-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Solve to Climb Higher
                </h3>
                
                <div className="bg-gray-700 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {currentQuestion.question}
                  </h4>
                  
                  {currentQuestion.type === 'mcq' ? (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
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
                  ) : (
                    <input
                      type="number"
                      step="0.1"
                      value={userAnswer}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Enter your answer"
                      className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400"
                    />
                  )}

                  {/* Hints */}
                  {currentQuestion.hints && (
                    <div className="mt-4">
                      <button
                        onClick={handleShowHint}
                        className="text-stem-blue hover:text-blue-400 text-sm"
                      >
                        Need a hint?
                      </button>
                      {showHint && currentQuestion.hints.slice(0, hintIndex + 1).map((hint, index) => (
                        <p key={index} className="mt-2 text-gray-400 text-sm">
                          Hint {index + 1}: {hint}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="px-8 py-4 bg-stem-green hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-300"
                  >
                    Climb!
                  </button>
                </div>

                {isCorrect !== null && (
                  <div className={`mt-4 text-center text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✅ Keep Climbing!' : '❌ Try Again!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Game Completed */}
          {gameCompleted && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">🏔️</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Summit Reached!
                </h3>
                <p className="text-gray-300 mb-6">
                  Score: {score} points
                </p>
                <button
                  onClick={handleBackToTopics}
                  className="px-8 py-4 bg-stem-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300"
                >
                  Back to Topics
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Stats */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600">
          <div className="flex justify-between items-center text-white">
            <div className="text-center">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-xl font-bold">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Level</p>
              <p className="text-xl font-bold">
                {currentLevel + 1}/{questions.length}
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

export default TowerClimb
