export const patternRecognitionQuestions = [
  {
    id: 1,
    type: 'numerical',
    question: 'Find the next number in the sequence: 2, 6, 12, 20, 30, __',
    correctAnswer: 42,
    explanation: 'The differences between consecutive terms form an arithmetic sequence: 4, 6, 8, 10, 12',
    hints: [
      'Look at the difference between consecutive numbers',
      'See how the difference changes',
      'The difference increases by 2 each time'
    ]
  },
  {
    id: 2,
    type: 'mcq',
    question: 'What comes next in the pattern: Triangle, Square, Pentagon, __?',
    options: ['Circle', 'Hexagon', 'Rectangle', 'Octagon'],
    correctAnswer: 'Hexagon',
    explanation: 'The pattern follows regular polygons with increasing number of sides: 3, 4, 5, 6',
    hints: [
      'Count the sides of each shape',
      'Look for how the number of sides changes',
      'Each shape has one more side than the previous'
    ]
  }
]

export default patternRecognitionQuestions
