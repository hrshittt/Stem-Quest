export const coordinateGeometryQuestions = [
  {
    id: 1,
    type: 'numerical',
    question: 'Find the distance between points A(3,4) and B(0,0).',
    correctAnswer: 5,
    explanation: 'Using distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²] = √[(0-3)² + (0-4)²] = √(9 + 16) = √25 = 5',
    hints: [
      'Use the distance formula',
      'Square the differences in x and y coordinates',
      'Add those squares and take the square root'
    ]
  },
  {
    id: 2,
    type: 'numerical',
    question: 'What is the slope of the line passing through points (2,3) and (4,7)?',
    correctAnswer: 2,
    explanation: 'Slope = (y₂-y₁)/(x₂-x₁) = (7-3)/(4-2) = 4/2 = 2',
    hints: [
      'Use the slope formula',
      'Slope is change in y divided by change in x',
      'Make sure the subtraction order is consistent'
    ]
  },
  {
    id: 3,
    type: 'mcq',
    question: 'Lines with slopes 2 and -1/2 are:',
    options: [
      'Parallel',
      'Perpendicular',
      'Same line',
      'Intersecting but not perpendicular'
    ],
    correctAnswer: 'Perpendicular',
    explanation: 'For perpendicular lines, m₁ × m₂ = -1. Here, 2 × (-1/2) = -1, so they are perpendicular',
    hints: [
      'Multiply the slopes',
      'Perpendicular lines have slopes whose product is -1',
      'Check if 2 × (-1/2) = -1'
    ]
  },
  {
    id: 4,
    type: 'mcq',
    question: 'The point P(3,k) lies on the line x + 2y = 7. Find k.',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: 'Substitute x=3 in x + 2y = 7: 3 + 2k = 7, so 2k = 4, therefore k = 2',
    hints: [
      'Substitute the x-coordinate in the equation',
      'Solve for k',
      'Check if the point satisfies the line equation'
    ]
  },
  {
    id: 5,
    type: 'numerical',
    question: 'Find the x-coordinate of the midpoint of line segment joining (2,5) and (8,9).',
    correctAnswer: 5,
    explanation: 'x-coordinate of midpoint = (x₁ + x₂)/2 = (2 + 8)/2 = 10/2 = 5',
    hints: [
      'Use the midpoint formula',
      'Average the x-coordinates',
      'Remember to divide by 2'
    ]
  }
]

export default coordinateGeometryQuestions
