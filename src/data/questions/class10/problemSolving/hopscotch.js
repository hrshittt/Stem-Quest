export const hopscotchQuestions = {
  "Numeric Riddles": [
    {
      question: "I am a number. When you multiply me by 2 and add 10, you get 20. What number am I?",
      type: "numeric",
      correctAnswer: 5,
      hints: ["Start with 20 and work backwards", "Subtract 10 first", "Then divide by 2"],
      boardPosition: 1
    },
    {
      question: "The sum of three consecutive numbers is 42. What is the middle number?",
      type: "numeric",
      correctAnswer: 14,
      hints: ["If n is the middle number, the sum is (n-1) + n + (n+1)", "Simplify to 3n", "Solve 3n = 42"],
      boardPosition: 2
    },
    {
      question: "A quarter of a number is 16. What is the number?",
      type: "numeric",
      correctAnswer: 64,
      hints: ["If 1/4 of x = 16", "Multiply both sides by 4", "x = 16 × 4"],
      boardPosition: 3
    }
  ],
  "Word Problems": [
    {
      question: "If 3 pencils cost $0.75, how much do 12 pencils cost?",
      type: "numeric",
      correctAnswer: 3,
      unit: "dollars",
      hints: ["Find the cost of 1 pencil first", "Then multiply by 12", "Remember to convert to dollars"],
      boardPosition: 4
    },
    {
      question: "A rope is cut into 3 pieces. The second piece is twice as long as the first, and the third is three times as long as the first. If the total length is 30 meters, how long is the first piece?",
      type: "numeric",
      correctAnswer: 5,
      unit: "meters",
      hints: ["Let x be the length of first piece", "Second piece is 2x", "Third piece is 3x", "Total is x + 2x + 3x = 30"],
      boardPosition: 5
    }
  ],
  "Logical Deductions": [
    {
      question: "If all birds can fly, and a penguin is a bird, can a penguin fly?",
      type: "mcq",
      options: [
        "Yes, because all birds can fly",
        "No, because the first statement is false",
        "Yes, but only in water",
        "No, but it's still a bird"
      ],
      correctAnswer: "No, because the first statement is false",
      hints: ["Think about the validity of the first premise", "Are there other birds that can't fly?", "Is the logic sound?"],
      boardPosition: 6
    },
    {
      question: "If red bricks are heavier than blue bricks, and blue bricks are heavier than green bricks, which color brick is the lightest?",
      type: "mcq",
      options: ["Red", "Blue", "Green", "Not enough information"],
      correctAnswer: "Green",
      hints: ["Use transitive property", "Make a weight comparison chain", "Find the bottom of the chain"],
      boardPosition: 7
    }
  ]
};
