import React, { useState, useEffect, useCallback } from 'react'

// Icon for the player
const PlayerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-lg">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

const StapooGame = ({ setCurrentPage, selectedGrade, selectedSubject, topic }) => {
    // --- State Management ---
    const [gameState, setGameState] = useState('welcome'); // welcome, playing, question, finished
    const [currentPosition, setCurrentPosition] = useState(0); // 0 is start, 1-10 are blocks
    const [targetPosition, setTargetPosition] = useState(1);
    const [questionsForTurn, setQuestionsForTurn] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [feedback, setFeedback] = useState({ show: false, correct: false, message: '' });
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    
    // --- Game Data ---
    const boardLayout = [
        { id: 10, type: 'double-right', gridArea: '1 / 2 / 2 / 3' },
        { id: 9, type: 'double-left', gridArea: '1 / 1 / 2 / 2' },
        { id: 8, type: 'single', gridArea: '2 / 1 / 3 / 3' },
        { id: 7, type: 'double-right', gridArea: '3 / 2 / 4 / 3' },
        { id: 6, type: 'double-left', gridArea: '3 / 1 / 4 / 2' },
        { id: 5, type: 'single', gridArea: '4 / 1 / 5 / 3' },
        { id: 4, type: 'double-right', gridArea: '5 / 2 / 6 / 3' },
        { id: 3, type: 'double-left', gridArea: '5 / 1 / 6 / 2' },
        { id: 2, type: 'single', gridArea: '6 / 1 / 7 / 3' },
        { id: 1, type: 'single', gridArea: '7 / 1 / 8 / 3' },
    ];

    // Load questions for the topic
    const loadQuestions = useCallback(async () => {
        try {
            let fileName = ''
            let subjectPath = ''
            
            if (selectedSubject === 'mathematics') {
                // Map topic names to file names for mathematics
                const mathTopicFileMap = {
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
                fileName = mathTopicFileMap[topic]
                subjectPath = 'mathematics'
            } else if (selectedSubject === 'problemSolving') {
                // Map topic names to file names for problem solving
                const problemSolvingTopicFileMap = {
                    'Simple puzzles': 'simplePuzzles',
                    'Pattern recognition': 'patternRecognition',
                    'Logical reasoning games': 'logicalReasoning',
                    'Sequence/ordering problems': 'sequenceOrdering',
                    'Sudoku-like puzzles': 'sudokuLikePuzzles',
                    'Word & number riddles': 'wordNumberRiddles',
                    'Venn diagram puzzles': 'vennDiagramPuzzles',
                    'Brain teasers': 'brainTeasers',
                    'Logical grids': 'logicalGrids',
                    'Analogies': 'analogies',
                    'Problem-based puzzles': 'problemBasedPuzzles',
                    'Critical thinking scenarios': 'criticalThinkingScenarios',
                    'Strategy puzzles': 'strategyPuzzles',
                    'Critical reasoning problems': 'criticalReasoningProblems',
                    'Pattern-based math games': 'patternBasedMathGames',
                    'Real-world problem solving': 'realWorldProblemSolving',
                    'Advanced logic puzzles': 'advancedLogicPuzzles',
                    'Problem-solving case studies': 'problemSolvingCases',
                    'Critical decision-making games': 'criticalDecisionMaking',
                    'Analytical puzzles': 'analyticalPuzzles'
                }
                fileName = problemSolvingTopicFileMap[topic]
                subjectPath = 'problemSolving'
            }

            if (fileName && subjectPath) {
                const module = await import(`../data/questions/class${selectedGrade}/${subjectPath}/${fileName}.js`)
                setQuestions(module.questions || [])
            } else {
                // Fallback questions if topic not found
                setQuestions(generateFallbackQuestions())
            }
        } catch (error) {
            console.error('Error loading questions:', error)
            setQuestions(generateFallbackQuestions())
        }
    }, [selectedGrade, selectedSubject, topic])

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
        loadQuestions()
    }, [loadQuestions])

    // --- Game Logic Functions ---

    const startGame = () => {
        setCurrentPosition(0);
        setGameState('playing');
        setFeedback({ show: false, message: '', correct: false });
        setScore(0);
    };

    const handleHopClick = () => {
        let nextPosKey;
        let nextTargetPosition;
        let questionsNeeded;

        switch (currentPosition) {
            case 0: // Start
                nextPosKey = '1';
                nextTargetPosition = 1;
                questionsNeeded = 1;
                break;
            case 1:
                nextPosKey = '2';
                nextTargetPosition = 2;
                questionsNeeded = 1;
                break;
            case 2:
                nextPosKey = '3_4';
                nextTargetPosition = 4;
                questionsNeeded = 2;
                break;
            case 4:
                nextPosKey = '5';
                nextTargetPosition = 5;
                questionsNeeded = 1;
                break;
            case 5:
                nextPosKey = '6_7';
                nextTargetPosition = 7;
                questionsNeeded = 2;
                break;
            case 7:
                nextPosKey = '8';
                nextTargetPosition = 8;
                questionsNeeded = 1;
                break;
            case 8:
                nextPosKey = '9_10';
                nextTargetPosition = 10;
                questionsNeeded = 2;
                break;
            default:
                return; // Should not happen
        }

        // Select random questions for this turn
        const selectedQuestions = []
        const availableQuestions = [...questions]
        
        for (let i = 0; i < questionsNeeded && availableQuestions.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length)
            const question = availableQuestions[randomIndex]
            selectedQuestions.push({
                id: `q${i + 1}`,
                text: question.question,
                options: question.options || [],
                correct: question.options ? question.options.indexOf(question.correctAnswer) : 0
            })
            availableQuestions.splice(randomIndex, 1)
        }

        setTargetPosition(nextTargetPosition);
        setQuestionsForTurn(selectedQuestions);
        setUserAnswers({});
        setGameState('question');
    };
    
    const handleAnswerSelect = (questionId, optionIndex) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleSubmitAnswers = () => {
        let allCorrect = true;
        for (const q of questionsForTurn) {
            if (userAnswers[q.id] !== q.correct) {
                allCorrect = false;
                break;
            }
        }

        if (allCorrect) {
            setFeedback({ show: true, correct: true, message: 'Correct! Great job!' });
            setCurrentPosition(targetPosition);
            setScore(score + questionsForTurn.length * 10);
            if (targetPosition === 10) {
                 setTimeout(() => {
                    setGameState('finished');
                 }, 1500);
            }
        } else {
            setFeedback({ show: true, correct: false, message: 'Not quite. Try the next turn!' });
        }
        
        setTimeout(() => {
             setGameState('playing');
             setFeedback({ show: false, message: '', correct: false });
        }, 2000);
    };

    const handleBackToTopics = () => {
        setCurrentPage('topicSelection', { 
            grade: selectedGrade, 
            subject: selectedSubject 
        })
    }

    // --- Render Functions ---
    
    const renderPlayer = () => {
        let positionStyle = {};
        if (currentPosition === 0) {
            positionStyle = { gridRow: '8 / 9', gridColumn: '1 / 3', justifySelf: 'center', alignSelf: 'center' };
        } else {
            // For double blocks, place player in the middle. Adjust if needed.
             if ([4, 7, 10].includes(currentPosition)) {
                const blockLeft = boardLayout.find(b => b.id === currentPosition - 1);
                if(blockLeft) {
                    positionStyle = { gridArea: blockLeft.gridArea, gridColumn: '1 / 3', justifySelf: 'center', alignSelf: 'center', transform: 'translateX(50%)' };
                }
             } else {
                const block = boardLayout.find(b => b.id === currentPosition);
                if (block) {
                    positionStyle = { gridArea: block.gridArea, justifySelf: 'center', alignSelf: 'center' };
                }
             }
        }
        return (
            <div style={positionStyle} className="transition-all duration-500 ease-in-out z-10">
                <PlayerIcon />
            </div>
        );
    };

    const renderWelcomeScreen = () => (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-20 text-white text-center p-4">
            <h1 className="text-3xl md:text-4xl font-bold font-mono mb-4 text-yellow-300">Stapoo Math!</h1>
            <p className="text-base md:text-lg mb-4 max-w-2xl">A hopscotch game to learn {topic} for Grade {selectedGrade}.</p>
            <p className="text-base md:text-lg mb-8 max-w-2xl">Hop on the blocks by answering questions correctly. Have fun!</p>
            <div className="flex gap-4">
                <button
                    onClick={startGame}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
                >
                    Start Playing
                </button>
                <button
                    onClick={handleBackToTopics}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
                >
                    Back to Topics
                </button>
            </div>
        </div>
    );

    const renderQuestionModal = () => (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-20 p-4">
            <div className="bg-gray-800 border-4 border-yellow-400 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-yellow-300">Answer to Hop!</h2>
                <div className="space-y-6">
                    {questionsForTurn.map((q) => (
                        <div key={q.id}>
                            <p className="text-lg md:text-xl mb-3 font-semibold">{q.text}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswerSelect(q.id, i)}
                                        className={`p-3 rounded-lg text-lg transition-colors duration-200 border-2 ${userAnswers[q.id] === i ? 'bg-yellow-500 border-yellow-300 text-black font-bold' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={handleSubmitAnswers}
                        disabled={Object.keys(userAnswers).length !== questionsForTurn.length}
                        className="bg-green-600 text-white font-bold py-3 px-10 rounded-full text-xl shadow-lg transition-transform duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed enabled:hover:bg-green-700 enabled:hover:scale-105"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
    
    const renderFinishedScreen = () => (
        <div className="absolute inset-0 bg-blue-900 bg-opacity-80 flex flex-col justify-center items-center z-20 text-white text-center p-4">
            <h1 className="text-4xl font-bold mb-4 text-yellow-300 animate-bounce">You Won!</h1>
            <p className="text-xl mb-4">You are a {topic} superstar!</p>
            <p className="text-lg mb-8">Final Score: {score} points</p>
            <div className="flex gap-4">
                <button
                    onClick={startGame}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
                >
                    Play Again
                </button>
                <button
                    onClick={handleBackToTopics}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
                >
                    Back to Topics
                </button>
            </div>
        </div>
    );

    const renderFeedbackPopup = () => (
        <div className={`absolute top-5 left-1/2 -translate-x-1/2 p-4 rounded-xl shadow-lg text-white font-bold text-xl z-30 transition-all duration-300 ${feedback.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} ${feedback.correct ? 'bg-green-500' : 'bg-red-500'}`}>
            {feedback.message}
        </div>
    );

    const blockStyles = [
        { rot: 'rotate-[-2deg]', color: 'text-pink-400' },
        { rot: 'rotate-[1deg]', color: 'text-cyan-300' },
        { rot: 'rotate-[3deg]', color: 'text-lime-300' },
        { rot: 'rotate-[-1deg]', color: 'text-yellow-300' },
        { rot: 'rotate-[2deg]', color: 'text-orange-400' },
        { rot: 'rotate-[-1.5deg]', color: 'text-pink-400' },
        { rot: 'rotate-[2.5deg]', color: 'text-cyan-300' },
        { rot: 'rotate-[1.5deg]', color: 'text-lime-300' },
        { rot: 'rotate-[-2deg]', color: 'text-yellow-300' },
        { rot: 'rotate-[1deg]', color: 'text-orange-400' },
    ];

    return (
        <main className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden">
            {/* Google Font Import and Chalk font style */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
                    .font-chalk {
                        font-family: 'Kalam', cursive;
                    }
                `}
            </style>
            
            {/* Game Header */}
            <div className="absolute top-4 left-4 text-white">
                <h1 className="text-lg font-bold text-yellow-400">
                    {topic} - Stapoo Game
                </h1>
                <p className="text-sm">Grade {selectedGrade} | Score: {score}</p>
            </div>

            <div className="w-full max-w-[180px] sm:max-w-[200px] relative">
                <div 
                    className="grid grid-cols-2 gap-1"
                >
                    {/* Game Board */}
                    {boardLayout.map(block => {
                        const style = blockStyles[block.id - 1];
                        return (
                            <div 
                                key={block.id} 
                                style={{ gridArea: block.gridArea }} 
                                className={`flex items-center justify-center rounded-lg border-2 border-white bg-transparent bg-opacity-10 transition-colors duration-300 transform aspect-square ${style.rot} ${currentPosition >= block.id ? 'bg-white' : ''}`}>
                                <span className={`font-chalk text-2xl sm:text-3xl font-bold ${style.color} opacity-80`}>{block.id}</span>
                            </div>
                        )
                    })}
                    
                    {/* Player */}
                    {renderPlayer()}
                </div>
            </div>
            
            {/* Game Controls */}
            {gameState === 'playing' && currentPosition < 10 && (
                <div className="mt-4">
                    <button
                        onClick={handleHopClick}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-200 animate-pulse"
                    >
                        Hop!
                    </button>
                </div>
            )}
            
            {/* Overlays */}
            {feedback.show && renderFeedbackPopup()}
            {gameState === 'welcome' && renderWelcomeScreen()}
            {gameState === 'question' && renderQuestionModal()}
            {gameState === 'finished' && renderFinishedScreen()}
        </main>
    );
}

export default StapooGame
