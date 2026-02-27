import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { fr } from '../../../locales/fr';

const VerbToBeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const questions = [
    {
      question: fr.verb_to_be_q1,
      options: [fr.verb_to_be_q1_option1, fr.verb_to_be_q1_option2, fr.verb_to_be_q1_option3, fr.verb_to_be_q1_option4],
      correctAnswer: fr.verb_to_be_q1_correct,
    },
    {
      question: fr.verb_to_be_q2,
      options: [fr.verb_to_be_q2_option1, fr.verb_to_be_q2_option2, fr.verb_to_be_q2_option3, fr.verb_to_be_q2_option4],
      correctAnswer: fr.verb_to_be_q2_correct,
    },
    {
      question: fr.verb_to_be_q3,
      options: [fr.verb_to_be_q3_option1, fr.verb_to_be_q3_option2, fr.verb_to_be_q3_option3, fr.verb_to_be_q3_option4],
      correctAnswer: fr.verb_to_be_q3_correct,
    },
    {
      question: fr.verb_to_be_q4,
      options: [fr.verb_to_be_q4_option1, fr.verb_to_be_q4_option2, fr.verb_to_be_q4_option3, fr.verb_to_be_q4_option4],
      correctAnswer: fr.verb_to_be_q4_correct,
    },
    {
      question: fr.verb_to_be_q5,
      options: [fr.verb_to_be_q5_option1, fr.verb_to_be_q5_option2, fr.verb_to_be_q5_option3, fr.verb_to_be_q5_option4],
      correctAnswer: fr.verb_to_be_q5_correct,
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
        className="w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-indigo-800 mb-6 text-center drop-shadow-sm">
          {fr.a1_verb_to_be_quiz_title}
        </h1>
        <p className="text-gray-800 text-lg mb-8 text-center">
          {fr.practice_verb_to_be_intro}
        </p>

        {!showResults ? (
          <motion.div 
            className="space-y-6"
            key={currentQuestion}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-indigo-700 mb-4 drop-shadow-sm">
                {fr.question_of_total.replace('{current}', (currentQuestion + 1).toString()).replace('{total}', questions.length.toString())}
              </h3>
              <p className="text-gray-800 mb-6 text-lg">{questions[currentQuestion].question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all duration-300 shadow-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-indigo-700 mb-4 drop-shadow-sm">
              {fr.quiz_results}
            </h3>
            <p className="text-gray-800 mb-6 text-lg">
              {fr.you_scored.replace('{score}', score.toString()).replace('{total}', questions.length.toString())}
              <span className={`ml-2 font-medium ${score === questions.length ? 'text-green-600' : 'text-indigo-600'}`}>
                {score === questions.length ? fr.perfect : score >= questions.length / 2 ? fr.good_job : fr.keep_practicing}
              </span>
            </p>
            <motion.button
              onClick={restartQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {fr.restart_quiz}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VerbToBeQuiz;