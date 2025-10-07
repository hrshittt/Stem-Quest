export const businessCaseQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'A small business has to choose between two delivery services. Service A charges ₹20 per km for any distance. Service B charges ₹30 per km for the first 10 km and ₹15 per km after that. For what minimum distance would Service B be more economical?',
    options: ['15 km', '20 km', '25 km', '30 km'],
    correctAnswer: '30 km',
    explanation: 'For Service A: Cost = 20x (x is distance). For Service B: Cost = 300 + 15(x-10). They become equal at 20x = 300 + 15(x-10), solving gives x = 30',
    hints: [
      'Write equations for both services',
      'Find the point where they cost the same',
      'Service B will be cheaper after this point'
    ]
  }
]
