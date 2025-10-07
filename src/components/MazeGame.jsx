import React, { useState, useEffect, useCallback } from 'react'
import { useLang } from '../i18n.jsx'

const MazeGame = ({ setCurrentPage, selectedGrade, selectedSubject, topic }) => {
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 })
  const { t, lang } = useLang()
  const [checkpoints, setCheckpoints] = useState([])
  const [completedCheckpoints, setCompletedCheckpoints] = useState(new Set())
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [showTryAgain, setShowTryAgain] = useState(false)
  const [answerFeedback, setAnswerFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Maze dimensions
  const MAZE_WIDTH = 20
  const MAZE_HEIGHT = 15
  const TOTAL_CHECKPOINTS = 31

  // Generate maze walls (simplified for demo)
  const generateMaze = () => {
    const walls = []
    // Create border walls
    for (let x = 0; x < MAZE_WIDTH; x++) {
      walls.push({ x, y: 0 })
      walls.push({ x, y: MAZE_HEIGHT - 1 })
    }
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      walls.push({ x: 0, y })
      walls.push({ x: MAZE_WIDTH - 1, y })
    }
    
    // Add more internal walls for larger maze
    const internalWalls = [
      // Vertical walls
      { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
      { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 },
      { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 },
      { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 }, { x: 12, y: 6 },
      { x: 15, y: 2 }, { x: 15, y: 3 }, { x: 15, y: 4 }, { x: 15, y: 5 },
      { x: 18, y: 3 }, { x: 18, y: 4 }, { x: 18, y: 5 }, { x: 18, y: 6 },
      
      // Horizontal walls
      { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
      { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 },
      { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 10, y: 9 }, { x: 11, y: 9 },
      { x: 11, y: 12 }, { x: 12, y: 12 }, { x: 13, y: 12 }, { x: 14, y: 12 },
      { x: 14, y: 9 }, { x: 15, y: 9 }, { x: 16, y: 9 }, { x: 17, y: 9 },
      { x: 17, y: 6 }, { x: 18, y: 6 }, { x: 19, y: 6 },
      
      // Additional maze complexity
      { x: 4, y: 8 }, { x: 5, y: 8 }, { x: 6, y: 8 },
      { x: 7, y: 11 }, { x: 8, y: 11 }, { x: 9, y: 11 },
      { x: 13, y: 8 }, { x: 14, y: 8 }, { x: 15, y: 8 },
      { x: 16, y: 11 }, { x: 17, y: 11 }, { x: 18, y: 11 }
    ]
    
    return [...walls, ...internalWalls]
  }

  const [mazeWalls] = useState(generateMaze())

  // Generate checkpoints
  const generateCheckpoints = () => {
    const checkpointPositions = [
      // Row 1-2
      { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 7, y: 2 }, { x: 10, y: 2 }, { x: 13, y: 2 }, { x: 16, y: 2 },
      
      // Row 3-4
      { x: 2, y: 4 }, { x: 5, y: 4 }, { x: 8, y: 4 }, { x: 11, y: 4 }, { x: 14, y: 4 }, { x: 17, y: 4 },
      
      // Row 5-6
      { x: 1, y: 6 }, { x: 4, y: 6 }, { x: 7, y: 6 }, { x: 10, y: 6 }, { x: 13, y: 6 }, { x: 16, y: 6 },
      
      // Row 7-8
      { x: 2, y: 8 }, { x: 5, y: 8 }, { x: 8, y: 8 }, { x: 11, y: 8 }, { x: 14, y: 8 }, { x: 17, y: 8 },
      
      // Row 9-10
      { x: 1, y: 10 }, { x: 4, y: 10 }, { x: 7, y: 10 }, { x: 10, y: 10 }, { x: 13, y: 10 }, { x: 16, y: 10 },
      
      // Row 11-12
      { x: 2, y: 12 }, { x: 5, y: 12 }, { x: 8, y: 12 }, { x: 11, y: 12 }, { x: 14, y: 12 }, { x: 17, y: 12 },
      
      // Final red checkpoint at the end
      { x: 18, y: 13, isFinal: true }
    ]
    
    return checkpointPositions.map((pos, index) => ({
      id: index + 1,
      x: pos.x,
      y: pos.y,
      completed: false,
      isFinal: pos.isFinal || false
    }))
  }

  // Load questions for the topic
  const loadQuestions = useCallback(async () => {
    try {
      // Map topic names to file names
      const topicFileMap = {
        'Whole Numbers, Integers, Factors, Multiples': 'wholeNumbersIntegersFactorsMultiples',
        'Fractions & Decimals': 'fractionsDecimals',
        'Ratios & Proportions': 'ratiosProportions',
        'Basic Geometry (Perimeter, Area, Shapes)': 'basicGeometry',
        'Data Handling (Pictographs, Bar Graphs)': 'dataHandling',
        'Integers & Rational Numbers': 'integersRationalNumbers',
        'Algebra (basic expressions)': 'algebraBasicExpressions',
        'Geometry (angles, lines, triangles basics)': 'geometryAnglesLinesTriangles',
        'Perimeter, Area, Volume': 'perimeterAreaVolume',
        'Probability (coin, dice basics)': 'probabilityCoinDice',
        'Exponents & Powers': 'exponentsPowers',
        'Algebra (linear equations basics)': 'algebraLinearEquations',
        'Geometry (polygons, transformations)': 'geometryPolygonsTransformations',
        'Mensuration (volume & surface area)': 'mensurationVolumeSurfaceArea',
        'Statistics (mean, median, mode)': 'statisticsMeanMedianMode',
        'Polynomials': 'polynomials',
        'Linear Equations (2 variables)': 'linearEquations2Variables',
        'Coordinate Geometry': 'coordinateGeometry',
        'Geometry (circles, triangles applications)': 'geometryCirclesTriangles',
        'Probability & Statistics': 'probabilityStatistics',
        'Quadratic Equations': 'quadraticEquations',
        'Arithmetic Progressions': 'arithmeticProgressions',
        'Trigonometry (applications only)': 'trigonometryApplications',
        'Coordinate Geometry (distance, slope, midpoint)': 'coordinateGeometryDistanceSlope',
        'Sets & Functions': 'setsFunctions',
        'Trigonometry': 'trigonometry',
        'Complex Numbers': 'complexNumbers',
        'Linear Inequalities': 'linearInequalities',
        'Permutations & Combinations': 'permutationsCombinations',
        'Relations & Functions': 'relationsFunctions',
        'Inverse Trigonometric Functions': 'inverseTrigonometricFunctions',
        'Matrices': 'matrices',
        'Determinants': 'determinants',
        'Applications of Derivatives': 'applicationsOfDerivatives'
      }

      const fileName = topicFileMap[topic]
      if (fileName) {
        const module = await import(`../data/questions/class${selectedGrade}/mathematics/${fileName}.js`)
        setQuestions(module.questions || [])
      } else {
        // Fallback questions if topic not found
        setQuestions(generateFallbackQuestions())
      }
    } catch (error) {
      console.error('Error loading questions:', error)
      setQuestions(generateFallbackQuestions())
    }
  }, [selectedGrade, topic])

  // Generate fallback questions
  const generateFallbackQuestions = () => {
    return [
      {
        question: `What is 2 + 3?`,
        type: "mcq",
        options: ["4", "5", "6", "7"],
        correctAnswer: "5"
      },
      {
        question: `What is 10 - 4?`,
        type: "mcq",
        options: ["5", "6", "7", "8"],
        correctAnswer: "6"
      },
      {
        question: `What is 3 × 4?`,
        type: "mcq",
        options: ["10", "11", "12", "13"],
        correctAnswer: "12"
      },
      {
        question: `What is 15 ÷ 3?`,
        type: "mcq",
        options: ["4", "5", "6", "7"],
        correctAnswer: "5"
      },
      {
        question: `What is the next number in the sequence: 2, 4, 6, 8, ?`,
        type: "mcq",
        options: ["9", "10", "11", "12"],
        correctAnswer: "10"
      }
    ]
  }

  useEffect(() => {
    setCheckpoints(generateCheckpoints())
    loadQuestions()
  }, [loadQuestions])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showQuestionModal || gameCompleted) return

      // Prevent default arrow key behavior to stop screen scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      const newPosition = { ...playerPosition }
      
      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(1, newPosition.y - 1)
          break
        case 'ArrowDown':
          newPosition.y = Math.min(MAZE_HEIGHT - 2, newPosition.y + 1)
          break
        case 'ArrowLeft':
          newPosition.x = Math.max(1, newPosition.x - 1)
          break
        case 'ArrowRight':
          newPosition.x = Math.min(MAZE_WIDTH - 2, newPosition.x + 1)
          break
        default:
          return
      }

      // Check if new position is a wall
      const isWall = mazeWalls.some(wall => wall.x === newPosition.x && wall.y === newPosition.y)
      if (!isWall) {
        setPlayerPosition(newPosition)
        
        // Check if player reached a checkpoint
        const checkpoint = checkpoints.find(cp => cp.x === newPosition.x && cp.y === newPosition.y)
        if (checkpoint && !completedCheckpoints.has(checkpoint.id)) {
          showQuestionAtCheckpoint(checkpoint)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playerPosition, mazeWalls, checkpoints, completedCheckpoints, showQuestionModal, gameCompleted])

  const showQuestionAtCheckpoint = (checkpoint) => {
    if (questions.length > 0) {
      const questionIndex = Math.floor(Math.random() * questions.length)
      const question = { ...questions[questionIndex], isFinal: checkpoint.isFinal }
      setCurrentQuestion(question)
      setCurrentQuestionIndex(questionIndex)
      setSelectedAnswer(null)
      setShowSubmitButton(false)
      setShowTryAgain(false)
      setAnswerFeedback('')
      setShowQuestionModal(true)
    }
  }

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer)
    setShowSubmitButton(true)
    setShowTryAgain(false)
    setAnswerFeedback('')
  }

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    setAnswerFeedback(isCorrect ? 'Correct!' : 'Incorrect!')
    setShowSubmitButton(false)
    setShowTryAgain(!isCorrect)

    if (isCorrect) {
      setScore(score + 10)
      const checkpoint = checkpoints.find(cp => cp.x === playerPosition.x && cp.y === playerPosition.y)
      if (checkpoint) {
        setCompletedCheckpoints(prev => new Set([...prev, checkpoint.id]))
        setCheckpoints(prev => prev.map(cp => 
          cp.id === checkpoint.id ? { ...cp, completed: true } : cp
        ))
      }
      
      // Close modal after a short delay
      setTimeout(() => {
        setShowQuestionModal(false)
        setCurrentQuestion(null)
        setSelectedAnswer(null)
        setAnswerFeedback('')
        
        // Check if all checkpoints are completed
        if (completedCheckpoints.size + 1 >= TOTAL_CHECKPOINTS) {
          setGameCompleted(true)
        }
      }, 1500)
    }
  }

  const handleTryAgain = () => {
    setSelectedAnswer(null)
    setShowSubmitButton(false)
    setShowTryAgain(false)
    setAnswerFeedback('')
  }


  const handleBackToTopics = () => {
    setCurrentPage('topicSelection', { 
      grade: selectedGrade, 
      subject: selectedSubject 
    })
  }

  const progressPercentage = Math.round((completedCheckpoints.size / TOTAL_CHECKPOINTS) * 100)

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      {/* Game Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-400">
            {topic} - {lang === 'hi' ? 'भूलभुलैया चुनौती' : 'Maze Challenge'}
          </h1>
          <button
            onClick={handleBackToTopics}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            {t('backToTopics')}
          </button>
        </div>
        
        {/* Progress Display */}
        <div className="flex justify-between items-center text-green-400 text-lg font-semibold">
          <span>{lang === 'hi' ? 'चेकपॉइंट' : 'Checkpoints'}: {completedCheckpoints.size}/{TOTAL_CHECKPOINTS}</span>
          <span>{lang === 'hi' ? 'प्रगति' : 'Progress'}: {progressPercentage}%</span>
          <span>{lang === 'hi' ? 'स्कोर' : 'Score'}: {score}</span>
        </div>
      </div>

      {/* Game Container */}
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-green-400 rounded-lg p-4 bg-gray-900">
          {/* Maze */}
          <div className="relative">
            <div 
              className="grid gap-0"
              style={{ 
                gridTemplateColumns: `repeat(${MAZE_WIDTH}, 1fr)`,
                gridTemplateRows: `repeat(${MAZE_HEIGHT}, 1fr)`,
                aspectRatio: `${MAZE_WIDTH}/${MAZE_HEIGHT}`
              }}
            >
              {Array.from({ length: MAZE_HEIGHT }, (_, y) =>
                Array.from({ length: MAZE_WIDTH }, (_, x) => {
                  const isWall = mazeWalls.some(wall => wall.x === x && wall.y === y)
                  const isPlayer = playerPosition.x === x && playerPosition.y === y
                  const checkpoint = checkpoints.find(cp => cp.x === x && cp.y === y)
                  const isCompletedCheckpoint = checkpoint && completedCheckpoints.has(checkpoint.id)
                  const isFinalCheckpoint = checkpoint && checkpoint.isFinal
                  
                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`
                        w-full h-full border border-gray-600 flex items-center justify-center relative
                        ${isWall ? 'bg-gray-800' : 'bg-gray-900'}
                        ${isPlayer ? 'bg-blue-500 shadow-lg shadow-blue-400/50' : ''}
                        ${checkpoint && !isCompletedCheckpoint && !isFinalCheckpoint ? 'bg-yellow-400' : ''}
                        ${isCompletedCheckpoint ? 'bg-green-500' : ''}
                        ${isFinalCheckpoint && !isCompletedCheckpoint ? 'bg-red-500' : ''}
                        ${isFinalCheckpoint && isCompletedCheckpoint ? 'bg-red-600' : ''}
                      `}
                    >
                      {isPlayer && (
                        <div className="w-4 h-4 bg-blue-200 rounded-sm shadow-lg animate-pulse border-2 border-blue-100"></div>
                      )}
                      {checkpoint && !isCompletedCheckpoint && !isFinalCheckpoint && (
                        <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse shadow-lg"></div>
                      )}
                      {isCompletedCheckpoint && !isFinalCheckpoint && (
                        <div className="w-3 h-3 bg-green-200 rounded-full shadow-lg"></div>
                      )}
                      {isFinalCheckpoint && !isCompletedCheckpoint && (
                        <div className="w-4 h-4 bg-red-200 rounded-full animate-pulse shadow-lg border-2 border-red-100"></div>
                      )}
                      {isFinalCheckpoint && isCompletedCheckpoint && (
                        <div className="w-4 h-4 bg-red-300 rounded-full shadow-lg border-2 border-red-100"></div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center text-green-400">
            <p className="text-lg">{lang === 'hi' ? 'चलने के लिए एरो कुंजियाँ उपयोग करें' : 'Use arrow keys to move'}</p>
            <p className="text-lg">{lang === 'hi' ? 'प्रगति के लिए चेकपॉइंट पर प्रश्नों का उत्तर दें!' : 'Answer questions at checkpoints to progress!'}</p>
          </div>
        </div>
      </div>

      {/* Question Modal */}
      {showQuestionModal && currentQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 border-2 border-green-400">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {currentQuestion.isFinal ? (lang === 'hi' ? '🎯 अंतिम चेकपॉइंट! 🎯' : '🎯 Final Checkpoint! 🎯') : (lang === 'hi' ? 'चेकपॉइंट प्रश्न' : 'Checkpoint Question')}
            </h3>
            
            <div className="mb-6">
              <p className="text-xl text-gray-200 mb-6">
                {currentQuestion.question}
              </p>
              
              {(currentQuestion.type === 'mcq' || (currentQuestion.options && currentQuestion.options.length > 0)) && (
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelection(option)}
                      className={`w-full p-4 text-left rounded-lg transition-colors text-white ${
                        selectedAnswer === option 
                          ? 'bg-blue-600 border-2 border-blue-400' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'numeric' && (
                <div className="space-y-4 mb-6">
                  <input
                    type="number"
                    placeholder="Enter your answer"
                    value={selectedAnswer || ''}
                    onChange={(e) => {
                      const val = e.target.value
                      setSelectedAnswer(val)
                      setShowSubmitButton(Boolean(val))
                      setShowTryAgain(false)
                      setAnswerFeedback('')
                    }}
                    className="w-full p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
                  />
                </div>
              )}

              {/* True/False shorthand support */}
              {(currentQuestion.type === 'truefalse' || currentQuestion.type === 'tf') && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['True','False'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelection(option)}
                      className={`p-4 rounded-lg text-white transition-colors ${
                        selectedAnswer === option ? 'bg-blue-600 border-2 border-blue-400' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Fallback: short text input if no handled type */}
              {!['mcq','numeric','truefalse','tf'].includes(String(currentQuestion.type || '').toLowerCase()) && (
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    value={selectedAnswer || ''}
                    onChange={(e) => {
                      const val = e.target.value
                      setSelectedAnswer(val)
                      setShowSubmitButton(Boolean(val))
                      setShowTryAgain(false)
                      setAnswerFeedback('')
                    }}
                    className="w-full p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Answer Feedback */}
              {answerFeedback && (
                <div className={`text-center mb-4 p-3 rounded-lg ${
                  answerFeedback === 'Correct!' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {answerFeedback}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {showSubmitButton && (
                  <button
                    onClick={handleAnswerSubmit}
                    className="flex-1 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    {t('submit')} {lang === 'hi' ? 'उत्तर' : 'Answer'}
                  </button>
                )}
                
                {showTryAgain && (
                  <button
                    onClick={handleTryAgain}
                    className="flex-1 p-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                  >
                    {t('retry')}
                  </button>
                )}

                {!showSubmitButton && !showTryAgain && answerFeedback === 'Correct!' && (
                  <button
                    onClick={() => {
                      setShowQuestionModal(false)
                      setCurrentQuestion(null)
                      setSelectedAnswer(null)
                      setAnswerFeedback('')
                    }}
                    className="flex-1 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {t('continue')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Completed Modal */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 border-2 border-green-400 text-center">
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-xl text-white mb-6">
              You completed the maze challenge!
            </p>
            <p className="text-lg text-gray-300 mb-2">
              Final Score: {score} points
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Checkpoints Completed: {TOTAL_CHECKPOINTS}/{TOTAL_CHECKPOINTS}
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Including the final red checkpoint! 🎯
            </p>
            <div className="space-y-3">
              <button
                onClick={handleBackToTopics}
                className="w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Back to Topics
              </button>
              <button
                onClick={() => {
                  setGameCompleted(false)
                  setPlayerPosition({ x: 1, y: 1 })
                  setCompletedCheckpoints(new Set())
                  setScore(0)
                  setCheckpoints(generateCheckpoints())
                }}
                className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MazeGame
