export const chemicalReactionsQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'What type of reaction occurs when iron rusts?',
    options: ['Decomposition', 'Oxidation', 'Reduction', 'Substitution'],
    correctAnswer: 'Oxidation',
    explanation: 'Rusting is an oxidation reaction where iron combines with oxygen to form iron oxide (rust).',
    hints: [
      'Think about what element from air combines with iron',
      'The reaction involves gaining oxygen',
      'It\'s the opposite of reduction'
    ]
  },
  {
    id: 2,
    type: 'numerical',
    question: 'If 48g of magnesium reacts completely with oxygen, how many grams of magnesium oxide will be formed? (Mg=24, O=16)',
    correctAnswer: 80,
    explanation: '2Mg + O2 → 2MgO, 48g Mg + 32g O2 → 80g MgO',
    hints: [
      'Write the balanced equation',
      'Calculate the molecular mass of MgO',
      'Use the ratio from the balanced equation'
    ]
  }
]

export default chemicalReactionsQuestions
