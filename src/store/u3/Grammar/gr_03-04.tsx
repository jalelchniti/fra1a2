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

const Gr_03_04 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Choose the correct sentence about right now:',
      options: [
        'I am driving a car.',
        'I will drive a car.',
        'I drive a car every day.',
        'I drove a car yesterday.',
      ],
      correct: 0,
      explanation: 'Present Progressive "am driving" describes an action happening RIGHT NOW.',
    },
    {
      id: 2,
      question: 'Which sentence describes a future plan?',
      options: [
        'She is waiting for the bus.',
        'She waited for the bus.',
        'She is going to take a taxi.',
        'She takes the train every day.',
      ],
      correct: 2,
      explanation: '"Is going to take" shows a future plan. Pattern: is/are going to + base verb.',
    },
    {
      id: 3,
      question: 'Which sentence describes something that finished in the past?',
      options: [
        'They are traveling by train.',
        'They travel every week.',
        'They are going to travel next month.',
        'They traveled last month.',
      ],
      correct: 3,
      explanation: '"Traveled" is Simple Past - the action is finished.',
    },
    {
      id: 4,
      question: 'Complete: "Right now, I ____ the train."',
      options: ['am taking', 'took', 'will take', 'take every day'],
      correct: 0,
      explanation: 'Present Progressive "am taking" for action happening now.',
    },
    {
      id: 5,
      question: 'Complete: "Yesterday, we ____ by bus."',
      options: ['are traveling', 'were traveling', 'traveled', 'are going to travel'],
      correct: 2,
      explanation: '"Traveled" is Simple Past (verb + -ed) for completed past actions.',
    },
    {
      id: 6,
      question: 'Complete: "Tomorrow, she ____ by car."',
      options: ['is driving', 'drove', 'is going to drive', 'drives'],
      correct: 2,
      explanation: '"Is going to drive" expresses a future plan or intention.',
    },
    {
      id: 7,
      question: 'Ask the question about right now: "Are you ____ the bus?"',
      options: ['taking', 'took', 'going to take', 'take'],
      correct: 0,
      explanation: 'Present Progressive question: "Are you taking...?" Pattern: are + subject + -ing?',
    },
    {
      id: 8,
      question: 'Ask the question about the past: "____ you walk to school yesterday?"',
      options: ['Are', 'Do', 'Did', 'Will'],
      correct: 2,
      explanation: 'Simple Past question: "Did you walk...?" Pattern: Did + subject + base verb?',
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
            Mixed Tenses & Questions
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

export default Gr_03_04;
