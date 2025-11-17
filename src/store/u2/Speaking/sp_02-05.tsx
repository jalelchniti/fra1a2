// src/store/u2/Speaking/sp_02-05.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PresentProgressiveSpeakingPractice = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<boolean[]>(new Array(10).fill(false));

  const flashcards = [
    {
      front: 'Say what you are doing right now.',
      back: 'Example: "I am studying English right now." or "I am learning Present Progressive."',
      icon: '📚',
      category: 'current action'
    },
    {
      front: 'Say what someone else is doing.',
      back: 'Example: "She is shopping at the mall." or "He is waiting for the bus."',
      icon: '👤',
      category: 'current action'
    },
    {
      front: 'Describe multiple people doing something.',
      back: 'Example: "They are eating lunch together." or "We are having a conversation."',
      icon: '👥',
      category: 'current action'
    },
    {
      front: 'Complain about a current situation.',
      back: 'Example: "I am complaining about the price because it is too expensive." or "She is complaining about the service."',
      icon: '😠',
      category: 'complaint'
    },
    {
      front: 'Ask someone what they are doing right now.',
      back: 'Example: "What are you doing right now?" or "Are you studying English?"',
      icon: '❓',
      category: 'question'
    },
    {
      front: 'Say what you are NOT doing right now.',
      back: 'Example: "I am not working today." or "She is not sleeping; she is studying."',
      icon: '❌',
      category: 'negative'
    },
    {
      front: 'Complain about what someone is doing.',
      back: 'Example: "He is being late, and I am waiting!" or "They are making too much noise."',
      icon: '😤',
      category: 'complaint'
    },
    {
      front: 'Describe an action that is happening around you.',
      back: 'Example: "A bird is flying in the sky." or "Children are playing in the park."',
      icon: '🌍',
      category: 'observation'
    },
    {
      front: 'Say what you are doing and express how you feel.',
      back: 'Example: "I am studying, and I am feeling happy." or "She is complaining, and he is listening."',
      icon: '😊',
      category: 'emotion'
    },
    {
      front: 'Describe a problem happening right now.',
      back: 'Example: "The bus is being late, and I am missing my appointment." or "The food is getting cold."',
      icon: '⚠️',
      category: 'problem'
    },
  ];

  const markCardAsPracticed = () => {
    const newProgress = [...progress];
    newProgress[currentCard] = true;
    setProgress(newProgress);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => {
      const newFlipped = !prev;
      if (!prev) markCardAsPracticed();
      return newFlipped;
    });
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const completedCount = progress.filter(Boolean).length;
  const completionPercentage = Math.round((completedCount / flashcards.length) * 100);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-xl min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-orange-700 mb-2 text-center tracking-tight">
        Present Progressive Speaking Practice
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Practice speaking about current actions and complaints!
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Practice Progress</span>
          <span className="text-sm font-semibold text-orange-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          {completedCount} of {flashcards.length} phrases practiced
        </p>
      </div>

      {/* Flashcard */}
      <motion.div
        onClick={handleFlip}
        className="mb-8 cursor-pointer w-full max-w-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`min-h-64 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center ${
            isFlipped
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
              : 'bg-gradient-to-br from-orange-500 to-red-600'
          }`}
        >
          <div className="text-center">
            <p className="text-5xl mb-4">{flashcards[currentCard].icon}</p>
            <p className="text-white text-xl font-bold leading-relaxed">
              {isFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
            </p>
            <p className="text-white/70 text-sm mt-6">
              {isFlipped ? 'Click for prompt' : 'Click to see example'}
            </p>
            {isFlipped && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(flashcards[currentCard].back);
                }}
                className="mt-4 flex items-center gap-2 mx-auto bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Volume2 size={18} />
                <span className="text-sm">Listen</span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Card Counter and Category */}
      <div className="flex justify-between items-center w-full max-w-md mb-6 text-center">
        <span className="text-sm font-semibold text-gray-700">
          Card {currentCard + 1} of {flashcards.length}
        </span>
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {flashcards[currentCard].category}
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 w-full max-w-md mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFlip}
          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          {isFlipped ? '← Prompt' : 'Example →'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Next
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Practice Status */}
      {progress[currentCard] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6 text-green-600 font-semibold"
        >
          <Check size={20} />
          <span>You've practiced this one!</span>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border-l-4 border-orange-500">
        <p className="text-sm text-gray-700 mb-2">
          <strong>📝 How to Practice:</strong>
        </p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>✓ Read the prompt and think about what to say</li>
          <li>✓ Click to reveal the example answer</li>
          <li>✓ Repeat the example out loud 3 times</li>
          <li>✓ Make up your own version using Present Progressive</li>
        </ul>
      </div>
    </div>
  );
};

export default PresentProgressiveSpeakingPractice;
