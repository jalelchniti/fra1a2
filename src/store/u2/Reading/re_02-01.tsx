// Unit 2 Lesson 1 - Reading: Shopping Information
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const passage = `Welcome to Green Valley Store!
We are open Monday to Friday from 9 AM to 6 PM.
Saturday and Sunday: 10 AM to 5 PM.

Our store has three sections:
- First floor: Clothing and shoes
- Second floor: Electronics and accessories
- Third floor: Food and beverages

Special offers this week:
- 50% discount on summer clothes
- Buy 2, get 1 free on selected items
- Free delivery for purchases over $50

Our friendly staff is ready to help you find what you need.
Visit us today!`;

const questions: Question[] = [
  {
    question: "What are the store hours on Saturday?",
    options: ["9 AM to 6 PM", "10 AM to 5 PM", "9 AM to 5 PM", "Closed"],
    correctAnswer: 1
  },
  {
    question: "Which floor sells electronics?",
    options: ["First floor", "Second floor", "Third floor", "Not mentioned"],
    correctAnswer: 1
  },
  {
    question: "What is the discount on summer clothes?",
    options: ["25% off", "50% off", "Buy 1 get 1 free", "Free delivery"],
    correctAnswer: 1
  },
  {
    question: "What items are on the third floor?",
    options: ["Clothing and shoes", "Electronics and accessories", "Food and beverages", "Gifts"],
    correctAnswer: 2
  },
  {
    question: "What is the minimum purchase for free delivery?",
    options: ["$25", "$30", "$50", "No minimum"],
    correctAnswer: 2
  }
];

const ShoppingReadingQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    if (!isTtsEnabled || isSpeakingRef.current) return;
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    const englishVoice = voices.find((voice) => voice.lang === "en-US") || voices[0];
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    utterance.onend = () => {
      isSpeakingRef.current = false;
    };
    window.speechSynthesis.speak(utterance);
  };

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
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Reading: Shopping Information</h1>
          <p className="text-gray-600">Unit 2 - Reading Lesson 1</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Passage</h2>
            <button
              onClick={() => speak(passage)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              🔊 Read Aloud
            </button>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{passage}</p>
        </motion.div>

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
              <p className="font-semibold text-gray-800">
                {selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer
                  ? "✓ Correct!"
                  : "✗ Incorrect"}
              </p>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <input
            type="checkbox"
            checked={isTtsEnabled}
            onChange={(e) => setIsTtsEnabled(e.target.checked)}
            id="tts-toggle"
            className="w-5 h-5 cursor-pointer"
          />
          <label htmlFor="tts-toggle" className="text-gray-700 cursor-pointer">
            Enable Text-to-Speech
          </label>
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

export default ShoppingReadingQuiz;
