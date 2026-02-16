import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fr } from '../../../../locales/fr';

interface Question {
  id: number;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  { id: 1, question: "Est-elle une enseignante?", hint: "👍", options: [fr.yes_she_is, fr.no_she_isnt], correctAnswer: fr.yes_she_is },
  { id: 2, question: "Sont-ils des étudiants?", hint: "👎", options: [fr.yes_they_are, fr.no_they_arent], correctAnswer: fr.no_they_arent },
  { id: 3, question: "Suis-je en retard pour le cours?", hint: "👎", options: [fr.yes_you_are, fr.no_you_arent], correctAnswer: fr.no_you_arent },
  { id: 4, question: "Vient-il de Londres?", hint: "👍", options: [fr.yes_he_is, fr.no_he_isnt], correctAnswer: fr.yes_he_is },
  { id: 5, question: "Sommes-nous au parc?", hint: "👍", options: [fr.yes_we_are, fr.no_we_arent], correctAnswer: fr.yes_we_are },
  { id: 6, question: "Fait-il beau aujourd'hui?", hint: "👍", options: [fr.yes_it_is, fr.no_it_isnt], correctAnswer: fr.yes_it_is },
  { id: 7, question: "Êtes-vous médecin?", hint: "👎", options: [fr.yes_i_am, fr.no_im_not], correctAnswer: fr.no_im_not },
  { id: 8, question: "Est-elle très grande?", hint: "👍", options: [fr.yes_she_is, fr.no_she_isnt], correctAnswer: fr.yes_she_is },
  { id: 9, question: "Viennent-ils du Brésil?", hint: "👎", options: [fr.yes_they_are, fr.no_they_arent], correctAnswer: fr.no_they_arent },
  { id: 10, question: "Suis-je dans la bonne pièce?", hint: "👍", options: [fr.yes_you_are, fr.no_you_arent], correctAnswer: fr.yes_you_are },
];

const GrammarQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    setFeedback(isCorrect ? fr.correct_feedback : fr.wrong_feedback + questions[currentQuestion].correctAnswer);
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setShowScore(true);
      }
    }, 1500); // Delay for feedback visibility
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="quiz-container p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg"
    >
      {showScore ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="score-section text-center p-6"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">{fr.quiz_completed}</h2>
          <p className="text-xl text-gray-700 mb-6">
            {fr.your_score} <span className="font-semibold text-indigo-600">{score}</span> {fr.out_of} {questions.length}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="px-6 py-3 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition-colors duration-300"
          >
            {fr.retry_quiz}
          </motion.button>
        </motion.div>
      ) : (
        <>
          <div className="question-section mb-8">
            <div className="question-count text-center mb-3">
              <span className="text-lg font-medium text-gray-600">
                {fr.question_grammar_hint.replace('{current}', (currentQuestion + 1).toString()).replace('{total}', questions.length.toString())}
              </span>
            </div>
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="question-text text-2xl font-bold text-indigo-700 mb-4 text-center"
            >
              {questions[currentQuestion].question}
            </motion.div>
            <div className="hint-text text-center text-lg text-gray-600 mb-4">
              {fr.hint}: {questions[currentQuestion].hint}
            </div>
          </div>
          <div className="answer-section flex justify-center space-x-6 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`px-6 py-3 rounded-full shadow-md text-white transition-colors duration-300 ${
                  selectedAnswer === option
                    ? option === questions[currentQuestion].correctAnswer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
          {feedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center text-lg font-medium ${
                feedback === fr.correct_feedback ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default GrammarQuiz;