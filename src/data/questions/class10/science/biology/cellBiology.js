export const cellBiologyQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Golgi Body', 'Endoplasmic Reticulum'],
    correctAnswer: 'Mitochondria',
    explanation: 'Mitochondria are called the powerhouse of the cell because they produce energy through cellular respiration.',
    hints: [
      'This organelle produces ATP',
      'It\'s involved in cellular respiration',
      'Its name starts with M'
    ]
  },
  {
    id: 2,
    type: 'mcq',
    question: 'What is the main function of the cell membrane?',
    options: [
      'Energy production',
      'Protein synthesis',
      'Selective permeability',
      'DNA storage'
    ],
    correctAnswer: 'Selective permeability',
    explanation: 'The cell membrane controls what enters and exits the cell through selective permeability.',
    hints: [
      'Think about what controls entry and exit from the cell',
      'It acts like a guard at the cell boundary',
      'Some substances can pass through while others cannot'
    ]
  }
]

export default cellBiologyQuestions
