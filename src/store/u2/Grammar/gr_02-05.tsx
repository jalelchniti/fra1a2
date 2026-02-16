// src/store/u2/Grammar/gr_02-05.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { fr } from '../../../../locales/fr';

const PresentProgressiveGrammar: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const questions = [
    {
      question: fr.q1_present_progressive,
      options: [fr.q1_present_progressive_option1, fr.q1_present_progressive_option2, fr.q1_present_progressive_option3, fr.q1_present_progressive_option4],
      correctAnswer: fr.q1_present_progressive_correct,
      explanation: fr.q1_present_progressive_explanation
    },
    {
      question: fr.q2_present_progressive,
      options: [fr.q2_present_progressive_option1, fr.q2_present_progressive_option2, fr.q2_present_progressive_option3, fr.q2_present_progressive_option4],
      correctAnswer: fr.q2_present_progressive_correct,
      explanation: fr.q2_present_progressive_explanation
    },
    {
      question: fr.q3_present_progressive,
      options: [fr.q3_present_progressive_option1, fr.q3_present_progressive_option2, fr.q3_present_progressive_option3, fr.q3_present_progressive_option4],
      correctAnswer: fr.q3_present_progressive_correct,
      explanation: fr.q3_present_progressive_explanation
    },
    {
      question: fr.q4_present_progressive,
      options: [fr.q4_present_progressive_option1, fr.q4_present_progressive_option2, fr.q4_present_progressive_option3, fr.q4_present_progressive_option4],
      correctAnswer: fr.q4_present_progressive_correct,
      explanation: fr.q4_present_progressive_explanation
    },
    {
      question: fr.q5_present_progressive,
      options: [fr.q5_present_progressive_option1, fr.q5_present_progressive_option2, fr.q5_present_progressive_option3, fr.q5_present_progressive_option4],
      correctAnswer: fr.q5_present_progressive_correct,
      explanation: fr.q5_present_progressive_explanation
    },
    {
      question: fr.q6_present_progressive,
      options: [fr.q6_present_progressive_option1, fr.q6_present_progressive_option2, fr.q6_present_progressive_option3, fr.q6_present_progressive_option4],
      correctAnswer: fr.q6_present_progressive_correct,
      explanation: fr.q6_present_progressive_explanation
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
                {fr.present_progressive_grammar_title}
              </h1>
              <p className="text-lg text-gray-600 text-center">
                {fr.present_progressive_grammar_intro}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {fr.question_of_total.replace('{current}', (currentQuestion + 1).toString()).replace('{total}', questions.length.toString())}
                </span>
                <span className="text-sm font-semibold text-indigo-600">
                  {fr.score_text_short.replace('{score}', score.toString())}
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
                <strong>💡 {fr.hint_text}:</strong> {fr.hint_present_progressive}
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-indigo-700 mb-4">{fr.quiz_complete} 🎉</h2>
            <p className="text-6xl font-bold text-indigo-600 mb-4">
              {score}/{questions.length}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {score === questions.length
                ? fr.perfect_present_progressive
                : score >= questions.length * 0.8
                ? fr.great_job_present_progressive
                : fr.good_effort_present_progressive}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {fr.restart_quiz}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PresentProgressiveGrammar;