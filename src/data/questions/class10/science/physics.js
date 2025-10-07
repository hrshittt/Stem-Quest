export const physicsQuestions = {
  "Forces and Motion": [
    {
      question: "What is Newton's First Law of Motion?",
      type: "mcq",
      options: [
        "An object in motion stays in motion, unless acted upon by an external force",
        "Force equals mass times acceleration",
        "Every action has an equal and opposite reaction",
        "Objects fall at the same rate regardless of mass"
      ],
      correctAnswer: "An object in motion stays in motion, unless acted upon by an external force",
      gameElement: {
        type: "moving-block",
        behavior: "constant-motion"
      }
    },
    {
      question: "Calculate the force needed to accelerate a 2kg mass at 3 m/s²",
      type: "numeric",
      correctAnswer: 6,
      unit: "N",
      gameElement: {
        type: "weighted-block",
        mass: 2,
        acceleration: 3
      }
    },
    {
      question: "What is the gravitational acceleration on Earth?",
      type: "numeric",
      correctAnswer: 9.8,
      unit: "m/s²",
      gameElement: {
        type: "falling-object",
        behavior: "gravity"
      }
    }
  ],
  "Energy and Work": [
    {
      question: "What is the formula for kinetic energy?",
      type: "mcq",
      options: [
        "½mv²",
        "mgh",
        "F=ma",
        "E=mc²"
      ],
      correctAnswer: "½mv²",
      gameElement: {
        type: "moving-ball",
        behavior: "kinetic"
      }
    },
    {
      question: "Calculate the potential energy of a 5kg mass at 2m height (g=9.8m/s²)",
      type: "numeric",
      correctAnswer: 98,
      unit: "J",
      gameElement: {
        type: "elevated-block",
        mass: 5,
        height: 2
      }
    }
  ]
};
