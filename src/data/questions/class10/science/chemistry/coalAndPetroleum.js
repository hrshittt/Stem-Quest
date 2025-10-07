export const coalAndPetroleumQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'What is the main component of natural gas?',
    options: ['Methane', 'Ethane', 'Propane', 'Butane'],
    correctAnswer: 'Methane',
    explanation: 'Methane (CH4) is the primary component of natural gas, typically making up 70-90% of natural gas composition.',
    hints: [
      'This hydrocarbon has only one carbon atom',
      'Its chemical formula is CH4',
      'It\'s the simplest alkane'
    ]
  },
  {
    id: 2,
    type: 'mcq',
    question: 'Which type of coal has the highest carbon content?',
    options: ['Lignite', 'Bituminous', 'Anthracite', 'Peat'],
    correctAnswer: 'Anthracite',
    explanation: 'Anthracite is the highest grade of coal with 86-98% carbon content and high energy density.',
    hints: [
      'This type of coal is the most metamorphosed',
      'It has the highest energy content',
      'It\'s often called "hard coal"'
    ]
  },
  {
    id: 3,
    type: 'numerical',
    question: 'If 1kg of coal produces 8000 kcal of heat, how many kilograms of coal are needed to produce 32000 kcal?',
    correctAnswer: 4,
    explanation: '32000 ÷ 8000 = 4 kg of coal needed',
    hints: [
      'Set up the proportion: 1kg : 8000 kcal',
      'Use cross multiplication',
      'Divide total heat needed by heat per kg'
    ]
  }
]

export default coalAndPetroleumQuestions
