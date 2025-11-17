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

const Sp_03_03 = () => {
  const navigate = useNavigate();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const prompts: SpeakingPrompt[] = [
    {
      id: 1,
      scenario: 'Your friend asks about your trip yesterday',
      question: 'Say: "I traveled to the beach yesterday."',
      modelAnswer: 'I traveled to the beach yesterday. It was wonderful!',
      tips: 'Use simple past: traveled, went, took. Remember: "yesterday" = past tense. Add emotion!'
    },
    {
      id: 2,
      scenario: 'Describing how you traveled',
      question: 'Say: "I took the bus. I waited 20 minutes for the bus."',
      modelAnswer: 'I took the bus. It was fast. I waited 20 minutes for the bus.',
      tips: 'Use past tense verbs: took, waited, traveled. Describe the experience briefly.'
    },
    {
      id: 3,
      scenario: 'Someone asks about your journey',
      question: 'Answer: "How long was your journey?" - "It was 2 hours."',
      modelAnswer: 'It was 2 hours. The journey was comfortable. I enjoyed it.',
      tips: 'Past tense: "was", "were". Talk about duration. Share your feelings about the trip.'
    },
    {
      id: 4,
      scenario: 'Describing the past journey',
      question: 'Say: "The train was fast and safe."',
      modelAnswer: 'The train was fast and safe. I liked it. Other passengers were friendly.',
      tips: 'Describe using "was/were". Use past tense adjectives. Talk about other details.'
    },
    {
      id: 5,
      scenario: 'Talking about where you stopped',
      question: 'Say: "We stopped at 3 stations."',
      modelAnswer: 'We stopped at 3 stations. We arrived at noon.',
      tips: 'Use "stopped", "arrived" (past tense verbs). Be specific with numbers and times.'
    },
    {
      id: 6,
      scenario: 'Describing a problem during travel',
      question: 'Say: "The bus was crowded. I did not have a seat."',
      modelAnswer: 'The bus was crowded. I did not have a seat. But I was OK.',
      tips: 'Use negative past: "did not + verb". Stay calm when describing problems.'
    },
    {
      id: 7,
      scenario: 'Sharing what you did after traveling',
      question: 'Say: "I arrived at 5 PM. I walked to the hotel."',
      modelAnswer: 'I arrived at 5 PM. I walked to the hotel. I was tired but happy.',
      tips: 'Connect past events with "after". Use past tense. Show sequence of events.'
    },
    {
      id: 8,
      scenario: 'Complete conversation about your trip',
      question: 'Practice: "Yesterday I took the train. It was fast. I arrived at 11 AM."',
      modelAnswer: 'Friend: "Did you enjoy your trip?" You: "Yes! I took the train yesterday. It was fast and safe. I arrived at 11 AM. The journey was wonderful!"',
      tips: 'Practice full conversation. Answer questions in past tense. Use "yes/no" answers with details. Sound enthusiastic!'
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
            Speaking: Talking About Your Journey (Past)
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
            <li>✓ Read the scenario (past tense situations)</li>
            <li>✓ Try to answer using past tense verbs</li>
            <li>✓ Click the speaker icon to hear the model answer</li>
            <li>✓ Repeat aloud, paying attention to past tense pronunciation</li>
            <li>✓ Continue to practice all prompts</li>
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
            <p className="text-gray-600">You are getting better at using past tense! Keep practicing!</p>
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

export default Sp_03_03;
