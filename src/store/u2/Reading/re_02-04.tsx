// Unit 2 Lesson 4 - Reading: Instructions & Receipt
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const passage = `RETURN & EXCHANGE POLICY

Welcome! We want you to be happy with your purchase.

Returns:
- Items can be returned within 14 days of purchase
- Must be in original condition with original tags attached
- Bring your receipt as proof of purchase
- Return to any of our store locations

Refunds:
- Refund will be issued to the original payment method
- Processing time: 5-7 business days
- No restocking fee

Exchanges:
- Exchange items at any time, no limit
- If exchanging for same price, no additional charge
- If exchanging for higher price, pay the difference
- If exchanging for lower price, receive store credit

Receipt Information:
- Keep your receipt for returns and exchanges
- Digital receipts can be requested by email
- Lost receipt? Show us your ID and payment card used`;

const questions: Question[] = [
  {
    question: "How many days can you return an item?",
    options: ["7 days", "10 days", "14 days", "30 days"],
    correctAnswer: 2
  },
  {
    question: "What proof of purchase is needed for returns?",
    options: ["Your ID", "Your payment card", "The receipt", "Email confirmation"],
    correctAnswer: 2
  },
  {
    question: "Is there a restocking fee for returns?",
    options: ["Yes, 10%", "Yes, 5%", "No restocking fee", "Yes, $5"],
    correctAnswer: 2
  },
  {
    question: "How long does refund processing take?",
    options: ["2-3 days", "5-7 business days", "10-14 days", "1 month"],
    correctAnswer: 1
  },
  {
    question: "What happens if you exchange for a more expensive item?",
    options: ["No extra charge", "Pay the difference", "Store credit", "Automatic refund"],
    correctAnswer: 1
  }
];

const InstructionsReadingQuiz: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Reading: Return & Exchange Policy</h1>
          <p className="text-gray-600">Unit 2 - Reading Lesson 4</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Policy</h2>
            <button
              onClick={() => speak(passage)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              🔊 Read Aloud
            </button>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{passage}</p>
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

export default InstructionsReadingQuiz;
