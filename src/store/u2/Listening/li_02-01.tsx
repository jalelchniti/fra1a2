// Unit 2 Lesson 1 - Listening: Understanding Directions
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  audio: string;
}

const questions: Question[] = [
  {
    question: "Where should you turn left?",
    options: ["At the bank", "At the traffic light", "At the church", "At the corner store"],
    correctAnswer: 1,
    audio: "Turn right at the traffic light, then go straight for two blocks. When you see the church, turn left."
  },
  {
    question: "How far is the hospital from the station?",
    options: ["Very close, 5 minutes walk", "Medium distance, 15 minutes", "Far, 30 minutes", "Very far, take a taxi"],
    correctAnswer: 1,
    audio: "From the train station, it takes about 15 minutes to walk to the hospital. Just follow Main Street."
  },
  {
    question: "What landmark is next to the library?",
    options: ["A coffee shop", "A park", "A bookstore", "A museum"],
    correctAnswer: 2,
    audio: "The library is on Oak Street, next to a big bookstore. You can't miss it!"
  },
  {
    question: "Which direction do you go first?",
    options: ["Left", "Right", "Straight", "Turn around"],
    correctAnswer: 0,
    audio: "Excuse me, to get to the bus station? Go left here, then take the first right turn."
  },
  {
    question: "How many blocks should you walk?",
    options: ["One block", "Two blocks", "Three blocks", "Four blocks"],
    correctAnswer: 1,
    audio: "Walk straight ahead for two blocks, then you'll see the bank on your left."
  }
];

const ListeningDirectionsQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasListened, setHasListened] = useState(false);

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(questions[currentQuestion].audio);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
    setHasListened(true);
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
      setHasListened(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(selectedAnswers[currentQuestion - 1] !== null);
      setHasListened(false);
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Listening: Understanding Directions</h1>
          <p className="text-gray-600">Unit 2 - Listening Lesson 1</p>
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

          <button
            onClick={playAudio}
            className="w-full px-6 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition mb-8 text-lg"
          >
            🔊 Play Audio
          </button>

          {!hasListened && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
              <p className="text-yellow-800">Click the "Play Audio" button above to listen to the conversation.</p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={!hasListened}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  !hasListened
                    ? "opacity-50 cursor-not-allowed border-gray-300 bg-gray-50"
                    : selectedAnswers[currentQuestion] === idx
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
              <p className="text-gray-700 mt-2 text-sm italic">{questions[currentQuestion].audio}</p>
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

export default ListeningDirectionsQuiz;
