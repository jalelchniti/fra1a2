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

const Re_03_03 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const passage = `
    TOMORROW'S TRAVEL PLANS

    Tomorrow, Omar is going to travel to another city. He is going to take the train. It is going to be his first time
    on a train. The train is going to depart at 8 AM and arrive at 11 AM. He is going to buy a ticket today.
    His friend Hassan is going to travel with him. They are going to sit together in the train car.
    On the train, they are not going to sleep. They are going to watch the city through the window. They are going to talk
    about their plans.

    When they arrive at the station, they are going to take a taxi to the hotel. The hotel is not going to be expensive.
    The weather is going to be sunny. They are going to have a great time. They are going to visit museums, parks, and markets.
    They are going to eat local food. They are going to take many photos.

    On the last day, they are going to take the train home. They are going to return home at 6 PM.
    It is going to be a wonderful trip!
  `;

  const questions: Question[] = [
    {
      id: 1,
      question: 'How is Omar going to travel tomorrow?',
      options: ['By bus', 'By car', 'By train', 'On foot'],
      correct: 2,
      explanation: 'The passage states "Tomorrow, Omar is going to travel to another city. He is going to take the train."',
    },
    {
      id: 2,
      question: 'What time is the train going to depart?',
      options: ['7 AM', '8 AM', '9 AM', '10 AM'],
      correct: 1,
      explanation: 'The text says "The train is going to depart at 8 AM and arrive at 11 AM."',
    },
    {
      id: 3,
      question: 'Who is going to travel with Omar?',
      options: ['His sister', 'His friend Hassan', 'His father', 'Nobody'],
      correct: 1,
      explanation: 'The passage says "His friend Hassan is going to travel with him."',
    },
    {
      id: 4,
      question: 'Is this Omar\'s first time on a train?',
      options: ['Yes, it is his first time', 'No, he has traveled many times', 'The passage does not say', 'He does not know'],
      correct: 0,
      explanation: 'The text states "It is going to be his first time on a train."',
    },
    {
      id: 5,
      question: 'What are Omar and Hassan going to do on the train?',
      options: [
        'They are going to sleep',
        'They are going to watch the city and talk about plans',
        'They are going to eat',
        'They are going to read',
      ],
      correct: 1,
      explanation: 'The passage says "They are not going to sleep. They are going to watch the city through the window. They are going to talk about their plans."',
    },
    {
      id: 6,
      question: 'How are they going to go from the train station to the hotel?',
      options: ['By bus', 'By taxi', 'On foot', 'By car'],
      correct: 1,
      explanation: 'The text states "When they arrive at the station, they are going to take a taxi to the hotel."',
    },
    {
      id: 7,
      question: 'What activities are they NOT going to do?',
      options: [
        'Visit museums',
        'Visit parks',
        'Visit the beach',
        'Eat local food',
      ],
      correct: 2,
      explanation: 'The passage says they are going to visit "museums, parks, and markets" and "eat local food" and "take photos." There is no mention of visiting the beach.',
    },
    {
      id: 8,
      question: 'What time are they going to return home?',
      options: ['4 PM', '5 PM', '6 PM', '7 PM'],
      correct: 2,
      explanation: 'The text says "They are going to return home at 6 PM."',
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
            Reading: Going To (Future)
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

export default Re_03_03;
