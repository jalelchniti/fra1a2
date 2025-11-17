import { useState, useRef } from 'react';
import { ChevronLeft, Volume2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface SpeakingPrompt {
  id: number;
  scenario: string;
  question: string;
  modelAnswer: string;
  tips: string;
}

const Sp_03_02 = () => {
  const navigate = useNavigate();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const prompts: SpeakingPrompt[] = [
    {
      id: 1,
      scenario: 'You want to take a taxi',
      question: 'Say: "I want to go to the hotel."',
      modelAnswer: 'I want to go to the hotel. Can you help me?',
      tips: 'Start with "I want to go to..." State your destination clearly and politely.'
    },
    {
      id: 2,
      scenario: 'Asking the taxi driver about the price',
      question: 'Ask: "How much does it cost?"',
      modelAnswer: 'How much does it cost? Is it expensive?',
      tips: 'Use "How much does it cost?" for price. Sound curious, not worried.'
    },
    {
      id: 3,
      scenario: 'Getting on a bus',
      question: 'Say: "I want to take the bus to the market."',
      modelAnswer: 'I want to take the bus to the market. Where is the bus stop?',
      tips: 'Tell the bus driver your destination. Ask where the bus stop is if you need to.'
    },
    {
      id: 4,
      scenario: 'Asking which bus goes where',
      question: 'Ask: "Does this bus go to the train station?"',
      modelAnswer: 'Excuse me. Does this bus go to the train station? Or do I need another bus?',
      tips: 'Use polite "Excuse me". Ask yes/no questions about the bus destination.'
    },
    {
      id: 5,
      scenario: 'Confirming your payment',
      question: 'Say: "Is it 5 dinars?"',
      modelAnswer: 'Is it 5 dinars? OK. Here is the money.',
      tips: 'Confirm the price. Be ready to pay. Speak with confidence.'
    },
    {
      id: 6,
      scenario: 'Asking about the journey time',
      question: 'Ask: "How long is the journey?"',
      modelAnswer: 'How long is the journey? Is it fast?',
      tips: 'Use "How long...?" to ask about duration. Sound interested and friendly.'
    },
    {
      id: 7,
      scenario: 'Thanking the taxi driver',
      question: 'Say: "Thank you. The ride was comfortable."',
      modelAnswer: 'Thank you. The ride was comfortable. You are a good driver!',
      tips: 'Be polite and grateful. Compliment the driver. Speak warmly.'
    },
    {
      id: 8,
      scenario: 'Complete taxi conversation',
      question: 'Practice: "I want to go to... How much? How long? Thank you!"',
      modelAnswer: 'Driver: Hello! A: I want to go to the hotel. How much? Driver: It is 8 dinars. A: OK! How long? Driver: 20 minutes. A: Thank you!',
      tips: 'Practice smooth conversation. Take turns speaking. Use natural pauses between sentences.'
    }
  ];

  const speak = (text: string) => {
    if (isSpeakingRef.current) return;
    isSpeakingRef.current = true;
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentPromptIndex(0);
    setCompleted(false);
  };

  const currentPrompt = prompts[currentPromptIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/speaking')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Speaking: Taking a Taxi or Bus
          </h1>
          <div className="w-[100px]"></div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">How to Practice:</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Read the scenario and what you need to say</li>
            <li>✓ Try saying it in your own words first</li>
            <li>✓ Click the speaker icon to hear the model answer</li>
            <li>✓ Repeat it aloud, copying the pronunciation</li>
            <li>✓ Continue to the next prompt</li>
          </ul>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 font-semibold">
              Prompt {currentPromptIndex + 1} of {prompts.length}
            </p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPromptIndex + 1) / prompts.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Speaking Prompt Card */}
        {!completed ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromptIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                {/* Scenario */}
                <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 font-semibold mb-1">SCENARIO:</p>
                  <p className="text-lg text-gray-800 font-bold">{currentPrompt.scenario}</p>
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-3">Your Task:</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{currentPrompt.question}</p>
                </div>

                {/* Model Answer Section */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600 font-semibold">MODEL ANSWER:</p>
                    <button
                      onClick={() => speak(currentPrompt.modelAnswer)}
                      disabled={isSpeaking}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                    >
                      <Volume2 size={18} />
                      {isSpeaking ? 'Speaking...' : 'Listen'}
                    </button>
                  </div>
                  <p className="text-gray-800 text-lg font-semibold italic">{currentPrompt.modelAnswer}</p>
                </div>

                {/* Tips */}
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-600 font-semibold mb-1">TIPS:</p>
                  <p className="text-gray-700">{currentPrompt.tips}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center mb-8"
          >
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Excellent! 🎉</h2>
            <p className="text-gray-700 mb-4">You have completed all speaking prompts.</p>
            <p className="text-gray-600">Practice these phrases every time you take a taxi or bus!</p>
          </motion.div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!completed && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:shadow-lg hover:bg-green-600 transition"
            >
              {currentPromptIndex === prompts.length - 1 ? 'Finish' : 'Next Prompt'}
            </button>
          )}

          {completed && (
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:shadow-lg hover:bg-green-600 transition"
            >
              Practice Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sp_03_02;
