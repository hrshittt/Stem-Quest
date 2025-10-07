import React, { useState, useEffect } from 'react';

const ChemistrySegregationGame = ({ setCurrentPage, selectedGrade, selectedSubject, topic }) => {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, question, finished
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const MAX_LEVELS = 4;
  const QUESTIONS_PER_LEVEL = 5;

  // Load questions based on grade, subject, and topic
  const loadQuestions = async () => {
    try {
      let questionModule;
      
      if (selectedSubject === 'science') {
        // Map topic names to file names for chemistry
        const topicMap = {
          'Acids, Bases & Salts': 'acidsBasesSalts',
          'Physical & Chemical Changes': 'physicalChemicalChanges',
          'Separation of Substances': 'separationSubstances',
          'Combustion & Flame': 'combustionFlame',
          'Coal & Petroleum': 'coalPetroleum',
          'Materials: Metals & Non-metals': 'metalsNonmetals',
          'Structure of Atom': 'structureAtom',
          'Chemical Bonding': 'chemicalBonding',
          'Chemical Reactions': 'chemicalReactions',
          'Acids, Bases & Salts': 'acidsBasesSalts',
          'Carbon & its Compounds': 'carbonCompounds',
          'Some Basic Concepts of Chemistry': 'basicConceptsChemistry',
          'Classification of Elements': 'classificationElements'
        };
        
        const fileName = topicMap[topic] || 'metalsNonmetals';
        questionModule = await import(`../data/questions/class${selectedGrade}/science/chemistry/${fileName}.js`);
      }
      
      if (questionModule && questionModule.questions) {
        setQuestions(questionModule.questions);
        setCurrentQuestion(0);
        setGameState('playing');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmitAnswer = () => {
    if (!selectedCategory) return;

    const currentQ = questions[currentQuestion];
    const isCorrect = currentQ.correctCategory === selectedCategory;

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setFeedbackMessage('Correct! Well done!');
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setFeedbackMessage(`Incorrect! The correct category is: ${currentQ.correctCategory}`);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedCategory(null);
      
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Level completed
        if (currentLevel < MAX_LEVELS) {
          setCurrentLevel(currentLevel + 1);
          setCurrentQuestion(0);
          // Load next level questions
          loadQuestions();
        } else {
          setGameCompleted(true);
          setGameState('finished');
        }
      }
    }, 2000);
  };

  const handleBackToTopics = () => {
    setCurrentPage('scienceBranch', { 
      grade: selectedGrade, 
      subject: selectedSubject, 
      branch: 'chemistry'
    });
  };

  const handleRetry = () => {
    setCurrentLevel(1);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameCompleted(false);
    setGameState('playing');
    loadQuestions();
  };

  // Don't auto-load questions - wait for user to click Start Game

  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">🧪 Chemistry Segregation Game</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sort chemical elements and compounds into their correct categories! Complete all 4 levels to master the topic.
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
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

  const renderGameScreen = () => {
    if (questions.length === 0) return <div>Loading questions...</div>;
    
    const currentQ = questions[currentQuestion];
    const categories = currentQ.categories || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">🧪 Chemistry Segregation</h1>
            <p className="text-white text-lg">
              Class {selectedGrade} - {topic}
            </p>
            <p className="text-white">
              Level {currentLevel} of {MAX_LEVELS} | Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="text-white">
              Correct: {correctAnswers} | Wrong: {wrongAnswers}
            </p>
          </div>

          {/* Game Area */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* Question */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sort this element/compound into the correct category:
              </h2>
              <div className="bg-blue-100 rounded-lg p-6 mb-6">
                <h3 className="text-3xl font-bold text-blue-800 mb-2">{currentQ.element}</h3>
                <p className="text-lg text-gray-600">{currentQ.description}</p>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedCategory === category
                      ? 'border-blue-500 bg-blue-100 text-blue-800'
                      : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-semibold">{category}</span>
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedCategory}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                Submit Answer
              </button>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="mt-6 p-4 rounded-lg text-center">
                <p className={`text-lg font-semibold ${
                  feedbackMessage.includes('Correct') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {feedbackMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFinishedScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">🎉 Congratulations!</h1>
        <p className="text-lg text-gray-700 mb-4">
          You completed all {MAX_LEVELS} levels of the {topic} topic!
        </p>
        <p className="text-xl font-bold text-green-600 mb-8">
          Final Score: {correctAnswers} correct out of {correctAnswers + wrongAnswers} total
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
      {gameState === 'finished' && renderFinishedScreen()}
    </div>
  );
};

export default ChemistrySegregationGame;
