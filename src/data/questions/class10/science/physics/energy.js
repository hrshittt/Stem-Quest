export const energyQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'What is the unit of electrical power?',
    options: ['Volt', 'Ampere', 'Watt', 'Joule'],
    correctAnswer: 'Watt',
    explanation: 'Watt (W) is the SI unit of power, including electrical power. It measures the rate of energy transfer.',
    hints: [
      'Think about the unit used for light bulbs',
      'Named after James Watt',
      'Measures rate of energy use'
    ]
  },
  {
    id: 2,
    type: 'numerical',
    question: 'A light bulb uses 100 watts of power. How much energy (in joules) does it consume in 5 seconds?',
    correctAnswer: 500,
    explanation: 'Energy = Power × Time = 100W × 5s = 500J',
    hints: [
      'Use E = P × t',
      'Remember to multiply watts by seconds',
      'The result will be in joules'
    ]
  }
]

export default energyQuestions
