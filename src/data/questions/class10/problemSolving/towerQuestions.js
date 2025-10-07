export const towerQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'A sequence goes: 2, 6, 12, 20, 30, __. What number comes next?',
    options: ['40', '42', '44', '46'],
    correctAnswer: '42',
    explanation: 'The difference between consecutive terms increases by 2: 4, 6, 8, 10, 12',
    hints: [
      'Look at how much the difference increases each time',
      'The differences are: 4, 6, 8, 10, 12',
      'The differences increase by 2 each time'
    ]
  },
  {
    id: 2,
    type: 'numerical',
    question: 'If a train travels 120km in 2 hours, then 180km in 4 hours, and finally 90km in 3 hours, what is its average speed in km/h?',
    correctAnswer: 50,
    explanation: 'Total distance = 390km, Total time = 9 hours, Average speed = 390/9 = 50 km/h',
    hints: [
      'First add up all the distances',
      'Then add up all the times',
      'Average speed = Total distance ÷ Total time'
    ]
  },
  {
    id: 3,
    type: 'mcq',
    question: 'If Red + Blue = 10, Blue + Green = 12, and Green + Red = 14, what is the value of Red?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: 'Using system of equations: R + B = 10, B + G = 12, G + R = 14. Solving gives R = 8',
    hints: [
      'You have three equations with three unknowns',
      'Add the first and third equations, then subtract the second',
      '2R = 24 - 12 = 12, therefore R = 6'
    ]
  },
  {
    id: 4,
    type: 'numerical',
    question: 'A circular running track has a circumference of 400m. If a runner completes 12.5 laps in 10 minutes, what is their average speed in meters per second?',
    correctAnswer: 8.33,
    explanation: 'Distance = 12.5 × 400 = 5000m, Time = 10 × 60 = 600s, Speed = 5000/600 ≈ 8.33 m/s',
    hints: [
      'First calculate the total distance covered',
      'Convert the time from minutes to seconds',
      'Use the formula: speed = distance ÷ time'
    ]
  },
  {
    id: 5,
    type: 'mcq',
    question: 'In a code, PROBLEM = 7, SOLVING = 7, what does CLIMBING equal?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: 'The code counts the number of letters in each word. CLIMBING has 8 letters.',
    hints: [
      'Look at what PROBLEM and SOLVING have in common',
      'Count the letters in each word',
      'Apply the same rule to CLIMBING'
    ]
  }
]

export default towerQuestions
