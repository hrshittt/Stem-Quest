import React, { useState, useRef, useEffect } from 'react'
import FloatingParticles from './FloatingParticles'

const Hopscotch = ({ setCurrentPage, selectedGrade, selectedSubject, selectedTopic, questions }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [playerAnimating, setPlayerAnimating] = useState(false)
  
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

    const drawHopscotchBoard = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw hopscotch pattern
      const squares = [
        { x: 350, y: 350, type: 'single' },  // 1
        { x: 350, y: 300, type: 'single' },  // 2
        { x: 350, y: 250, type: 'double' },  // 3-4
        { x: 350, y: 200, type: 'single' },  // 5
        { x: 350, y: 150, type: 'double' },  // 6-7
        { x: 350, y: 100, type: 'single' },  // 8
        { x: 350, y: 50, type: 'circle' }    // 9
      ]
      
      squares.forEach((square, index) => {
        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 3
        
        if (square.type === 'single') {
          ctx.beginPath()
          ctx.rect(square.x - 30, square.y - 30, 60, 60)
          ctx.stroke()
          
          // Highlight current position
          if (index === currentPosition) {
            ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
            ctx.fill()
          }
          
          // Draw number
          ctx.fillStyle = '#ffffff'
          ctx.font = '20px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText((index + 1).toString(), square.x, square.y)
        } else if (square.type === 'double') {
          // Left square
          ctx.beginPath()
          ctx.rect(square.x - 65, square.y - 30, 60, 60)
          ctx.stroke()
          
          // Right square
          ctx.beginPath()
          ctx.rect(square.x + 5, square.y - 30, 60, 60)
          ctx.stroke()
          
          // Highlight current position
          if (index === currentPosition) {
            ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
            ctx.fill()
          }
          
          // Draw numbers
          ctx.fillStyle = '#ffffff'
          ctx.font = '20px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText((index + 1).toString(), square.x - 35, square.y)
          ctx.fillText((index + 2).toString(), square.x + 35, square.y)
        } else if (square.type === 'circle') {
          ctx.beginPath()
          ctx.arc(square.x, square.y, 40, 0, Math.PI * 2)
          ctx.stroke()
          
          // Highlight current position
          if (index === currentPosition) {
            ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
            ctx.fill()
          }
          
          // Draw number
          ctx.fillStyle = '#ffffff'
          ctx.font = '20px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText((index + 1).toString(), square.x, square.y)
        }
      })
      
      // Draw player
      if (!showQuestion && !gameCompleted) {
        const currentSquare = squares[currentPosition]
        const playerX = currentSquare.x
        const playerY = currentSquare.y + (playerAnimating ? Math.sin(time * 0.1) * 10 : 0)
        
        // Draw player shadow
        ctx.beginPath()
        ctx.ellipse(playerX, currentSquare.y + 30, 15, 5, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fill()
        
        // Draw player body
        ctx.beginPath()
        ctx.arc(playerX, playerY, 15, 0, Math.PI * 2)
        ctx.fillStyle = '#10b981'
        ctx.fill()
        
        // Draw player face
        ctx.beginPath()
        ctx.arc(playerX, playerY, 10, 0, Math.PI, false)
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Draw player eyes
        ctx.beginPath()
        ctx.arc(playerX - 5, playerY - 5, 2, 0, Math.PI * 2)
        ctx.arc(playerX + 5, playerY - 5, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      }
      
      time++
      animationRef.current = requestAnimationFrame(drawHopscotchBoard)
    }
    
    drawHopscotchBoard()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameStarted, currentPosition, playerAnimating, showQuestion, gameCompleted])

  const handleStartGame = () => {
    setGameStarted(true)
    setPlayerAnimating(true)
    showNextQuestion()
  }

  const showNextQuestion = () => {
    if (currentPosition < questions.length - 1) {
      setCurrentQuestion(questions[currentPosition + 1])
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
        setCurrentPosition(prev => prev + 1)
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
          Hopscotch Challenge - Grade {selectedGrade}
        </h1>
        <h2 className="text-2xl text-stem-blue mb-4">{selectedTopic}</h2>
        <p className="text-gray-300">
          Solve problems to jump forward!
        </p>
      </div>

      {/* Game Container */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-600">
          {/* Game Canvas */}
          <canvas
            ref={canvasRef}
            width={700}
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
                Start Jumping
              </button>
            </div>
          )}

          {/* Question Modal */}
          {showQuestion && currentQuestion && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-2xl w-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Answer to Jump Forward
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
                      placeholder={`Enter your answer${currentQuestion.unit ? ` in ${currentQuestion.unit}` : ''}`}
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
                    Jump!
                  </button>
                </div>

                {isCorrect !== null && (
                  <div className={`mt-4 text-center text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✅ Great Jump!' : '❌ Try Again!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Game Completed */}
          {gameCompleted && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Course Completed!
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
              <p className="text-sm text-gray-400">Position</p>
              <p className="text-xl font-bold">
                Square {currentPosition + 1}/{questions.length}
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

export default Hopscotch
