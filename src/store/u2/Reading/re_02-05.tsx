// src/store/u2/Reading/re_02-05.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  category: string;
  feedback: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    text: "What is Sarah doing right now?",
    options: ["She is shopping at the mall.", "She is cooking breakfast.", "She is working at a restaurant.", "She is watching a movie."],
    correctAnswer: "She is shopping at the mall.",
    category: "Current Actions",
    feedback: "The passage says Sarah is looking for new clothes at the shopping mall right now."
  },
  {
    id: 2,
    text: "Why is Tom complaining?",
    options: ["The bus is late.", "The weather is bad.", "The food is cold.", "The price is very expensive."],
    correctAnswer: "The bus is late.",
    category: "Complaints",
    feedback: "Tom is complaining because the bus is not arriving on time."
  },
  {
    id: 3,
    text: "What are Mike and Lisa doing at this moment?",
    options: ["They are eating dinner.", "They are waiting for the doctor.", "They are playing in the park.", "They are reading a book."],
    correctAnswer: "They are waiting for the doctor.",
    category: "Current Actions",
    feedback: "The text says Mike and Lisa are sitting in the doctor's office, waiting for their appointment right now."
  },
  {
    id: 4,
    text: "Is Anna happy with the service at the restaurant?",
    options: ["Yes, she is happy.", "No, she is complaining about it.", "She is not sure.", "The text doesn't say."],
    correctAnswer: "No, she is complaining about it.",
    category: "Complaints",
    feedback: "Anna is complaining because the waiter is being slow and the food is not hot anymore."
  },
  {
    id: 5,
    text: "What is happening in the neighborhood right now?",
    options: ["Children are playing in the park.", "Everyone is sleeping.", "The market is closing.", "A storm is coming."],
    correctAnswer: "Children are playing in the park.",
    category: "Current Actions",
    feedback: "According to the passage, many children are actively playing games and having fun in the nearby park at this moment."
  },
];

const passageText = `
Right now, many things are happening in our neighborhood. Sarah is shopping at the mall, looking for new clothes for the summer.

At the same time, Tom is waiting for the bus and complaining about it because it is very late. He is standing in the cold and getting frustrated.

Mike and Lisa are sitting in the doctor's office, waiting for their appointment. They are worried and reading old magazines.

At the restaurant down the street, Anna is having lunch with her friend. However, she is complaining about the service because the waiter is being slow, and the food is not hot anymore.

In the park nearby, children are playing games and having a great time. They are laughing and running around.

This is a normal afternoon in our busy neighborhood!
`;

const PresentProgressiveReadingQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!showResults ? (
          <div>
            <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
              Present Progressive Reading Comprehension
            </h1>
            <p className="text-lg text-gray-600 text-center mb-6">
              Read about what's happening RIGHT NOW and answer questions
            </p>

            {/* Passage Section */}
            <motion.div
              className="mb-8 bg-white rounded-xl shadow-lg p-8 border-l-4 border-teal-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-teal-700 mb-4">📖 Read This Passage:</h2>
              <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                {passageText.trim()}
              </p>
            </motion.div>

            {/* Questions Section */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Question {currentQuestion + 1} of {quizData.length}
                  </span>
                  <span className="text-sm font-semibold text-teal-600">
                    Score: {score}
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                    className="bg-teal-600 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {quizData[currentQuestion].text}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {quizData[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                    whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                    onClick={() => !isAnswered && handleAnswer(option)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all font-semibold text-lg ${
                      selectedAnswer === option
                        ? option === quizData[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : option === quizData[currentQuestion].correctAnswer && isAnswered
                        ? 'bg-green-100 border-green-500'
                        : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-6 border-l-4 ${
                      selectedAnswer === quizData[currentQuestion].correctAnswer
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <p className={`font-semibold ${selectedAnswer === quizData[currentQuestion].correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                      {selectedAnswer === quizData[currentQuestion].correctAnswer ? '✓ Correct!' : '✗ Not quite right.'}
                    </p>
                    <p className="text-gray-700 mt-2">{quizData[currentQuestion].feedback}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {isAnswered && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  {currentQuestion === quizData.length - 1 ? 'See Results' : 'Next Question'}
                </motion.button>
              )}
            </motion.div>

            {/* Hint */}
            <div className="mt-6 p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
              <p className="text-sm text-gray-700">
                <strong>💡 Tip:</strong> Look for phrases like "is doing", "are doing", "is complaining" to find what's happening RIGHT NOW!
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-4xl font-bold text-teal-700 mb-4">Reading Complete! 🎉</h2>
            <p className="text-6xl font-bold text-teal-600 mb-4">
              {score}/{quizData.length}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {score === quizData.length
                ? 'Perfect! You understand Present Progressive well! 🌟'
                : score >= quizData.length * 0.8
                ? 'Great comprehension! Keep reading and practicing! 👍'
                : 'Good try! Read again and focus on Present Progressive actions! 💪'}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Restart Reading
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PresentProgressiveReadingQuiz;
