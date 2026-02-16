// src/store/u2/Listening/li_02-05.tsx
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

interface Question {
  text: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const PresentProgressiveListeningQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = useMemo(() => [
    {
      text: "Hello everyone! I am shopping at the market right now. I am looking for fresh vegetables and fruits. The vegetables are looking good today. I am complaining about the price because they are very expensive!",
      question: "What is the speaker doing right now?",
      options: ["She is cooking food.", "She is shopping at the market.", "She is at the hospital.", "She is teaching a class."],
      correctAnswer: "She is shopping at the market."
    },
    {
      text: "My friends are having a meeting at the coffee shop. We are discussing a new project. John is presenting his ideas, and everyone is listening carefully. We are very excited about this project!",
      question: "What are the friends doing right now?",
      options: ["They are playing sports.", "They are having a meeting.", "They are watching a movie.", "They are cooking dinner."],
      correctAnswer: "They are having a meeting."
    },
    {
      text: "I am sitting in my office, and I am working on a very difficult task. My computer is making strange noises. I am complaining about this because it is very annoying! I am also frustrated because the internet is very slow.",
      question: "What is the speaker complaining about?",
      options: ["The weather is bad.", "The computer is making noises and the internet is slow.", "The office is too small.", "His boss is rude."],
      correctAnswer: "The computer is making noises and the internet is slow."
    },
    {
      text: "The children are playing in the park right now. Some children are playing soccer, others are playing on the playground. They are having a wonderful time! Parents are watching them and smiling because everyone is being safe and happy.",
      question: "What are the children doing?",
      options: ["They are studying.", "They are working in the factory.", "They are playing in the park.", "They are sleeping."],
      correctAnswer: "They are playing in the park."
    },
    {
      text: "My neighbor is complaining about the noise because I am practicing my guitar. I am playing loudly, and she is very angry. I am feeling sorry, but I am also practicing for an important concert this weekend. The situation is difficult right now.",
      question: "Why is the neighbor complaining?",
      options: ["The music is too beautiful.", "Someone is making too much noise from guitar playing.", "The house is too old.", "The street is busy."],
      correctAnswer: "Someone is making too much noise from guitar playing."
    }
  ], []);

  useEffect(() => {
    const speakText = (text: string) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // Stop any current speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.9; // Slightly slower for clarity
        window.speechSynthesis.speak(utterance);
      }
    };
    if (currentQuestion < questions.length) {
      speakText(questions[currentQuestion].text);
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentQuestion, questions]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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
    setUserAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-purple-700 mb-4">Quiz Complete! 🎉</h2>
          <p className="text-6xl font-bold text-purple-600 mb-4">
            {score}/{questions.length}
          </p>
          <p className="text-xl text-gray-600 mb-8">
            {score === questions.length
              ? 'Perfect! You understood all the Present Progressive listening passages! 🌟'
              : score >= questions.length * 0.8
              ? 'Great listening comprehension! Keep practicing! 👍'
              : 'Good effort! Listen again and focus on the "-ing" actions! 💪'}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={restartQuiz}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Restart Listening Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2 text-center">
            Present Progressive Listening
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Listen carefully and answer questions about what's happening
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-purple-600">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Audio Section */}
        <div className="mb-8 p-6 bg-purple-50 rounded-lg border-2 border-purple-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-purple-700 flex items-center gap-2">
              <Volume2 size={24} />
              Listen to This:
            </h3>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => speakText(questions[currentQuestion].text)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Volume2 size={18} />
              Play Again
            </motion.button>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed bg-white p-4 rounded-lg border-l-4 border-purple-500">
            {questions[currentQuestion].text}
          </p>
          <p className="text-xs text-gray-500 mt-3 text-center">
            💡 The text will be read aloud. Listen carefully for Present Progressive actions!
          </p>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {questions[currentQuestion].question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: isAnswered ? 1 : 1.02 }}
              whileTap={{ scale: isAnswered ? 1 : 0.98 }}
              onClick={() => !isAnswered && handleAnswer(option)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all font-semibold text-lg ${
                selectedAnswer === option
                  ? option === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : option === questions[currentQuestion].correctAnswer && isAnswered
                  ? 'bg-green-100 border-green-500'
                  : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 border-l-4 ${
              selectedAnswer === questions[currentQuestion].correctAnswer
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            <p
              className={`font-semibold ${
                selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}
            >
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? '✓ Correct! Great listening!'
                : '✗ Not quite. Listen again!'}
            </p>
          </motion.div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
          </motion.button>
        )}

        {/* Hint */}
        <div className="mt-6 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
          <p className="text-sm text-gray-700">
            <strong>💡 Tip:</strong> Listen for "ing" words like "shopping", "playing", "complaining" to find Present Progressive actions!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PresentProgressiveListeningQuiz;
