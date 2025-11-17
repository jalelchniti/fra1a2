// Unit 2 Lesson 1 - Grammar: Imperatives for Directions
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "Which sentence correctly gives a direction in imperative form?",
    options: ["You turn right here.", "Turn right here.", "You should turn right.", "Do turn right here."],
    correctAnswer: 1,
    explanation: "Imperatives use the base verb form without 'you'. 'Turn right here.' is the correct imperative form."
  },
  {
    question: "How do we make a negative imperative?",
    options: ["Don't turn left.", "Not turn left.", "You don't turn left.", "Don't to turn left."],
    correctAnswer: 0,
    explanation: "'Don't' + base verb is the correct negative imperative form."
  },
  {
    question: "Fill in the blank: '_____ straight until you see the bank.'",
    options: ["Goes", "Go", "Going", "Went"],
    correctAnswer: 1,
    explanation: "In imperative sentences, we use the base form of the verb without 's'."
  },
  {
    question: "Which is NOT an imperative sentence?",
    options: ["Take the first left.", "You must take the first left.", "Follow this street.", "Stop at the corner."],
    correctAnswer: 1,
    explanation: "'You must take the first left' is not imperative; it's a statement with modal verb 'must'."
  },
  {
    question: "Choose the correct imperative: 'Please _____ me where the store is.'",
    options: ["tell", "tells", "telling", "told"],
    correctAnswer: 0,
    explanation: "Imperatives always use the base form of the verb."
  }
];

const ImperativesGrammarQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(selectedAnswers[currentQuestion - 1] !== null);
    }
  };

  const score = selectedAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Imperatives for Directions</h1>
          <p className="text-gray-600">Unit 2 - Grammar Lesson 1</p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>

          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === idx
                    ? idx === questions[currentQuestion].correctAnswer
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : "border-gray-300 bg-gray-50 hover:border-blue-400"
                }`}
              >
                <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer
                  ? "bg-green-100 border border-green-500"
                  : "bg-yellow-100 border border-yellow-500"
              }`}
            >
              <p className="font-semibold text-gray-800 mb-2">
                {selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer
                  ? "✓ Correct!"
                  : "✗ Incorrect"}
              </p>
              <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
            </motion.div>
          )}
        </div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
          >
            ← Previous
          </button>
          <div className="text-center">
            <p className="text-gray-600">Score: {score} / {questions.length}</p>
          </div>
          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1 || selectedAnswers[currentQuestion] === null}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImperativesGrammarQuiz;
