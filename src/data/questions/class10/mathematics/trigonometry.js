export const trigonometryQuestions = [
  {
    id: 1,
    type: 'numerical',
    question: 'If sin θ = 0.6, what is cos θ? (Round to 2 decimal places)',
    correctAnswer: 0.80,
    explanation: 'Using sin²θ + cos²θ = 1: cos²θ = 1 - sin²θ = 1 - 0.6² = 1 - 0.36 = 0.64, so cosθ = 0.80',
    hints: [
      'Use the Pythagorean identity sin²θ + cos²θ = 1',
      'Substitute the known value and solve',
      'Take the positive square root as θ is in first quadrant'
    ]
  },
  {
    id: 2,
    type: 'mcq',
    question: 'In triangle ABC, if sin A = 3/5, then what is cos A?',
    options: ['3/5', '4/5', '5/3', '4/3'],
    correctAnswer: '4/5',
    explanation: 'Using sin²A + cos²A = 1: cos²A = 1 - (3/5)² = 1 - 9/25 = 16/25, so cosA = 4/5',
    hints: [
      'Draw a right triangle with hypotenuse 5 and opposite side 3',
      'Find the adjacent side using Pythagorean theorem',
      'cos A = adjacent/hypotenuse'
    ]
  },
  {
    id: 3,
    type: 'mcq',
    question: 'The value of sin 60° is:',
    options: ['1/2', '√2/2', '√3/2', '1'],
    correctAnswer: '√3/2',
    explanation: 'sin 60° = √3/2 is a standard angle value that should be memorized',
    hints: [
      'Think of a 30-60-90 triangle',
      'Remember standard angle values',
      'Side ratios in 30-60-90 triangle are 1 : √3 : 2'
    ]
  },
  {
    id: 4,
    type: 'numerical',
    question: 'If tan θ = 1, what is the value of sin θ? (Round to 2 decimal places)',
    correctAnswer: 0.71,
    explanation: 'If tan θ = 1, then θ = 45°. At 45°, sin θ = 1/√2 ≈ 0.71',
    hints: [
      'If tan θ = 1, what angle is it?',
      'In a 45-45-90 triangle, both legs are equal',
      'Use sin θ = opposite/hypotenuse'
    ]
  },
  {
    id: 5,
    type: 'mcq',
    question: 'If sin A = cos B, then A + B equals:',
    options: ['45°', '90°', '180°', '60°'],
    correctAnswer: '90°',
    explanation: 'If sin A = cos B, then B = 90° - A (complementary angles), so A + B = 90°',
    hints: [
      'Remember cos θ = sin(90° - θ)',
      'These angles are complementary',
      'Their sum should make them complementary'
    ]
  }
]

export default trigonometryQuestions
