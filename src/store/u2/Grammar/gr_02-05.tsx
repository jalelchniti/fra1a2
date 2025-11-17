// src/store/u2/Grammar/gr_02-05.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

const PresentProgressiveGrammar: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const questions = [
    {
      question: 'Which sentence correctly uses Present Progressive?',
      options: ['She am eating lunch.', 'He is eating lunch.', 'They am eating lunch.', 'You is eating lunch.'],
      correctAnswer: 'He is eating lunch.',
      explanation: 'Present Progressive uses "is/are + verb-ing". "He is" is correct for third person singular.'
    },
    {
      question: 'What is the correct form for "I" in Present Progressive?',
      options: ['I is studying.', 'I are studying.', 'I am studying.', 'I be studying.'],
      correctAnswer: 'I am studying.',
      explanation: 'With "I", we use "am" in Present Progressive: I am + verb-ing.'
    },
    {
      question: 'Choose the correct sentence about a complaint:',
      options: ['She is complain about the service.', 'She is complaining about the service.', 'She are complaining about the service.', 'She am complaining about the service.'],
      correctAnswer: 'She is complaining about the service.',
      explanation: 'We need "is" + verb-ing. "Complaining" is the -ing form of "complain".'
    },
    {
      question: 'Which sentence describes an action happening RIGHT NOW?',
      options: ['They shop every day.', 'They are shopping right now.', 'They shopped yesterday.', 'They will shop tomorrow.'],
      correctAnswer: 'They are shopping right now.',
      explanation: 'Present Progressive shows actions happening at this moment: are + verb-ing.'
    },
    {
      question: 'Complete: "We _____ for the bus at this moment."',
      options: ['wait', 'are waiting', 'waits', 'waited'],
      correctAnswer: 'are waiting',
      explanation: 'For present actions: we use "are" + waiting (verb-ing form).'
    },
    {
      question: 'Which is grammatically correct?',
      options: ['You is asking questions right now.', 'You are asking questions right now.', 'You am asking questions right now.', 'You be asking questions right now.'],
      correctAnswer: 'You are asking questions right now.',
      explanation: 'With "you" (plural or singular formal), we use "are" in Present Progressive.'
    },
  ];

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!showResults ? (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-indigo-700 mb-2 text-center">
                Present Progressive Grammar
              </h1>
              <p className="text-lg text-gray-600 text-center">
                Master "am/is/are + verb-ing" for current actions and complaints
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-semibold text-indigo-600">
                  Score: {score}
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left rounded-lg border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-semibold text-gray-800"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hint */}
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-gray-700">
                <strong>💡 Hint:</strong> Present Progressive = am/is/are + verb-ing. Use it for actions happening RIGHT NOW or express complaints!
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-indigo-700 mb-4">Quiz Complete! 🎉</h2>
            <p className="text-6xl font-bold text-indigo-600 mb-4">
              {score}/{questions.length}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {score === questions.length
                ? 'Perfect! You mastered Present Progressive! 🌟'
                : score >= questions.length * 0.8
                ? 'Great job! Keep practicing Present Progressive! 👍'
                : 'Good effort! Review Present Progressive rules and try again! 💪'}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Restart Quiz
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PresentProgressiveGrammar;
