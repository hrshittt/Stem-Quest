export const motionAndForceQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'What is the SI unit of force?',
    options: ['Newton', 'Joule', 'Pascal', 'Watt'],
    correctAnswer: 'Newton',
    explanation: 'Newton (N) is the SI unit of force. It is defined as the force needed to accelerate a mass of 1 kilogram at a rate of 1 meter per second squared.',
    hints: [
      'Think about the unit named after Isaac Newton',
      'It measures push or pull',
      'Symbol is N'
    ]
  },
  {
    id: 2,
    type: 'numerical',
    question: 'A force of 20N acts on a mass of 4kg. What is the acceleration produced? (in m/s²)',
    correctAnswer: 5,
    explanation: 'Using F = ma, a = F/m = 20/4 = 5 m/s²',
    hints: [
      'Use Newton\'s Second Law: F = ma',
      'Rearrange to find a = F/m',
      'Plug in the values and solve'
    ]
  }
]

export default motionAndForceQuestions
