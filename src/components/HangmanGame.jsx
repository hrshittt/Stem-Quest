import React, { useState, useEffect } from 'react';

const HangmanGame = ({ setCurrentPage, selectedGrade, selectedSubject, topic }) => {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, question, finished, gameOver
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentGrade, setCurrentGrade] = useState(selectedGrade);
  const [currentSubject, setCurrentSubject] = useState(selectedSubject);
  const [currentTopic, setCurrentTopic] = useState(topic);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const MAX_WRONG_GUESSES = 6; // Head, body, left arm, right arm, left leg, right leg

  // Hangman drawing component
  const HangmanDrawing = ({ wrongGuesses }) => {
    const drawHangman = () => {
      const parts = [];
      
      // Gallows
      parts.push(<line key="gallows1" x1="20" y1="180" x2="20" y2="20" stroke="brown" strokeWidth="4" />);
      parts.push(<line key="gallows2" x1="20" y1="20" x2="100" y2="20" stroke="brown" strokeWidth="4" />);
      parts.push(<line key="gallows3" x1="100" y1="20" x2="100" y2="40" stroke="brown" strokeWidth="4" />);
      
      // Head
      if (wrongGuesses >= 1) {
        parts.push(<circle key="head" cx="100" cy="50" r="10" stroke="black" strokeWidth="2" fill="none" />);
      }
      
      // Body
      if (wrongGuesses >= 2) {
        parts.push(<line key="body" x1="100" y1="60" x2="100" y2="120" stroke="black" strokeWidth="2" />);
      }
      
      // Left arm
      if (wrongGuesses >= 3) {
        parts.push(<line key="leftArm" x1="100" y1="80" x2="80" y2="100" stroke="black" strokeWidth="2" />);
      }
      
      // Right arm
      if (wrongGuesses >= 4) {
        parts.push(<line key="rightArm" x1="100" y1="80" x2="120" y2="100" stroke="black" strokeWidth="2" />);
      }
      
      // Left leg
      if (wrongGuesses >= 5) {
        parts.push(<line key="leftLeg" x1="100" y1="120" x2="80" y2="150" stroke="black" strokeWidth="2" />);
      }
      
      // Right leg
      if (wrongGuesses >= 6) {
        parts.push(<line key="rightLeg" x1="100" y1="120" x2="120" y2="150" stroke="black" strokeWidth="2" />);
      }
      
      return parts;
    };

    return (
      <div className="flex justify-center mb-6">
        <svg width="200" height="200" className="border-2 border-gray-300 rounded-lg bg-white">
          {drawHangman()}
        </svg>
      </div>
    );
  };

  // Load questions based on grade, subject, and topic
  const loadQuestions = async () => {
    try {
      let questionModule;
      
      if (currentSubject === 'technology') {
        // Map topic names to file names
        const topicMap = {
          'Introduction to simple machines': 'simpleMachines',
          'Electricity basics (bulb, switch, battery)': 'electricityBasics',
          'Internet & Computers (what is a computer)': 'internetComputers',
          'Environmental awareness (reduce, reuse, recycle)': 'environmentalAwareness',
          'More on machines (pulleys, gears)': 'machinesPulleysGears',
          'Simple circuits': 'simpleCircuits',
          'Cyber safety & digital use': 'cyberSafety',
          'Renewable energy (wind, solar)': 'renewableEnergy',
          'Working of basic machines (lever classes)': 'basicMachines',
          'Electricity in daily life': 'electricityDailyLife',
          'Intro to communication tech': 'communicationTech',
          'Pollution & environmental issues': 'pollutionEnvironmental',
          'Internet basics (networks, browsers)': 'internetBasics',
          'Applications of AI (basic awareness)': 'aiApplications',
          'Sustainable technology': 'sustainableTechnology',
          'Scientific inventions and discoveries': 'scientificInventions',
          'Computer basics (hardware/software awareness)': 'computerBasics',
          'Digital literacy (safe browsing, emails)': 'digitalLiteracy',
          'Robotics basics (concept only)': 'roboticsBasics',
          'Green energy & sustainability': 'greenEnergySustainability'
        };
        
        const fileName = topicMap[currentTopic] || 'simpleMachines';
        questionModule = await import(`../data/questions/class${currentGrade}/technology/${fileName}.js`);
      }
      
      if (questionModule && questionModule.questions) {
        setQuestions(questionModule.questions);
        setCurrentQuestion(0);
        setGameState('playing');
        startNewWord(questionModule.questions[0]);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      // Fallback to default questions
      setQuestions([]);
    }
  };

  const startNewWord = (question) => {
    const word = question.word.toUpperCase();
    setCurrentWord(word);
    setDisplayWord(word.replace(/[A-Z]/g, '_'));
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const handleLetterGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameState !== 'playing') return;
    
    setGuessedLetters([...guessedLetters, letter]);
    
    if (currentWord.includes(letter)) {
      // Correct guess
      const newDisplayWord = currentWord
        .split('')
        .map(char => guessedLetters.includes(char) || char === letter ? char : '_')
        .join('');
      setDisplayWord(newDisplayWord);
      
      // Check if word is complete
      if (!newDisplayWord.includes('_')) {
        setScore(score + 1);
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setTimeout(() => {
            startNewWord(questions[currentQuestion + 1]);
          }, 1000);
        } else {
          setGameCompleted(true);
          setGameState('finished');
        }
      }
    } else {
      // Wrong guess
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        setGameState('gameOver');
      }
    }
  };

  const handleRetry = () => {
    setWrongGuesses(0);
    setGuessedLetters([]);
    setGameState('playing');
    startNewWord(questions[currentQuestion]);
  };

  const handleBackToTopics = () => {
    setCurrentPage('topicSelection', { 
      grade: currentGrade, 
      subject: currentSubject 
    });
  };

  // Don't auto-load questions - wait for user to click Start Game

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">🎯 Hangman Game</h1>
        <p className="text-lg text-gray-700 mb-8">
          Guess the technology word before the hangman is complete! Each wrong guess adds a body part.
        </p>
        
        {currentGrade && currentSubject && currentTopic ? (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Topic Information</h3>
              <p className="text-gray-600"><strong>Grade:</strong> Class {currentGrade}</p>
              <p className="text-gray-600"><strong>Subject:</strong> {currentSubject}</p>
              <p className="text-gray-600"><strong>Topic:</strong> {currentTopic}</p>
            </div>
            
            <button
              onClick={() => {
                setGameState('playing');
                loadQuestions();
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              Start Game
            </button>
            
            <button
              onClick={handleBackToTopics}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              Back to Topics
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
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎯 Hangman Game</h1>
          <p className="text-white text-lg">
            Class {currentGrade} - {currentTopic}
          </p>
          <p className="text-white">
            Question {currentQuestion + 1} of {questions.length} | Score: {score}
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Hangman Drawing */}
          <HangmanDrawing wrongGuesses={wrongGuesses} />
          
          {/* Word Display */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-gray-800 mb-4 tracking-wider">
              {displayWord.split('').map((letter, index) => (
                <span key={index} className="mx-1">
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-600">
              {questions[currentQuestion]?.hint}
            </p>
          </div>
          
          {/* Alphabet Buttons */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 mb-6">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => handleLetterGuess(letter)}
                disabled={guessedLetters.includes(letter) || gameState !== 'playing'}
                className={`p-2 text-sm font-bold rounded-lg transition-colors duration-200 ${
                  guessedLetters.includes(letter)
                    ? currentWord.includes(letter)
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                } disabled:opacity-50`}
              >
                {letter}
              </button>
            ))}
          </div>
          
          {/* Game Status */}
          <div className="text-center">
            {gameState === 'gameOver' && (
              <div className="mb-4">
                <p className="text-red-600 text-xl font-bold mb-4">Game Over! The word was: {currentWord}</p>
                <button
                  onClick={handleRetry}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg mr-4"
                >
                  Try Again
                </button>
                <button
                  onClick={handleBackToTopics}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Back to Topics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinishedScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">🎉 Congratulations!</h1>
        <p className="text-lg text-gray-700 mb-4">
          You completed the {currentTopic} topic successfully!
        </p>
        <p className="text-xl font-bold text-green-600 mb-8">
          Final Score: {score} out of {questions.length}
        </p>
        <div className="space-y-4">
          <button
            onClick={handleBackToTopics}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
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
      {gameState === 'gameOver' && renderGameScreen()}
      {gameState === 'finished' && renderFinishedScreen()}
    </div>
  );
};

export default HangmanGame;
