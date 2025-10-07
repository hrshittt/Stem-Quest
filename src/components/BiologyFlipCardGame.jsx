import React, { useState, useEffect } from 'react';

const BiologyFlipCardGame = ({ setCurrentPage, selectedGrade, selectedSubject, topic }) => {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, finished
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);

  const CARDS_PER_GAME = 20; // 10 pairs

  // Load questions and create cards
  const loadQuestions = async () => {
    try {
      let questionModule;
      
      if (selectedSubject === 'science') {
        // Map topic names to file names for biology
        const topicMap = {
          'Nutrition in plants & animals': 'nutritionPlantsAnimals',
          'Respiration in Organisms': 'respirationOrganisms',
          'Transportation in Plants & Animals': 'transportationPlantsAnimals',
          'Microorganisms': 'microorganisms',
          'Cell structure': 'cellStructure',
          'Reproduction in Animals': 'reproductionAnimals',
          'Tissues & Diversity in Living Organisms': 'tissuesDiversity',
          'Natural Resources': 'naturalResources',
          'Improvement in Food Resources': 'improvementFoodResources',
          'Genetics & Heredity': 'geneticsHeredity',
          'Life Processes': 'lifeProcesses',
          'Control & Coordination': 'controlCoordination',
          'The Living World': 'livingWorld',
          'Biological Classification': 'biologicalClassification',
          'Plant Kingdom': 'plantKingdom'
        };
        
        const fileName = topicMap[topic] || 'cellStructure';
        questionModule = await import(`../data/questions/class${selectedGrade}/science/biology/${fileName}.js`);
      }
      
      if (questionModule && questionModule.questions) {
        setQuestions(questionModule.questions);
        createCards(questionModule.questions);
        setGameState('playing');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    }
  };

  const createCards = (questions) => {
    const cardPairs = [];
    
    // Take first 10 questions to create 10 pairs
    const selectedQuestions = questions.slice(0, 10);
    
    selectedQuestions.forEach((question, index) => {
      // Create two cards for each pair
      cardPairs.push({
        id: `${index}-1`,
        pairId: index,
        content: question.term,
        type: 'term',
        description: question.description
      });
      
      cardPairs.push({
        id: `${index}-2`,
        pairId: index,
        content: question.definition,
        type: 'definition',
        description: question.description
      });
    });

    // Shuffle the cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length >= 2 || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs([...matchedPairs, firstCardId, secondCardId]);
        setFlippedCards([]);
        
        // Check if game is completed
        if (matchedPairs.length + 2 === CARDS_PER_GAME) {
          setTimeout(() => {
            setGameCompleted(true);
            setGameState('finished');
          }, 500);
        }
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleBackToTopics = () => {
    setCurrentPage('scienceBranch', { 
      grade: selectedGrade, 
      subject: selectedSubject, 
      branch: 'biology'
    });
  };

  const handleRetry = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameCompleted(false);
    setGameState('playing');
    createCards(questions);
  };

  // Don't auto-load questions - wait for user to click Start Game

  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">🌱 Biology Flip Card Game</h1>
        <p className="text-lg text-gray-700 mb-8">
          Match biology terms with their definitions! Flip cards to find matching pairs and complete all 10 pairs.
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🌱 Biology Flip Cards</h1>
          <p className="text-white text-lg">
            Class {selectedGrade} - {topic}
          </p>
          <p className="text-white">
            Moves: {moves} | Matched: {matchedPairs.length / 2} / 10
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Cards Grid */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4 mb-8">
            {cards.map((card) => {
              const isFlipped = flippedCards.includes(card.id);
              const isMatched = matchedPairs.includes(card.id);
              
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 transform ${
                    isMatched
                      ? 'bg-green-100 border-green-500 scale-95'
                      : isFlipped
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-200 border-gray-400 hover:border-gray-600 hover:scale-105'
                  }`}
                >
                  <div className="h-full flex items-center justify-center p-2">
                    {isFlipped || isMatched ? (
                      <div className="text-center">
                        <div className={`text-sm font-bold mb-1 ${
                          card.type === 'term' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {card.type === 'term' ? 'TERM' : 'DEFINITION'}
                        </div>
                        <div className="text-xs text-gray-700 leading-tight">
                          {card.content}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-2xl">🌱</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Game Instructions */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Click on cards to flip them and find matching pairs!
            </p>
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
  );

  const renderFinishedScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">🎉 Congratulations!</h1>
        <p className="text-lg text-gray-700 mb-4">
          You completed the {topic} flip card game!
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
      {gameState === 'finished' && renderFinishedScreen()}
    </div>
  );
};

export default BiologyFlipCardGame;
