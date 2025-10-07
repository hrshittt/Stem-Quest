export const questions = [
  {
    question: "In a 3x3 grid, if the first row is A, B, C and the second row is D, E, F, what should the third row start with?",
    type: "mcq",
    options: ["A", "G", "H", "I"],
    correctAnswer: "G",
    explanation: "Following alphabetical order, the third row should start with G, H, I."
  },
  {
    question: "If you have a grid where each cell must contain a different number from 1-4, and no row or column can have the same number twice, how many ways can you fill a 2x2 grid?",
    type: "mcq",
    options: ["2", "4", "8", "12"],
    correctAnswer: "2",
    explanation: "In a 2x2 grid with numbers 1-4, there are only 2 valid arrangements: [1,2;3,4] and [3,4;1,2]."
  },
  {
    question: "In a logic grid puzzle, if A is taller than B, and B is taller than C, which statement is true?",
    type: "mcq",
    options: ["A is the shortest", "C is the tallest", "A is taller than C", "B is the tallest"],
    correctAnswer: "A is taller than C",
    explanation: "If A > B and B > C, then by transitivity, A > C."
  },
  {
    question: "If you have a 4x4 grid and need to place 4 queens so that no two queens can attack each other, how many queens can you place in the first row?",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "1",
    explanation: "In the 4-Queens problem, you can only place 1 queen per row to avoid them attacking each other."
  },
  {
    question: "In a Sudoku-like puzzle, if a 3x3 box already contains 1, 2, 3, what numbers are still available for that box?",
    type: "mcq",
    options: ["4, 5, 6", "4, 5, 6, 7, 8, 9", "7, 8, 9", "Any number 1-9"],
    correctAnswer: "4, 5, 6, 7, 8, 9",
    explanation: "Since 1, 2, 3 are already used, the remaining numbers 4, 5, 6, 7, 8, 9 are still available."
  },
  {
    question: "If you have a grid where each cell must be colored either red or blue, and no two adjacent cells can have the same color, how many ways can you color a 2x2 grid?",
    type: "mcq",
    options: ["2", "4", "6", "8"],
    correctAnswer: "2",
    explanation: "There are only 2 valid colorings: red-blue-red-blue or blue-red-blue-red pattern."
  },
  {
    question: "In a logic puzzle, if you know that: Alice is not the tallest, Bob is taller than Charlie, and Alice is taller than Bob, who is the tallest?",
    type: "mcq",
    options: ["Alice", "Bob", "Charlie", "Cannot determine"],
    correctAnswer: "Cannot determine",
    explanation: "We know Alice > Bob > Charlie, but we don't know if there's someone taller than Alice."
  },
  {
    question: "If you have a 3x3 magic square where each row, column, and diagonal sums to 15, what is the sum of all numbers in the square?",
    type: "mcq",
    options: ["45", "60", "75", "90"],
    correctAnswer: "45",
    explanation: "Since each of the 3 rows sums to 15, the total sum is 3 × 15 = 45."
  }
];
