export const probabilityQuestions = [
  {
    id: 1,
    type: 'numerical',
    question: 'A box contains 3 red marbles, 4 blue marbles, and 5 green marbles. What is the probability of drawing a blue marble? (Answer as a decimal rounded to 2 places)',
    correctAnswer: 0.33,
    explanation: 'Total marbles = 3 + 4 + 5 = 12. Probability = 4/12 = 1/3 ≈ 0.33',
    hints: [
      'Count total number of marbles',
      'Count favorable outcomes (blue marbles)',
      'Divide favorable by total'
    ]
  },
  {
    id: 2,
    type: 'mcq',
    question: 'Two dice are rolled. What is the probability of getting a sum of 7?',
    options: ['1/6', '1/8', '1/12', '1/36'],
    correctAnswer: '1/6',
    explanation: 'Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Total outcomes = 36. So probability = 6/36 = 1/6',
    hints: [
      'List all ways to get sum of 7',
      'Count total possible outcomes when rolling 2 dice',
      'Divide number of favorable by total outcomes'
    ]
  },
  {
    id: 3,
    type: 'mcq',
    question: 'A card is drawn from a standard deck. What is the probability of drawing a face card or an ace?',
    options: ['4/13', '1/2', '7/13', '16/52'],
    correctAnswer: '16/52',
    explanation: 'Face cards (J,Q,K) = 12 cards, Aces = 4 cards. Total = 16. Deck has 52 cards. Probability = 16/52',
    hints: [
      'Count number of face cards (J,Q,K)',
      'Add number of aces',
      'Divide by total number of cards'
    ]
  },
  {
    id: 4,
    type: 'numerical',
    question: 'If P(A) = 0.3 and P(B) = 0.4, and events A and B are independent, what is P(A and B)? (Answer as decimal)',
    correctAnswer: 0.12,
    explanation: 'For independent events, P(A and B) = P(A) × P(B) = 0.3 × 0.4 = 0.12',
    hints: [
      'Use multiplication rule for independent events',
      'P(A and B) = P(A) × P(B)',
      'Multiply the given probabilities'
    ]
  },
  {
    id: 5,
    type: 'mcq',
    question: 'A bag contains 5 red balls and 3 blue balls. Two balls are drawn without replacement. What is the probability that both are red?',
    options: ['5/28', '25/56', '10/28', '15/56'],
    correctAnswer: '10/28',
    explanation: 'First draw: 5/8, Second draw: 4/7. P(both red) = (5/8)(4/7) = 20/56 = 10/28',
    hints: [
      'For first ball, probability is 5/8',
      'For second, only 4 red remain out of 7 total',
      'Multiply probabilities'
    ]
  }
]

export default probabilityQuestions
