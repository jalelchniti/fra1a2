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

const Sp_03_04 = () => {
  const navigate = useNavigate();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const prompts: SpeakingPrompt[] = [
    {
      id: 1,
      scenario: 'Your friend asks about your weekend plans',
      question: 'Say: "I am going to take a trip tomorrow."',
      modelAnswer: 'I am going to take a trip tomorrow. I am very excited!',
      tips: 'Use "I am going to + base verb" for future plans. Add emotion! Sound enthusiastic about your plans.'
    },
    {
      id: 2,
      scenario: 'Someone asks where you will go',
      question: 'Answer: "Where are you going to go?" - "I am going to go to the beach."',
      modelAnswer: 'I am going to go to the beach. By train. It is going to be wonderful!',
      tips: 'Use "are you going to + base verb?" for questions. Answer with full details about transportation and how you feel.'
    },
    {
      id: 3,
      scenario: 'Telling how you will travel',
      question: 'Say: "I am going to take the bus. It is going to cost 10 dinars."',
      modelAnswer: 'I am going to take the bus to the city. It is going to cost 10 dinars. It is going to be fast.',
      tips: 'Use "is/am going to" to describe future plans. Include specific details like cost and expected time.'
    },
    {
      id: 4,
      scenario: 'Inviting a friend to travel with you',
      question: 'Say: "Are you going to come with me?"',
      modelAnswer: 'Are you going to come with me? We are going to have fun! It is going to be great!',
      tips: 'Use yes/no questions with "are you going to". Encourage your friend. Sound positive and friendly.'
    },
    {
      id: 5,
      scenario: 'Describing departure time',
      question: 'Say: "I am going to leave at 8 AM."',
      modelAnswer: 'I am going to leave at 8 AM tomorrow. The train is going to arrive at 11 AM.',
      tips: 'Be specific about times. Use "am/is going to + base verb" consistently. Add expected arrival or other details.'
    },
    {
      id: 6,
      scenario: 'Planning what you will do',
      question: 'Say: "I am going to visit museums and parks."',
      modelAnswer: 'I am going to visit museums and parks. I am going to take many photos. It is going to be amazing!',
      tips: 'List multiple activities using "going to". Use enthusiasm in your voice. Connect activities with "and".'
    },
    {
      id: 7,
      scenario: 'Discussing return plans',
      question: 'Say: "I am going to return home on Sunday."',
      modelAnswer: 'I am going to return home on Sunday. I am going to take the evening train. It is going to be a long day!',
      tips: 'Discuss complete trip timeline. Use "going to" for all future actions. Show understanding of the full journey.'
    },
    {
      id: 8,
      scenario: 'Complete conversation about future trip',
      question: 'Practice: "I am going to travel tomorrow. By bus. To the mountains. I am going to walk and take photos."',
      modelAnswer: 'Friend: "What are you going to do tomorrow?" You: "I am going to travel to the mountains! I am going to take the bus. It is going to cost 12 dinars. I am going to walk and take photos! Are you going to come?" Friend: "Yes!"',
      tips: 'Practice complete conversation. Use "going to" in questions and answers. Sound excited! Vary sentence structure but keep using "going to" consistently.'
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
            Speaking: Planning a Trip (Future Plans)
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
            <li>✓ Read the scenario (future trip planning)</li>
            <li>✓ Try to answer using "am/is going to + base verb"</li>
            <li>✓ Click the speaker icon to hear the model answer</li>
            <li>✓ Repeat the answer, focusing on "going to" pronunciation</li>
            <li>✓ Move to the next prompt</li>
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
            <p className="text-gray-600">You can now talk about your future plans! Keep practicing!</p>
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

export default Sp_03_04;
