import React, { useState, useRef, useEffect } from 'react'
import FloatingParticles from './FloatingParticles'

const DetectiveMystery = ({ setCurrentPage, selectedGrade, selectedSubject, selectedTopic, questions }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentClueIndex, setCurrentClueIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentScene, setCurrentScene] = useState(null)
  const [revealedObjects, setRevealedObjects] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  
  // Initialize game scene
  useEffect(() => {
    if (!questions || questions.length === 0) return
    setCurrentQuestion(questions[0])
    setCurrentScene(questions[0].scene)
  }, [questions])

  // Game animation loop
  useEffect(() => {
    if (!gameStarted || !canvasRef.current || !currentScene) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let time = 0

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background based on scene type
      switch (currentScene.type) {
        case 'classroom':
          drawClassroom(ctx)
          break
        case 'map':
          drawMap(ctx)
          break
        case 'party':
          drawParty(ctx)
          break
        case 'deduction':
          drawDeductionScene(ctx)
          break
        case 'calculation':
          drawCalculationScene(ctx)
          break
        default:
          drawDefaultScene(ctx)
      }
      
      // Draw interactive objects with glow effect
      currentScene.objects.forEach((object, index) => {
        if (!revealedObjects.includes(object)) {
          const x = 100 + (index * 150)
          const y = 200
          const glow = Math.abs(Math.sin(time * 0.05)) * 0.5 + 0.5
          
          // Draw object glow
          ctx.beginPath()
          ctx.arc(x, y, 30, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(x, y, 25, x, y, 35)
          gradient.addColorStop(0, `rgba(59, 130, 246, ${glow})`)
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
          
          // Draw object icon
          ctx.font = '24px Arial'
          ctx.fillStyle = '#FFFFFF'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(getObjectEmoji(object), x, y)
        }
      })
      
      time++
      animationRef.current = requestAnimationFrame(drawScene)
    }
    
    drawScene()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameStarted, currentScene, revealedObjects])

  // Helper function to draw scenes
  const drawClassroom = (ctx) => {
    // Draw classroom background
    ctx.fillStyle = '#2C3E50'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw desks
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(50 + j * 200, 100 + i * 100, 150, 60)
      }
    }
    
    // Draw blackboard
    ctx.fillStyle = '#2E7D32'
    ctx.fillRect(50, 20, 700, 60)
  }

  const drawMap = (ctx) => {
    // Draw map background
    ctx.fillStyle = '#FFF8DC'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw grid lines
    ctx.strokeStyle = '#B8860B'
    ctx.lineWidth = 0.5
    for (let i = 0; i < ctx.canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, ctx.canvas.height)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(ctx.canvas.width, i)
      ctx.stroke()
    }
  }

  const drawParty = (ctx) => {
    // Draw party room background
    ctx.fillStyle = '#4A148C'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw decorative elements
    for (let i = 0; i < 20; i++) {
      ctx.beginPath()
      ctx.arc(
        Math.random() * ctx.canvas.width,
        Math.random() * ctx.canvas.height,
        Math.random() * 5 + 2,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`
      ctx.fill()
    }
  }

  const drawDeductionScene = (ctx) => {
    // Draw logic diagram background
    ctx.fillStyle = '#1A237E'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw connecting lines
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(400, 50)
    ctx.lineTo(200, 200)
    ctx.moveTo(400, 50)
    ctx.lineTo(600, 200)
    ctx.stroke()
  }

  const drawCalculationScene = (ctx) => {
    // Draw calculation workspace
    ctx.fillStyle = '#263238'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw grid for calculations
    ctx.strokeStyle = '#546E7A'
    ctx.lineWidth = 1
    for (let i = 0; i < ctx.canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, ctx.canvas.height)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(ctx.canvas.width, i)
      ctx.stroke()
    }
  }

  const drawDefaultScene = (ctx) => {
    // Draw default investigation room
    ctx.fillStyle = '#37474F'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Add some ambient lighting effect
    const gradient = ctx.createRadialGradient(
      ctx.canvas.width / 2, ctx.canvas.height / 2, 100,
      ctx.canvas.width / 2, ctx.canvas.height / 2, 400
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const getObjectEmoji = (object) => {
    const emojiMap = {
      'students': '👥',
      'books': '📚',
      'venn-diagram': '⊕',
      'train': '🚂',
      'compass': '🧭',
      'ruler': '📏',
      'people': '👥',
      'calculator': '🔢',
      'notebook': '📓',
      'cat': '🐱',
      'logic-tree': '🌳',
      'notepad': '📝',
      'marbles': '⚪',
      'fraction-chart': '📊',
      'number-line': '➡️',
      'pattern-blocks': '🔲',
      'graph': '📈',
      'geometric-shapes': '🔷',
      'protractor': '📐'
    }
    return emojiMap[object] || '❓'
  }

  // Handle object click
  const handleCanvasClick = (event) => {
    if (!gameStarted || showQuestion) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    currentScene.objects.forEach((object, index) => {
      const objectX = 100 + (index * 150)
      const objectY = 200
      
      if (
        !revealedObjects.includes(object) &&
        Math.sqrt(Math.pow(x - objectX, 2) + Math.pow(y - objectY, 2)) < 30
      ) {
        setRevealedObjects(prev => [...prev, object])
        if (currentQuestion.clues[currentClueIndex]) {
          // Show clue
          setTimeout(() => {
            setCurrentClueIndex(prev => prev + 1)
            if (currentClueIndex === currentQuestion.clues.length - 1) {
              setShowQuestion(true)
            }
          }, 1000)
        } else {
          setShowQuestion(true)
        }
      }
    })
  }

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
      
      // Move to next question or complete game
      if (questionIndex < questions.length - 1) {
        setTimeout(() => {
          setQuestionIndex(prev => prev + 1)
          setCurrentQuestion(questions[questionIndex + 1])
          setCurrentScene(questions[questionIndex + 1].scene)
          setCurrentClueIndex(0)
          setRevealedObjects([])
          setShowQuestion(false)
          setUserAnswer('')
          setIsCorrect(null)
        }, 1500)
      } else {
        setGameCompleted(true)
      }
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
          Detective Mystery - Grade {selectedGrade}
        </h1>
        <h2 className="text-2xl text-stem-blue mb-4">{selectedTopic}</h2>
        <p className="text-gray-300">
          Investigate the scene and solve mysteries!
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
            className="w-full bg-gray-900/50 rounded-xl mb-6 cursor-pointer"
            onClick={handleCanvasClick}
          />

          {/* Game Controls */}
          {!gameStarted && !gameCompleted && (
            <div className="text-center">
              <button
                onClick={handleStartGame}
                className="px-8 py-4 bg-stem-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300"
              >
                Start Investigation
              </button>
            </div>
          )}

          {/* Clues Panel */}
          {gameStarted && !gameCompleted && !showQuestion && (
            <div className="bg-gray-700 rounded-2xl p-4 mb-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Investigation Progress
              </h3>
              <div className="space-y-2">
                {currentQuestion.clues.slice(0, currentClueIndex).map((clue, index) => (
                  <div key={index} className="text-gray-300 p-2 bg-gray-600/50 rounded-lg">
                    {clue}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question Modal */}
          {showQuestion && currentQuestion && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-2xl w-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Solve the Mystery
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
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="px-8 py-4 bg-stem-green hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-300"
                  >
                    Submit Solution
                  </button>
                </div>

                {isCorrect !== null && (
                  <div className={`mt-4 text-center text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✅ Mystery Solved!' : '❌ Try Again!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Game Completed */}
          {gameCompleted && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Investigation Complete!
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
              <p className="text-sm text-gray-400">Mysteries</p>
              <p className="text-xl font-bold">
                {questionIndex + 1}/{questions.length}
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

export default DetectiveMystery
