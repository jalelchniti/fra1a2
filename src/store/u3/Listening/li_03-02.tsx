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

const Li_03_02 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const transcript = `
    PAST TRAVEL CONVERSATION

    A: Hi Fatima! How was your bus trip yesterday?
    B: It was great! I went to the beach.
    A: How long was the journey?
    B: About 2 hours. The bus was fast and comfortable.
    A: Did you wait long for the bus?
    B: No, I only waited 10 minutes at the station.
    A: What did you do at the beach?
    B: I walked, swam, and took many photos. It was wonderful!
    A: Did you come back yesterday?
    B: Yes, I took the evening bus. I arrived home at 8 PM.
    A: That sounds amazing!
  `;

  const questions: Question[] = [
    {
      id: 1,
      question: 'Where did Fatima go yesterday?',
      options: ['To the market', 'To the beach', 'To the park', 'To the train station'],
      correct: 1,
      explanation: 'Fatima says: "I went to the beach."'
    },
    {
      id: 2,
      question: 'How long was the bus journey?',
      options: ['1 hour', '2 hours', '3 hours', '4 hours'],
      correct: 1,
      explanation: 'Fatima says: "About 2 hours."'
    },
    {
      id: 3,
      question: 'How was the bus?',
      options: ['Slow and uncomfortable', 'Fast and uncomfortable', 'Slow and comfortable', 'Fast and comfortable'],
      correct: 3,
      explanation: 'Fatima says: "The bus was fast and comfortable."'
    },
    {
      id: 4,
      question: 'How long did Fatima wait for the bus?',
      options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'],
      correct: 1,
      explanation: 'Fatima says: "I only waited 10 minutes at the station."'
    },
    {
      id: 5,
      question: 'What did Fatima NOT do at the beach?',
      options: ['Walk', 'Swim', 'Take photos', 'Play football'],
      correct: 3,
      explanation: 'Fatima says: "I walked, swam, and took many photos." She did not mention playing football.'
    },
    {
      id: 6,
      question: 'When did Fatima come back?',
      options: ['In the morning', 'In the afternoon', 'In the evening', 'At night'],
      correct: 2,
      explanation: 'Fatima says: "I took the evening bus."'
    },
    {
      id: 7,
      question: 'What time did Fatima arrive home?',
      options: ['6 PM', '7 PM', '8 PM', '9 PM'],
      correct: 2,
      explanation: 'Fatima says: "I arrived home at 8 PM."'
    },
    {
      id: 8,
      question: 'How does Fatima feel about the trip?',
      options: ['Sad', 'Tired', 'Wonderful/Happy', 'Angry'],
      correct: 2,
      explanation: 'Fatima says: "It was wonderful!" showing she had a great time.'
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
            Listening: Past Travel Conversation
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

export default Li_03_02;
