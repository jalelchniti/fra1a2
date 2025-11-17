// Unit 2 Lesson 2 - Grammar: Asking Questions
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
    question: "Which question is grammatically correct?",
    options: ["Where is the hospital?", "Where the hospital is?", "The hospital is where?", "Where it is the hospital?"],
    correctAnswer: 0,
    explanation: "In questions, we use the word order: 'Where + is + the hospital?' This is the correct question formation."
  },
  {
    question: "Choose the correct question form for directions:",
    options: ["How do I get to...?", "How I get to...?", "How to get to...?", "Do how I get to...?"],
    correctAnswer: 0,
    explanation: "The correct question form is 'How + do + I + get + to...?' with the auxiliary verb 'do'."
  },
  {
    question: "Fill in the blank: '_____ the nearest bank?'",
    options: ["Where is", "Is where", "Where be", "Is the"],
    correctAnswer: 0,
    explanation: "'Where is' is the correct question formation for asking location."
  },
  {
    question: "Which is the correct way to ask for directions politely?",
    options: ["Can you tell me where the store is?", "You can tell me where the store is?", "Tell me where the store is?", "Is the store where you tell me?"],
    correctAnswer: 0,
    explanation: "'Can you tell me where the store is?' is polite and grammatically correct."
  },
  {
    question: "How do we form a 'yes/no' question about directions?",
    options: ["Do + subject + verb + to location?", "Subject + do + verb + to location?", "Do + verb + subject + to location?", "Verb + subject + do + to location?"],
    correctAnswer: 0,
    explanation: "Yes/no questions follow the pattern: 'Do/Does + subject + verb + prepositional phrase?'"
  }
];

const AskingQuestionsGrammarQuiz: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Asking Questions</h1>
          <p className="text-gray-600">Unit 2 - Grammar Lesson 2</p>
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

export default AskingQuestionsGrammarQuiz;
