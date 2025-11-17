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

const Re_03_01 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const passage = `
    ON THE TRAIN RIGHT NOW

    It is 2 PM on Saturday. Ali is on a train. He is traveling to the city. He is sitting in a comfortable seat by the window.
    He is reading a book about traveling. A woman is sitting next to him. She is eating an apple. Two children are playing with toys.
    The train is moving fast. Many people are waiting for the train to arrive at the station. The weather is sunny and nice outside.
    Ali is very happy. He is enjoying his trip very much.
  `;

  const questions: Question[] = [
    {
      id: 1,
      question: 'What is Ali doing RIGHT NOW?',
      options: ['He is sleeping', 'He is reading a book', 'He is eating an apple', 'He is playing with toys'],
      correct: 1,
      explanation: 'The passage says "He is reading a book about traveling." This is present progressive action happening now.',
    },
    {
      id: 2,
      question: 'Where is Ali traveling to?',
      options: ['To the train station', 'To the city', 'To work', 'To a restaurant'],
      correct: 1,
      explanation: 'The text states "He is traveling to the city."',
    },
    {
      id: 3,
      question: 'What kind of seat is Ali sitting in?',
      options: ['An old seat', 'A hard seat', 'A comfortable seat', 'A small seat'],
      correct: 2,
      explanation: 'The passage says "He is sitting in a comfortable seat by the window."',
    },
    {
      id: 4,
      question: 'What is the woman next to Ali doing?',
      options: ['She is reading', 'She is sleeping', 'She is eating an apple', 'She is talking on the phone'],
      correct: 2,
      explanation: 'The text says "A woman is sitting next to him. She is eating an apple."',
    },
    {
      id: 5,
      question: 'How many children are on the train?',
      options: ['One', 'Two', 'Three', 'Four'],
      correct: 1,
      explanation: 'The passage says "Two children are playing with toys."',
    },
    {
      id: 6,
      question: 'What time is it?',
      options: ['1 PM', '2 PM', '3 PM', '4 PM'],
      correct: 1,
      explanation: 'The text begins with "It is 2 PM on Saturday."',
    },
    {
      id: 7,
      question: 'How is Ali feeling?',
      options: ['Sad', 'Tired', 'Happy', 'Angry'],
      correct: 2,
      explanation: 'The passage says "Ali is very happy. He is enjoying his trip very much."',
    },
    {
      id: 8,
      question: 'What is the weather like?',
      options: ['Rainy', 'Cold', 'Sunny and nice', 'Windy'],
      correct: 2,
      explanation: 'The text states "The weather is sunny and nice outside."',
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
            Reading: Present Progressive
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

export default Re_03_01;
