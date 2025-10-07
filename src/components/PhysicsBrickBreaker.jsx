import React, { useState, useRef, useEffect } from 'react'
import FloatingParticles from './FloatingParticles'

const PhysicsBrickBreaker = ({ setCurrentPage, selectedGrade, selectedSubject, selectedTopic, questions }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [gameCompleted, setGameCompleted] = useState(false)
  
  const canvasRef = useRef(null)
  let animationFrameId = null
  
  // Game objects
  const [paddle, setPaddle] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 10,
    speed: 8
  })
  
  const [ball, setBall] = useState({
    x: 0,
    y: 0,
    radius: 8,
    dx: 5,
    dy: -5
  })
  
  const [bricks, setBricks] = useState([])
  const brickRowCount = 3
  const brickColumnCount = 5
  const brickWidth = 75
  const brickHeight = 20
  const brickPadding = 10
  const brickOffsetTop = 30
  const brickOffsetLeft = 30

  // Initialize game objects
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Initialize paddle position
    setPaddle(prev => ({
      ...prev,
      x: (canvas.width - prev.width) / 2,
      y: canvas.height - 30
    }))
    
    // Initialize ball position
    setBall(prev => ({
      ...prev,
      x: canvas.width / 2,
      y: canvas.height - 40
    }))
    
    // Initialize bricks
    const newBricks = []
    for (let c = 0; c < brickColumnCount; c++) {
      newBricks[c] = []
      for (let r = 0; r < brickRowCount; r++) {
        newBricks[c][r] = {
          x: 0,
          y: 0,
          status: 1,
          question: questions[c * brickRowCount + r]
        }
      }
    }
    setBricks(newBricks)
  }, [canvasRef])

  // Game loop
  useEffect(() => {
    if (!gameStarted || showQuestion) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw paddle
      ctx.beginPath()
      ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height)
      ctx.fillStyle = '#3b82f6'
      ctx.fill()
      ctx.closePath()
      
      // Draw ball
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fillStyle = '#f59e0b'
      ctx.fill()
      ctx.closePath()
      
      // Draw bricks
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
            
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            
            ctx.beginPath()
            ctx.rect(brickX, brickY, brickWidth, brickHeight)
            ctx.fillStyle = '#10b981'
            ctx.fill()
            ctx.closePath()
          }
        }
      }
      
      // Ball collision with walls
      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx
      }
      
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy
        } else {
          setLives(prev => prev - 1)
          if (lives === 1) {
            setGameCompleted(true)
            return
          } else {
            ball.x = canvas.width / 2
            ball.y = canvas.height - 40
            ball.dx = 5
            ball.dy = -5
            paddle.x = (canvas.width - paddle.width) / 2
          }
        }
      }
      
      // Ball collision with bricks
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r]
          if (b.status === 1) {
            if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
              ball.dy = -ball.dy
              b.status = 0
              setCurrentQuestion(b.question)
              setShowQuestion(true)
              return
            }
          }
        }
      }
      
      // Move ball
      ball.x += ball.dx
      ball.y += ball.dy
      
      animationFrameId = requestAnimationFrame(draw)
    }
    
    draw()
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [gameStarted, ball, paddle, bricks, showQuestion, lives])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || showQuestion) return
      
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPaddle(prev => ({
          ...prev,
          x: Math.max(0, prev.x - prev.speed)
        }))
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPaddle(prev => ({
          ...prev,
          x: Math.min(canvasRef.current.width - prev.width, prev.x + prev.speed)
        }))
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameStarted, showQuestion])

  const handleStartGame = () => {
    setGameStarted(true)
  }

  const handleAnswer = (answer) => {
    setUserAnswer(answer)
  }

  const handleSubmit = () => {
    const correct = currentQuestion.type === 'mcq' 
      ? userAnswer === currentQuestion.correctAnswer
      : Math.abs(parseFloat(userAnswer) - currentQuestion.correctAnswer) < 0.1
    
    setIsCorrect(correct)
    if (correct) {
      setScore(prev => prev + 100)
    }
    setTimeout(() => {
      setShowQuestion(false)
      setCurrentQuestion(null)
      setUserAnswer('')
      setIsCorrect(null)
      
      // Check if all bricks are destroyed
      let remainingBricks = 0
      bricks.forEach(column => {
        column.forEach(brick => {
          if (brick.status === 1) remainingBricks++
        })
      })
      if (remainingBricks === 0) {
        setGameCompleted(true)
      }
    }, 1500)
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
          Physics Brick Breaker - Grade {selectedGrade}
        </h1>
        <h2 className="text-2xl text-stem-blue mb-4">{selectedTopic}</h2>
        <p className="text-gray-300">
          Break bricks and solve physics problems!
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
                Start Game
              </button>
            </div>
          )}

          {/* Question Modal */}
          {showQuestion && currentQuestion && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-2xl w-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Answer to Continue
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
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="px-8 py-4 bg-stem-green hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-300"
                  >
                    Submit Answer
                  </button>
                </div>

                {isCorrect !== null && (
                  <div className={`mt-4 text-center text-2xl font-bold ${
                    isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Game Over */}
          {gameCompleted && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Game Over!
                </h3>
                <p className="text-gray-300 mb-6">
                  Your score: {score} points
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
              <p className="text-sm text-gray-400">Lives</p>
              <p className="text-xl font-bold">{'❤️'.repeat(lives)}</p>
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

export default PhysicsBrickBreaker
