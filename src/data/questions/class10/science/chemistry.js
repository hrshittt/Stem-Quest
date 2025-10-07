export const chemistryQuestions = {
  "Chemical Reactions": [
    {
      question: "When zinc reacts with hydrochloric acid, what gas is produced?",
      type: "mcq",
      options: ["Hydrogen", "Oxygen", "Carbon Dioxide", "Chlorine"],
      correctAnswer: "Hydrogen",
      visualSetup: {
        reactants: ["zinc-metal", "hydrochloric-acid"],
        products: ["zinc-chloride", "hydrogen-gas"],
        animation: "bubbling"
      }
    },
    {
      question: "Balance this equation: Zn + HCl → ZnCl₂ + H₂",
      type: "mcq",
      options: [
        "Zn + 2HCl → ZnCl₂ + H₂",
        "2Zn + 2HCl → 2ZnCl₂ + H₂",
        "Zn + HCl → ZnCl₂ + 2H₂",
        "2Zn + HCl → ZnCl₂ + H₂"
      ],
      correctAnswer: "Zn + 2HCl → ZnCl₂ + H₂",
      visualSetup: {
        reactants: ["zinc-metal", "hydrochloric-acid"],
        products: ["zinc-chloride", "hydrogen-gas"],
        animation: "equation-balancing"
      }
    },
    {
      question: "What color change indicates the presence of CO₂ in lime water?",
      type: "mcq",
      options: ["Clear to milky", "Milky to clear", "Blue to red", "Red to blue"],
      correctAnswer: "Clear to milky",
      visualSetup: {
        reactants: ["carbon-dioxide", "lime-water"],
        products: ["calcium-carbonate"],
        animation: "color-change"
      }
    }
  ],
  "Acids and Bases": [
    {
      question: "What color does phenolphthalein turn in a basic solution?",
      type: "mcq",
      options: ["Pink", "Colorless", "Blue", "Yellow"],
      correctAnswer: "Pink",
      visualSetup: {
        reactants: ["base-solution", "phenolphthalein"],
        products: ["pink-solution"],
        animation: "color-change"
      }
    },
    {
      question: "What happens when an acid reacts with a metal carbonate?",
      type: "mcq",
      options: [
        "Produces CO₂ gas",
        "Produces H₂ gas",
        "Produces O₂ gas",
        "No reaction"
      ],
      correctAnswer: "Produces CO₂ gas",
      visualSetup: {
        reactants: ["acid", "metal-carbonate"],
        products: ["salt", "water", "carbon-dioxide"],
        animation: "bubbling"
      }
    }
  ]
};
