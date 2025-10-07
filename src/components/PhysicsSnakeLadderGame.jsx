import React, { useState, useEffect } from 'react';
import { useLang } from '../i18n.jsx'

const PhysicsSnakeLadderGame = ({ setCurrentPage, selectedGrade, selectedSubject, topic }) => {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, question, finished
  const [playerPosition, setPlayerPosition] = useState(1);
  const [diceValue, setDiceValue] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [moves, setMoves] = useState(0);

  const BOARD_SIZE = 100;
  const SNAKE_POSITIONS = [16, 33, 42, 45, 47, 53, 62, 73, 87, 93, 94, 98];
  const LADDER_POSITIONS = [4, 9, 28, 32, 35, 37, 43, 51, 52, 55, 56, 57, 63, 65, 67, 69, 70, 71, 72, 75, 77, 79, 82, 89, 91, 92, 96, 97, 99];

  // Load questions based on grade, subject, and topic
  const loadQuestions = async () => {
    try {
      let questionModule;
      
      if (selectedSubject === 'science') {
        // Map topic names to file names for physics
        const topicMap = {
          'Motion & Force': 'motionForce',
          'Heat & Temperature': 'heatTemperature',
          'Light & Sound Basics': 'lightSoundBasics',
          'Force & Pressure': 'forcePressure',
          'Sound': 'sound',
          'Light & Vision': 'lightVision',
          'Laws of Motion': 'lawsMotion',
          'Work, Power, Energy': 'workPowerEnergy',
          'Gravitation': 'gravitation',
          'Light (Reflection & Refraction)': 'lightReflectionRefraction',
          'Electricity & Magnetism': 'electricityMagnetism',
          'Sources of Energy': 'sourcesEnergy',
          'Physical World & Measurement': 'physicalWorldMeasurement',
          'Kinematics': 'kinematics',
          'Laws of Motion': 'lawsMotion'
        };
        
        const fileName = topicMap[topic] || 'motionForce';
        questionModule = await import(`../data/questions/class${selectedGrade}/science/physics/${fileName}.js`);
      }
      
      if (questionModule && questionModule.questions) {
        setQuestions(questionModule.questions);
        setGameState('playing');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    }
  };

  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue);
    return newDiceValue;
  };

  const movePlayer = () => {
    const diceRoll = rollDice();
    const newPosition = Math.min(playerPosition + diceRoll, BOARD_SIZE);
    setPlayerPosition(newPosition);
    setMoves(moves + 1);

    // Check if player reached a snake or ladder position
    if (SNAKE_POSITIONS.includes(newPosition)) {
      // Show snake question
      showQuestionAtPosition(newPosition, 'snake');
    } else if (LADDER_POSITIONS.includes(newPosition)) {
      // Show ladder question
      showQuestionAtPosition(newPosition, 'ladder');
    } else if (newPosition === BOARD_SIZE) {
      // Game completed
      setGameCompleted(true);
      setGameState('finished');
    }
  };

  const showQuestionAtPosition = (position, type) => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion({
      ...randomQuestion,
      position,
      type
    });
    setShowQuestion(true);
    setGameState('question');
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (currentQuestion.type === 'snake') {
      if (isCorrect) {
        // Stay at current position
        setShowQuestion(false);
        setGameState('playing');
      } else {
        // Go back to previous snake position or start
        const previousSnakePosition = SNAKE_POSITIONS[SNAKE_POSITIONS.indexOf(currentQuestion.position) - 1] || 1;
        setPlayerPosition(previousSnakePosition);
        setShowQuestion(false);
        setGameState('playing');
      }
    } else if (currentQuestion.type === 'ladder') {
      if (isCorrect) {
        // Move to next ladder position or advance
        const nextLadderPosition = LADDER_POSITIONS[LADDER_POSITIONS.indexOf(currentQuestion.position) + 1] || Math.min(currentQuestion.position + 10, BOARD_SIZE);
        setPlayerPosition(nextLadderPosition);
        setShowQuestion(false);
        setGameState('playing');
      } else {
        // Don't climb ladder, stay at current position
        setShowQuestion(false);
        setGameState('playing');
      }
    }

    setSelectedAnswer(null);
    setCurrentQuestion(null);
  };

  const handleBackToTopics = () => {
    setCurrentPage('scienceBranch', { 
      grade: selectedGrade, 
      subject: selectedSubject, 
      branch: 'physics'
    });
  };

  const handleRetry = () => {
    setPlayerPosition(1);
    setDiceValue(1);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowQuestion(false);
    setGameCompleted(false);
    setMoves(0);
    setGameState('playing');
  };

  // Don't auto-load questions - wait for user to click Start Game

  const { t } = useLang()

  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">⚡ Physics Snake & Ladder</h1>
        <p className="text-lg text-gray-700 mb-8">
          Roll the dice and answer physics questions! Green tiles are ladders (climb up if correct), red tiles are snakes (slide down if wrong).
        </p>
        
        {selectedGrade && selectedSubject && topic ? (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Topic Information</h3>
              <p className="text-gray-600"><strong>Grade:</strong> Class {selectedGrade}</p>
              <p className="text-gray-600"><strong>Subject:</strong> {selectedSubject}</p>
              <p className="text-gray-600"><strong>Topic:</strong> {topic}</p>
            </div>
            
            <button
              onClick={() => {
                setGameState('playing');
                loadQuestions();
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              {t('getStarted')}
            </button>
            
            <button
              onClick={handleBackToTopics}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              {t('backToTopics')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">Loading topic information...</p>
            <button
              onClick={handleBackToTopics}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              Back to Topics
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderGameScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">⚡ Physics Snake & Ladder</h1>
          <p className="text-white text-lg">
            Class {selectedGrade} - {topic}
          </p>
          <p className="text-white">
            Position: {playerPosition} / {BOARD_SIZE} | Moves: {moves}
          </p>
        </div>

        {/* Game Board */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="grid grid-cols-10 gap-1 mb-8">
            {Array.from({ length: BOARD_SIZE }, (_, i) => {
              const position = i + 1;
              const isSnake = SNAKE_POSITIONS.includes(position);
              const isLadder = LADDER_POSITIONS.includes(position);
              const isPlayerHere = playerPosition === position;
              
              return (
                <div
                  key={position}
                  className={`aspect-square rounded border-2 flex items-center justify-center text-xs font-bold relative ${
                    isPlayerHere
                      ? 'bg-yellow-400 border-yellow-600 text-black'
                      : isSnake
                      ? 'bg-red-200 border-red-400 text-red-800'
                      : isLadder
                      ? 'bg-green-200 border-green-400 text-green-800'
                      : 'bg-gray-100 border-gray-300 text-gray-700'
                  }`}
                >
                  {position}
                  {isPlayerHere && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        P
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Game Controls */}
          <div className="text-center">
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-800 mb-2">Dice: {diceValue}</div>
              <button
                onClick={movePlayer}
                disabled={gameState !== 'playing'}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                Roll Dice
              </button>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetry}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">
            {currentQuestion.type === 'snake' ? '🐍 Snake Question' : '🪜 Ladder Question'}
          </h2>
          <p className="text-gray-600">
            Position: {currentQuestion.position}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-purple-500 bg-purple-100 text-purple-800'
                    : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );

  const renderFinishedScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">🎉 Congratulations!</h1>
        <p className="text-lg text-gray-700 mb-4">
          You completed the {topic} snake and ladder game!
        </p>
        <p className="text-xl font-bold text-green-600 mb-8">
          Total Moves: {moves}
        </p>
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
          >
            Play Again
          </button>
          <button
            onClick={handleBackToTopics}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
          >
            Back to Topics
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {gameState === 'welcome' && renderWelcomeScreen()}
      {gameState === 'playing' && renderGameScreen()}
      {gameState === 'question' && renderQuestionScreen()}
      {gameState === 'finished' && renderFinishedScreen()}
    </div>
  );
};

export default PhysicsSnakeLadderGame;
