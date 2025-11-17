import { useState, useRef } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Volume2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Li_03_03 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const transcript = `
    FUTURE TRAVEL PLANS

    A: Omar, I hear you are going to travel soon!
    B: Yes! I am going to take a trip next weekend.
    A: Where are you going to go?
    B: I am going to go to the mountains. It is going to be my first time.
    A: How are you going to travel?
    B: I am going to take the train. It is going to depart at 8 AM.
    A: How long is the journey going to be?
    B: It is going to be about 3 hours. Then I am going to take a taxi to my hotel.
    A: What are you going to do in the mountains?
    B: I am going to walk, take photos, and enjoy the nature. It is going to be amazing!
    A: Are you going to return next weekend?
    B: Yes, I am going to return on Sunday evening.
  `;

  const questions: Question[] = [
    {
      id: 1,
      question: 'When is Omar going to travel?',
      options: ['This week', 'Next weekend', 'Next month', 'Next year'],
      correct: 1,
      explanation: 'Omar says: "I am going to take a trip next weekend."'
    },
    {
      id: 2,
      question: 'Where is Omar going to go?',
      options: ['To the beach', 'To the city', 'To the mountains', 'To the park'],
      correct: 2,
      explanation: 'Omar says: "I am going to go to the mountains."'
    },
    {
      id: 3,
      question: 'Is this Omar\'s first time going there?',
      options: ['Yes, it is his first time', 'No, he has been before', 'Maybe', 'He does not know'],
      correct: 0,
      explanation: 'Omar says: "It is going to be my first time."'
    },
    {
      id: 4,
      question: 'How is Omar going to travel?',
      options: ['By bus', 'By car', 'By train', 'By plane'],
      correct: 2,
      explanation: 'Omar says: "I am going to take the train."'
    },
    {
      id: 5,
      question: 'What time is the train going to depart?',
      options: ['6 AM', '7 AM', '8 AM', '9 AM'],
      correct: 2,
      explanation: 'Omar says: "It is going to depart at 8 AM."'
    },
    {
      id: 6,
      question: 'How long is the train journey going to be?',
      options: ['1 hour', '2 hours', '3 hours', '4 hours'],
      correct: 2,
      explanation: 'Omar says: "It is going to be about 3 hours."'
    },
    {
      id: 7,
      question: 'What is Omar going to do after arriving?',
      options: ['Walk to the hotel', 'Take a taxi', 'Take a bus', 'Wait at the station'],
      correct: 1,
      explanation: 'Omar says: "I am going to take a taxi to my hotel."'
    },
    {
      id: 8,
      question: 'What is Omar NOT going to do in the mountains?',
      options: ['Walk', 'Take photos', 'Swim', 'Enjoy nature'],
      correct: 2,
      explanation: 'Omar says: "I am going to walk, take photos, and enjoy the nature." Swimming is not mentioned.'
    }
  ];

  const speakWithPauses = () => {
    if (isSpeakingRef.current) return;
    isSpeakingRef.current = true;
    setIsSpeaking(true);

    // Extract meaningful lines (remove empty lines and header)
    const lines = transcript
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.match(/^[A-Z\s]+$/)); // Remove empty and all-caps headers

    let currentIndex = 0;

    const playNextLine = () => {
      if (currentIndex >= lines.length) {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        return;
      }

      const line = lines[currentIndex];
      const utterance = new SpeechSynthesisUtterance(line);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;

      utterance.onend = () => {
        currentIndex++;
        // 5-second pause before next line
        setTimeout(playNextLine, 5000);
      };

      window.speechSynthesis.speak(utterance);
    };

    playNextLine();
  };

  const renderTranscriptWithColors = () => {
    const lines = transcript.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-2"></div>;

      if (trimmed.startsWith('A:')) {
        return (
          <p key={index} className="text-blue-600 font-semibold">
            {trimmed}
          </p>
        );
      } else if (trimmed.startsWith('B:')) {
        return (
          <p key={index} className="text-green-600 font-semibold">
            {trimmed}
          </p>
        );
      } else {
        return (
          <p key={index} className="text-gray-800 font-bold">
            {trimmed}
          </p>
        );
      }
    });
  };

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
            onClick={() => navigate('/listening')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Listening: Future Travel Plans
          </h1>
          <div className="w-[100px]"></div>
        </div>

        {/* Transcript Box */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Listening Transcript:</h2>
            <div className="flex gap-2">
              <button
                onClick={speakWithPauses}
                disabled={isSpeaking}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                <Volume2 size={18} />
                {isSpeaking ? 'Playing...' : 'Play Audio'}
              </button>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                {showTranscript ? <EyeOff size={18} /> : <Eye size={18} />}
                {showTranscript ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {showTranscript && (
            <div className="text-gray-700 leading-relaxed space-y-2">
              {renderTranscriptWithColors()}
            </div>
          )}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Li_03_03;
