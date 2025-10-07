export const towerQuestions = {
  "Pattern Problems": [
    {
      question: "What is the next number in the sequence: 2, 6, 18, 54, __?",
      type: "numeric",
      correctAnswer: 162,
      hints: [
        "Look at how each number changes",
        "Each number is multiplied by something",
        "Multiply each number by 3"
      ],
      level: 1
    },
    {
      question: "In a sequence, each number is triple the previous number minus 2. If the sequence starts with 4, what is the third number?",
      type: "numeric",
      correctAnswer: 34,
      hints: [
        "Find the second number first",
        "4 → (4 × 3) - 2 = 10",
        "10 → (10 × 3) - 2 = 28",
        "28 → (28 × 3) - 2 = 82"
      ],
      level: 2
    }
  ],
  "Spatial Reasoning": [
    {
      question: "A cube has a volume of 27 cubic centimeters. What is the length of each edge?",
      type: "numeric",
      correctAnswer: 3,
      hints: [
        "Volume of cube = edge³",
        "27 = edge³",
        "Find the cube root of 27"
      ],
      level: 3
    },
    {
      question: "If you unfold a cube, how many squares do you see?",
      type: "numeric",
      correctAnswer: 6,
      hints: [
        "Think about all sides of a cube",
        "Count front, back, left, right, top, bottom",
        "Each face is a square"
      ],
      level: 4
    }
  ],
  "Complex Problems": [
    {
      question: "A rope is used to wrap around a cylindrical pole. If the pole has a diameter of 10cm and the rope goes around exactly 3 times, how long is the rope? (Use π = 3.14)",
      type: "numeric",
      correctAnswer: 94.2,
      hints: [
        "Circumference = π × diameter",
        "One wrap = 10 × 3.14 = 31.4",
        "Multiply by number of wraps"
      ],
      level: 5
    },
    {
      question: "In a game, players score points that double each round, starting with 5 points. How many points will a player have after 4 rounds?",
      type: "numeric",
      correctAnswer: 75,
      hints: [
        "Round 1: 5 points",
        "Round 2: 10 points",
        "Round 3: 20 points",
        "Round 4: 40 points",
        "Sum all points"
      ],
      level: 6
    }
  ]
};
