export const analyticalQuestions = [
  {
    id: 1,
    type: 'numerical',
    question: 'A cube of side 8cm is painted red on all faces. It is then cut into smaller cubes of side 2cm each. How many small cubes have exactly two faces painted red?',
    correctAnswer: 24,
    explanation: 'Each edge of the large cube produces 4 small cubes. Each edge has 12 small cubes with exactly two faces painted. Total = 24.',
    hints: [
      'First find how many small cubes fit along one edge',
      'Think about which small cubes will have exactly two painted faces',
      'These cubes will be along the edges, but not at corners'
    ]
  }
]
