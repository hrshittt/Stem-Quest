# STEM Quest - Gamified Learning Platform

## Current Implementation Status

### ✅ Completed Features

1. **Mathematics Maze Games for Grades 6, 7, 8**
   - Interactive maze navigation with keyboard controls (WASD/Arrow keys)
   - Checkpoint system with yellow boxes that trigger questions
   - Question types: MCQ, Numeric, and Algebraic
   - Progress tracking and completion statistics
   - Retry mechanism for incorrect answers

2. **Question Database**
   - Grade 6: Complete questions for all 5 topics (50 questions each)
   - Grade 7: Basic questions for 2 topics
   - Grade 8: Basic questions for 2 topics
   - Question types: Multiple Choice, Numeric answers, Algebraic expressions

3. **User Interface**
   - Modern, responsive design with gradient backgrounds
   - Floating particles animation
   - Topic selection with status indicators
   - Progress tracking and statistics
   - Navigation between different sections

### 🎮 How to Play

1. **Navigation**: Select Grade → Subject (Mathematics) → Topic
2. **Maze Game**: 
   - Use WASD or Arrow keys to move the blue player
   - Navigate to yellow checkpoints (yellow boxes)
   - Answer questions at each checkpoint
   - Reach the red end point to complete the game

3. **Question System**:
   - MCQ: Select the correct option
   - Numeric: Enter the exact number
   - Algebraic: Enter the solution (e.g., "x = 5")
   - Submit answer → Get feedback → Retry or Continue

### 📚 Available Topics

**Grade 6:**
- Whole Numbers, Integers, Factors, Multiples (50 questions)
- Fractions & Decimals (50 questions)
- Ratios & Proportions (5 questions)
- Basic Geometry (Perimeter, Area, Shapes) (5 questions)
- Data Handling (Pictographs, Bar Graphs) (5 questions)

**Grade 7:**
- Integers & Rational Numbers (5 questions)
- Algebra (basic expressions) (5 questions)

**Grade 8:**
- Exponents & Powers (5 questions)
- Algebra (linear equations basics) (5 questions)

### 🔧 Technical Details

- **Frontend**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: React useState
- **Routing**: Custom page state management
- **Game Logic**: Canvas-based maze generation with collision detection

### 🚀 Running the Application

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to start the application.

### 📝 Next Steps

1. **Complete Question Database**: Add remaining 50 questions for each topic in grades 7 and 8
2. **Enhanced Game Features**: 
   - Sound effects and music
   - Power-ups and special abilities
   - Multiple maze layouts
   - Difficulty levels
3. **Progress Persistence**: Save user progress and achievements
4. **Analytics**: Track learning progress and performance
5. **Multiplayer**: Competitive and collaborative modes

### 🎯 Learning Objectives

The platform aims to:
- Make mathematics learning engaging and interactive
- Provide immediate feedback on problem-solving
- Build confidence through gamified progression
- Reinforce concepts through repeated practice
- Track learning progress and identify areas for improvement
