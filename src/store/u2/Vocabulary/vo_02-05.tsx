// src/store/u2/Vocabulary/vo_02-05.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const flashcards = [
  { sideA: "I am studying English.", sideB: "Right now, at this moment, I am learning English." },
  { sideA: "She is shopping.", sideB: "At this moment, she is buying things at the store." },
  { sideA: "They are eating lunch.", sideB: "Right now, they are having their meal together." },
  { sideA: "He is complaining about the price.", sideB: "He is not happy about how much it costs." },
  { sideA: "We are waiting for the bus.", sideB: "At this moment, we are standing and waiting." },
  { sideA: "You are asking questions.", sideB: "Right now, you are requesting information." },
  { sideA: "I am complaining about the weather.", sideB: "I am unhappy and expressing it about the current weather." },
  { sideA: "She is taking a break.", sideB: "Right now, she is stopping work and resting." },
  { sideA: "They are talking to each other.", sideB: "At this moment, they are having a conversation." },
  { sideA: "He is complaining about the service.", sideB: "He is not satisfied with how he is being served." },
  { sideA: "We are looking for directions.", sideB: "Right now, we are trying to find the right way." },
  { sideA: "You are listening to me.", sideB: "At this moment, you are paying attention to what I say." },
];

const PresentProgressiveVocabulary: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    if (!isTtsEnabled || isSpeakingRef.current) return;
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    const englishVoice = voices.find((voice) => voice.lang === "en-US") || voices[0];
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    utterance.onend = () => {
      isSpeakingRef.current = false;
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);

    if (!newFlipped) {
      speak(flashcards[currentCard].sideA);
    } else {
      speak(flashcards[currentCard].sideB);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    const newCard = (currentCard + 1) % flashcards.length;
    setCurrentCard(newCard);
    speak(flashcards[newCard].sideA);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    const newCard = (currentCard - 1 + flashcards.length) % flashcards.length;
    setCurrentCard(newCard);
    speak(flashcards[newCard].sideA);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-green-100 to-emerald-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-700 mb-2">
            Present Progressive Vocabulary
          </h1>
          <p className="text-lg text-gray-600">
            Learn words and phrases for current actions and complaints
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Card {currentCard + 1} of {flashcards.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsTtsEnabled(!isTtsEnabled)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isTtsEnabled
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              🔊 TTS {isTtsEnabled ? "On" : "Off"}
            </button>
          </div>
        </div>

        {/* Flashcard */}
        <motion.div
          onClick={handleFlip}
          className="mb-8 cursor-pointer perspective"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={`h-64 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center transition-all duration-300 ${
              isFlipped
                ? "bg-gradient-to-br from-blue-500 to-blue-600"
                : "bg-gradient-to-br from-emerald-500 to-green-600"
            }`}
          >
            <p className="text-white text-2xl font-bold text-center">
              {isFlipped ? flashcards[currentCard].sideB : flashcards[currentCard].sideA}
            </p>
            <p className="text-white/70 text-sm mt-4">
              {isFlipped ? "Meaning" : "Click to see meaning"}
            </p>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            ← Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFlip}
            className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            {isFlipped ? "Hide" : "Reveal"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Next →
          </motion.button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">
            <strong>💡 Tip:</strong> These are actions happening RIGHT NOW. Present Progressive uses "am/is/are + -ing"
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PresentProgressiveVocabulary;
