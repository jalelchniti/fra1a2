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

const Gr_03_02 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Complete the sentence: "I ____ take the bus tomorrow."',
      options: ['am going to', 'is going to', 'are going to', 'go to'],
      correct: 0,
      explanation: 'Future with "going to" + infinitive. Pattern: I am going to + base verb.',
    },
    {
      id: 2,
      question: 'Choose the correct form: "She ____ drive to the station."',
      options: ['am going to', 'is going to', 'are going to', 'be going to'],
      correct: 1,
      explanation: 'With "she" (3rd person): "is going to" + base verb. She is going to drive.',
    },
    {
      id: 3,
      question: 'Complete: "We ____ travel by train next week."',
      options: ['is going to', 'am going to', 'are going to', 'be going to'],
      correct: 2,
      explanation: 'With "we" (plural): "are going to" + base verb.',
    },
    {
      id: 4,
      question: 'Make the negative: "He is going to ride a bike." → "He ____ ride a bike."',
      options: ['is not going to', 'is going not to', 'are not going to', 'not going to'],
      correct: 0,
      explanation: 'Negative: subject + "is/are not going to" + base verb.',
    },
    {
      id: 5,
      question: 'Make the negative: "They are going to wait." → "They ____ wait."',
      options: ['is not going to', 'are not going to', 'not going to', 'going not to'],
      correct: 1,
      explanation: 'With plural "they": "are not going to" + base verb.',
    },
    {
      id: 6,
      question: 'Ask a yes/no question: "You are going to take a taxi." → "____ you going to take a taxi?"',
      options: ['Are', 'Is', 'Am', 'Be'],
      correct: 0,
      explanation: 'Yes/No question: "Are you going to...?" Pattern: Are + subject + going to + base verb?',
    },
    {
      id: 7,
      question: 'Ask a yes/no question: "She is going to travel." → "____ she going to travel?"',
      options: ['Are', 'Is', 'Am', 'Do'],
      correct: 1,
      explanation: 'With "she": "Is she going to...?" Pattern: Is + subject + going to + base verb?',
    },
    {
      id: 8,
      question: 'Ask a "where" question: "____ are you going to go?" (by train or bus?)',
      options: ['Where', 'When', 'Why', 'What'],
      correct: 0,
      explanation: 'Use "Where" to ask about destination. Pattern: Where + are/is + subject + going to + verb?',
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/grammar')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Future with Going To
          </h1>
          <div className="w-[100px]"></div>
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

export default Gr_03_02;
