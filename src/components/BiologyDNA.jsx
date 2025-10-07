import React, { useState, useRef, useEffect } from 'react'
import FloatingParticles from './FloatingParticles'

const BiologyDNA = ({ setCurrentPage, selectedGrade, selectedSubject, selectedTopic, questions }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [dnaStrands, setDnaStrands] = useState([])
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 300 })
  
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  
  // Initialize DNA strands
  useEffect(() => {
    if (!questions || questions.length === 0) return
    
    const strands = questions.map((q, index) => ({
      x: Math.random() * 700 + 50,
      y: Math.random() * 300 + 50,
      rotation: 0,
      collected: false,
      question: q,
      color: q.dnaStrand?.color || '#FFFFFF'
    }))
    
    setDnaStrands(strands)
  }, [questions])

  // Game animation loop
  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let time = 0

    const animate = () => {
      if (!gameStarted || showQuestion) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw DNA strands
      dnaStrands.forEach((strand, index) => {
        if (!strand.collected) {
          const x = strand.x
          const y = strand.y + Math.sin(time * 0.05 + index) * 10
          
          // Draw double helix
          for (let i = 0; i < 20; i++) {
            const offset = i * 10
            const wave1 = Math.sin(time * 0.05 + offset * 0.2) * 20
            const wave2 = Math.sin(time * 0.05 + offset * 0.2 + Math.PI) * 20
            
            // Draw connecting lines
            ctx.beginPath()
            ctx.strokeStyle = strand.color
            ctx.lineWidth = 2
            ctx.moveTo(x + wave1, y + offset)
            ctx.lineTo(x + wave2, y + offset)
            ctx.stroke()
            
            // Draw nucleotide bases
            ctx.beginPath()
            ctx.fillStyle = strand.color
            ctx.arc(x + wave1, y + offset, 4, 0, Math.PI * 2)
            ctx.fill()
            
            ctx.beginPath()
            ctx.fillStyle = strand.color
            ctx.arc(x + wave2, y + offset, 4, 0, Math.PI * 2)
            ctx.fill()
          }
          
          // Check collision with player
          const dx = x - playerPosition.x
          const dy = y - playerPosition.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 30) {
            setCurrentQuestion(strand.question)
            setShowQuestion(true)
            const newStrands = [...dnaStrands]
            newStrands[index].collected = true
            setDnaStrands(newStrands)
          }
        }
      })
      
      // Draw player
      ctx.beginPath()
      ctx.fillStyle = '#3b82f6'
      ctx.arc(playerPosition.x, playerPosition.y, 15, 0, Math.PI * 2)
      ctx.fill()
      
      // Add glow effect to player
      ctx.beginPath()
      ctx.arc(playerPosition.x, playerPosition.y, 20, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(
        playerPosition.x, playerPosition.y, 15,
        playerPosition.x, playerPosition.y, 25
      )
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
      ctx.fillStyle = gradient
      ctx.fill()
      
      time++
      
      // Check if all strands are collected
      if (dnaStrands.every(strand => strand.collected)) {
        setGameCompleted(true)
        return
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameStarted, dnaStrands, playerPosition, showQuestion])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || showQuestion) return
      
      const speed = 5
      setPlayerPosition(prev => {
        let newX = prev.x
        let newY = prev.y
        
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
            newY = Math.max(15, prev.y - speed)
            break
          case 'ArrowDown':
          case 's':
            newY = Math.min(canvasRef.current.height - 15, prev.y + speed)
            break
          case 'ArrowLeft':
          case 'a':
            newX = Math.max(15, prev.x - speed)
            break
          case 'ArrowRight':
          case 'd':
            newX = Math.min(canvasRef.current.width - 15, prev.x + speed)
            break
          default:
            return prev
        }
        
        return { x: newX, y: newY }
      })
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
    const correct = userAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(prev => prev + 100)
    }
    setTimeout(() => {
      setShowQuestion(false)
      setCurrentQuestion(null)
      setUserAnswer('')
      setIsCorrect(null)
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
          Biology DNA Explorer - Grade {selectedGrade}
        </h1>
        <h2 className="text-2xl text-stem-blue mb-4">{selectedTopic}</h2>
        <p className="text-gray-300">
          Collect DNA strands and answer questions about biology!
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
                Start Exploration
              </button>
            </div>
          )}

          {/* Game Instructions */}
          {gameStarted && !gameCompleted && !showQuestion && (
            <div className="text-center text-gray-300 text-sm">
              Use arrow keys or WASD to move and collect DNA strands
            </div>
          )}

          {/* Question Modal */}
          {showQuestion && currentQuestion && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-2xl w-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  DNA Analysis Required
                </h3>
                
                <div className="bg-gray-700 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {currentQuestion.question}
                  </h4>
                  
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
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="px-8 py-4 bg-stem-green hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-300"
                  >
                    Submit Analysis
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

          {/* Game Completed */}
          {gameCompleted && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">🧬</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  DNA Collection Complete!
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
              <p className="text-sm text-gray-400">DNA Strands</p>
              <p className="text-xl font-bold">
                {dnaStrands.filter(s => s.collected).length}/{dnaStrands.length}
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

export default BiologyDNA
