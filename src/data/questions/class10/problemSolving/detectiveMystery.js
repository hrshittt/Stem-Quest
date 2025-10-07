export const problemSolvingQuestions = {
  "Detective Mystery": [
    {
      question: "In a room of 30 students, if 18 like science and 15 like math, and 10 like both, how many students don't like either subject?",
      type: "numeric",
      correctAnswer: 7,
      clues: [
        "Use Venn diagram",
        "Total students who like at least one subject = Science + Math - Both",
        "Students who like neither = Total - Students who like at least one"
      ],
      scene: {
        type: "classroom",
        objects: ["students", "books", "venn-diagram"]
      }
    },
    {
      question: "If a train travels 300 km in 4 hours going north, and then 150 km in 2 hours going east, what is the straight-line distance from the starting point?",
      type: "numeric",
      correctAnswer: 335,
      clues: [
        "Use Pythagorean theorem",
        "Draw the path as a right triangle",
        "Calculate a² + b² = c²"
      ],
      scene: {
        type: "map",
        objects: ["train", "compass", "ruler"]
      }
    },
    {
      question: "At a party, everyone shook hands with everyone else exactly once. If there were 45 handshakes in total, how many people were at the party?",
      type: "numeric",
      correctAnswer: 10,
      clues: [
        "Use the handshake formula: n(n-1)/2",
        "45 = n(n-1)/2",
        "Solve the quadratic equation"
      ],
      scene: {
        type: "party",
        objects: ["people", "calculator", "notebook"]
      }
    }
  ],
  "Logic Puzzles": [
    {
      question: "If all cats have tails, and Whiskers is a cat, what can you conclude?",
      type: "mcq",
      options: [
        "Whiskers has a tail",
        "All animals have tails",
        "Only cats have tails",
        "Whiskers might have a tail"
      ],
      correctAnswer: "Whiskers has a tail",
      scene: {
        type: "deduction",
        objects: ["cat", "logic-tree", "notepad"]
      }
    },
    {
      question: "In a bag of marbles, there are red, blue, and green ones. If 1/3 are red, and 1/4 are blue, what fraction are green?",
      type: "mcq",
      options: [
        "5/12",
        "1/2",
        "7/12",
        "1/12"
      ],
      correctAnswer: "5/12",
      scene: {
        type: "calculation",
        objects: ["marbles", "fraction-chart", "calculator"]
      }
    }
  ],
  "Pattern Recognition": [
    {
      question: "What comes next in the sequence: 2, 6, 12, 20, __?",
      type: "numeric",
      correctAnswer: 30,
      clues: [
        "Look at the differences between numbers",
        "Find how the difference changes",
        "Apply the pattern"
      ],
      scene: {
        type: "sequence",
        objects: ["number-line", "pattern-blocks", "graph"]
      }
    },
    {
      question: "If a shape pattern goes: Triangle, Square, Pentagon, what comes next?",
      type: "mcq",
      options: [
        "Hexagon",
        "Circle",
        "Triangle",
        "Rectangle"
      ],
      correctAnswer: "Hexagon",
      scene: {
        type: "shapes",
        objects: ["geometric-shapes", "ruler", "protractor"]
      }
    }
  ]
};
