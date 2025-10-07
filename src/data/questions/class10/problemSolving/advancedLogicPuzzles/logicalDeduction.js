export const logicalDeductionQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'Five friends - A, B, C, D, and E - are sitting in a row. A sits next to B, C sits next to D, D is not in the last seat, and E is not in the first seat. C is in the middle seat. Which of the following is a possible seating arrangement from left to right?',
    options: ['A B C D E', 'E A C D B', 'B A C D E', 'D E C A B'],
    correctAnswer: 'B A C D E',
    explanation: 'Working from the given conditions: C is in the middle (3rd position), D must be 4th since they\'re next to C and not last, A and B must be together, and E can\'t be first.',
    hints: [
      'Start by placing C in the middle position',
      'D must be next to C and not last',
      'Remember A and B must be adjacent'
    ]
  }
]
