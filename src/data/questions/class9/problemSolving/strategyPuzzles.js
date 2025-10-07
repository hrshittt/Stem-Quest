export const questions = [
  {
    question: "In a game of tic-tac-toe, if you go first and place X in the center, what is the best strategy for your opponent?",
    type: "mcq",
    options: ["Place O in a corner", "Place O on an edge", "Place O in the center", "Any move is equally good"],
    correctAnswer: "Place O in a corner",
    explanation: "Placing O in a corner gives the best chance to block potential winning combinations and create threats."
  },
  {
    question: "If you have 21 matchsticks and two players take turns removing 1, 2, or 3 matchsticks, what is the winning strategy for the first player?",
    type: "mcq",
    options: ["Always take 1", "Always take 2", "Always take 3", "Take 1 to leave 20"],
    correctAnswer: "Take 1 to leave 20",
    explanation: "Take 1 to leave 20. Then whatever your opponent takes (1,2,3), you take (3,2,1) to leave multiples of 4."
  },
  {
    question: "In a chess endgame with King and Queen vs King, what is the key principle for checkmating?",
    type: "mcq",
    options: ["Keep the Queen close to the King", "Force the enemy King to the edge", "Use the Queen to block", "Move the King forward"],
    correctAnswer: "Force the enemy King to the edge",
    explanation: "The key is to use the Queen and King together to force the enemy King to the edge of the board, where checkmate becomes possible."
  },
  {
    question: "If you're playing a number game where you can choose numbers 1-10 and the goal is to reach exactly 50, what's the best opening move?",
    type: "mcq",
    options: ["Choose 1", "Choose 5", "Choose 10", "Any number works"],
    correctAnswer: "Choose 5",
    explanation: "Choosing 5 gives you the most flexibility and control over the game, as it's in the middle of the range."
  },
  {
    question: "In a game where you can move 1, 2, or 3 spaces forward, and the last player to move wins, what's the winning position when 7 spaces remain?",
    type: "mcq",
    options: ["Move 1 space", "Move 2 spaces", "Move 3 spaces", "Any move works"],
    correctAnswer: "Move 1 space",
    explanation: "Move 1 space to leave 6. Then you can always respond to leave multiples of 4, forcing your opponent into losing positions."
  },
  {
    question: "If you're playing a card game where you can take 1-3 cards from a pile of 15, and the last player to take cards wins, what's your opening strategy?",
    type: "mcq",
    options: ["Take 1 card", "Take 2 cards", "Take 3 cards", "It doesn't matter"],
    correctAnswer: "Take 2 cards",
    explanation: "Take 2 cards to leave 13. Then you can always respond to leave multiples of 4 (9, 5, 1), forcing your opponent into losing positions."
  },
  {
    question: "In a game of Connect Four, if you're playing second, what's the most important defensive move?",
    type: "mcq",
    options: ["Block the center", "Block any three-in-a-row", "Create your own threat", "Block the opponent's center"],
    correctAnswer: "Block any three-in-a-row",
    explanation: "Always block your opponent's three-in-a-row immediately, as this prevents them from winning on their next turn."
  },
  {
    question: "If you're playing a game where you can remove 1-4 objects from a pile of 20, and the last player to remove objects loses, what's the winning strategy?",
    type: "mcq",
    options: ["Always remove 1", "Always remove 4", "Remove 3 to leave 17", "Remove 2 to leave 18"],
    correctAnswer: "Remove 3 to leave 17",
    explanation: "Remove 3 to leave 17. Then you can always respond to leave multiples of 5 (12, 7, 2), forcing your opponent into losing positions."
  }
];
