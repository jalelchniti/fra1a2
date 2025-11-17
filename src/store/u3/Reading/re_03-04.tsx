import { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Re_03_04 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const passage = `
    COMPARING TRANSPORTATION

    There are many ways to travel: by train, by bus, and by car. Each way is different.

    SPEED: The train is faster than the bus. A train travels at 120 km per hour. A bus travels at 60 km per hour.
    The car is slower than the train but faster than the bus. A car travels at 80 km per hour.

    PRICE: A bus ticket is cheaper than a train ticket. A train ticket is more expensive than a bus ticket.
    A car is cheaper to use than a train, but you need to buy the car first. The car is better if you travel alone.

    COMFORT: A train seat is more comfortable than a bus seat. The train has more space. A car seat depends on the car.
    Some cars have comfortable seats, and some do not. Many people think the train is the most comfortable.

    SAFETY: Both trains and buses are safe. Cars can be safe or dangerous. A good driver is important.
    The train is safer than the car because a train driver is a professional. Many accidents happen on roads.

    CONVENIENCE: A bus is convenient because there are bus stops everywhere in the city. A train is convenient for long distances.
    A car is convenient because you can drive when you want. But you need to find a parking space.

    BEST FOR: Trains are best for long trips. Buses are best for short trips in the city. Cars are best for families.
  `;

  const questions: Question[] = [
    {
      id: 1,
      question: 'Which is faster: a train or a bus?',
      options: ['A bus is faster', 'A train is faster', 'They are the same speed', 'The passage does not say'],
      correct: 1,
      explanation: 'The passage states "The train is faster than the bus."',
    },
    {
      id: 2,
      question: 'What speed does a bus travel at?',
      options: ['60 km per hour', '80 km per hour', '100 km per hour', '120 km per hour'],
      correct: 0,
      explanation: 'The text says "A bus travels at 60 km per hour."',
    },
    {
      id: 3,
      question: 'Which is cheaper: a bus ticket or a train ticket?',
      options: ['A train ticket is cheaper', 'A bus ticket is cheaper', 'They are the same price', 'The passage does not say'],
      correct: 1,
      explanation: 'The passage says "A bus ticket is cheaper than a train ticket."',
    },
    {
      id: 4,
      question: 'Which is more comfortable: a train seat or a bus seat?',
      options: ['A bus seat is more comfortable', 'A train seat is more comfortable', 'They are the same', 'The passage does not say'],
      correct: 1,
      explanation: 'The text states "A train seat is more comfortable than a bus seat."',
    },
    {
      id: 5,
      question: 'Which is safer: a train or a car?',
      options: ['A car is safer', 'A train is safer', 'They are equally safe', 'The passage does not say'],
      correct: 1,
      explanation: 'The passage says "The train is safer than the car because a train driver is a professional."',
    },
    {
      id: 6,
      question: 'What is the car best for?',
      options: ['Best for long trips', 'Best for short trips', 'Best for families', 'Best for everyone'],
      correct: 2,
      explanation: 'The text states "Cars are best for families."',
    },
    {
      id: 7,
      question: 'What is a problem with using a car?',
      options: [
        'You cannot drive alone',
        'You need to find a parking space',
        'You cannot go fast',
        'You cannot be comfortable',
      ],
      correct: 1,
      explanation: 'The passage says "A car is convenient because you can drive when you want. But you need to find a parking space."',
    },
    {
      id: 8,
      question: 'Which transportation is best for long trips?',
      options: ['Bus', 'Car', 'Train', 'All are the same'],
      correct: 2,
      explanation: 'The text says "Trains are best for long trips."',
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (optionIndex === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isComplete = currentQuestionIndex === questions.length - 1 && answered;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/reading')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Reading: Comparative Adjectives
          </h1>
          <div className="w-[100px]"></div>
        </div>

        {/* Passage Box */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{passage}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-gray-700 font-semibold">
              Score: {score}/{questions.length}
            </p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      !answered
                        ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                        : selectedAnswer === index
                        ? index === currentQuestion.correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : index === currentQuestion.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{option}</span>
                      {answered && (
                        <>
                          {index === currentQuestion.correct && (
                            <CheckCircle size={24} className="text-green-500" />
                          )}
                          {selectedAnswer === index && index !== currentQuestion.correct && (
                            <XCircle size={24} className="text-red-500" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Explanation */}
        {answered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-lg mb-8 ${
              selectedAnswer === currentQuestion.correct
                ? 'bg-green-50 border-l-4 border-green-500'
                : 'bg-yellow-50 border-l-4 border-yellow-500'
            }`}
          >
            <p className="font-semibold text-gray-800 mb-2">
              {selectedAnswer === currentQuestion.correct ? '✓ Correct!' : '✗ Not quite right'}
            </p>
            <p className="text-gray-700">{currentQuestion.explanation}</p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isComplete && answered && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-600 transition"
            >
              Next Question
            </button>
          )}

          {isComplete && (
            <>
              <div className="w-full text-center">
                <p className="text-2xl font-bold text-gray-800 mb-4">
                  Quiz Complete! 🎉
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Your score: {score} out of {questions.length}
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-600 transition"
                >
                  Try Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Re_03_04;
