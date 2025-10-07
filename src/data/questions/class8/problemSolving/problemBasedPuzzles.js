export const questions = [
  {
    question: "If you have 12 coins and one is fake (lighter), what is the minimum number of weighings needed to find the fake coin using a balance scale?",
    type: "mcq",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation: "You can find the fake coin in 3 weighings by dividing the coins into groups of 4, then 4, then 4, and comparing them."
  },
  {
    question: "A farmer has 17 sheep. All but 9 die. How many sheep are left?",
    type: "mcq",
    options: ["8", "9", "17", "26"],
    correctAnswer: "9",
    explanation: "If all but 9 die, then 9 sheep are left alive."
  },
  {
    question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    type: "mcq",
    options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
    correctAnswer: "5 minutes",
    explanation: "Each machine takes 5 minutes to make 1 widget, so 100 machines would take 5 minutes to make 100 widgets."
  },
  {
    question: "You have two ropes that each take exactly 60 minutes to burn from one end to the other. The ropes don't burn at a consistent rate. How can you measure exactly 45 minutes?",
    type: "mcq",
    options: ["Burn one rope from both ends", "Burn both ropes from one end", "Cut one rope in half", "Use a timer"],
    correctAnswer: "Burn one rope from both ends",
    explanation: "Light the first rope at both ends and the second rope at one end. When the first rope burns out (30 minutes), light the other end of the second rope. It will burn out in 15 more minutes, giving you 45 minutes total."
  },
  {
    question: "If you have 3 boxes - one contains only apples, one contains only oranges, and one contains both - but all labels are wrong, how many fruits do you need to pick to correctly label all boxes?",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "1",
    explanation: "Pick from the box labeled 'both'. Since all labels are wrong, this box contains only one type. If you get an apple, label it 'apples only' and deduce the others."
  },
  {
    question: "A train leaves Station A at 60 mph and another leaves Station B at 40 mph towards each other. If they are 200 miles apart, how long until they meet?",
    type: "mcq",
    options: ["1 hour", "2 hours", "3 hours", "4 hours"],
    correctAnswer: "2 hours",
    explanation: "Combined speed is 60 + 40 = 100 mph. Time = Distance/Speed = 200/100 = 2 hours."
  },
  {
    question: "If you have 8 balls that look identical, but one is slightly heavier, what is the minimum number of weighings needed to find the heavy ball using a balance scale?",
    type: "mcq",
    options: ["2", "3", "4", "5"],
    correctAnswer: "2",
    explanation: "First weighing: compare 3 vs 3. If equal, the heavy ball is in the remaining 2. Second weighing: compare those 2. If not equal, the heavy ball is in the heavier group of 3."
  },
  {
    question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    type: "mcq",
    options: ["0°", "7.5°", "15°", "30°"],
    correctAnswer: "7.5°",
    explanation: "At 3:15, the minute hand is at 3 (90°) and the hour hand is at 3 + 15/60 × 30° = 97.5°. The difference is 7.5°."
  }
];
