export const decisionMakingQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'In a game show, you are shown 3 doors. Behind one door is a car, behind the others are goats. You pick door 1. The host, who knows what\'s behind each door, opens door 3 to reveal a goat. Should you switch your choice to door 2?',
    options: [
      'Yes, switching gives a 2/3 chance of winning',
      'No, staying gives a 2/3 chance of winning',
      'It doesn\'t matter, chances are equal',
      'Need more information to decide'
    ],
    correctAnswer: 'Yes, switching gives a 2/3 chance of winning',
    explanation: 'This is the famous Monty Hall problem. Initially, you have 1/3 chance of picking the car. The host shows a goat, leaving your door (1/3 chance) and the other closed door (2/3 chance).',
    hints: [
      'Think about your initial probability of choosing the car',
      'The host always shows a goat, how does this affect probabilities?',
      'The other door now represents two of the original possibilities'
    ]
  }
]
