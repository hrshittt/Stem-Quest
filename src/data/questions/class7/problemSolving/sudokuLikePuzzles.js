export const questions = [
  {
    question: "In a 3x3 grid, if the first row has numbers 1, 2, 3, what should the second row start with?",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
    explanation: "In Sudoku-like puzzles, each row must have unique numbers. If row 1 has 1,2,3, row 2 should start with 4."
  },
  {
    question: "If a 4x4 grid has 1,2,3,4 in the first row, what number should be in position (2,1)?",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "1",
    explanation: "In a 4x4 grid, each row must contain 1,2,3,4. Position (2,1) is the first position of the second row, so it should be 1."
  },
  {
    question: "In a number puzzle, if you have numbers 1,2,3,4 and need to arrange them so no two consecutive numbers are next to each other, which arrangement works?",
    type: "mcq",
    options: ["1,2,3,4", "1,3,2,4", "2,1,4,3", "3,1,4,2"],
    correctAnswer: "1,3,2,4",
    explanation: "In 1,3,2,4, no two consecutive numbers (like 1,2 or 2,3) are next to each other."
  },
  {
    question: "If you have a 3x3 magic square and the sum of each row, column, and diagonal must be 15, what number goes in the center?",
    type: "mcq",
    options: ["3", "5", "7", "9"],
    correctAnswer: "5",
    explanation: "In a 3x3 magic square with sum 15, the center number is always 5."
  },
  {
    question: "In a number sequence puzzle, if the pattern is: 2, 4, 8, 16, what comes next?",
    type: "mcq",
    options: ["20", "24", "32", "64"],
    correctAnswer: "32",
    explanation: "The pattern doubles each time: 2×2=4, 4×2=8, 8×2=16, 16×2=32."
  },
  {
    question: "If you have to place numbers 1-6 in a 2x3 grid so each row and column has different numbers, which number can go in position (1,1)?",
    type: "mcq",
    options: ["Any number 1-6", "Only 1", "Only 6", "1, 2, or 3"],
    correctAnswer: "Any number 1-6",
    explanation: "Any number 1-6 can go in position (1,1) as long as the other positions are filled correctly to avoid duplicates in rows and columns."
  },
  {
    question: "In a number puzzle, if you have to use each digit 1-4 exactly once in a 2x2 grid, how many different arrangements are possible?",
    type: "mcq",
    options: ["4", "8", "12", "24"],
    correctAnswer: "24",
    explanation: "This is 4! (4 factorial) = 4×3×2×1 = 24 different arrangements."
  },
  {
    question: "If a puzzle requires you to fill a 3x3 grid with numbers 1-9 so that each number appears exactly once, what is this type of puzzle called?",
    type: "mcq",
    options: ["Crossword", "Sudoku", "Word search", "Maze"],
    correctAnswer: "Sudoku",
    explanation: "A 3x3 grid filled with numbers 1-9 where each number appears exactly once is called a Sudoku puzzle."
  }
];
