// Unit 2 Lesson 2 - Directions & Landmarks Vocabulary
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const flashcards = [
  { sideA: "Left", sideB: "The opposite direction of right" },
  { sideA: "Right", sideB: "The opposite direction of left" },
  { sideA: "Straight", sideB: "Forward in a direct line, not turning" },
  { sideA: "Corner", sideB: "Where two streets meet" },
  { sideA: "Street", sideB: "A public road in a town or city" },
  { sideA: "Avenue", sideB: "A wide street in a town or city" },
  { sideA: "Building", sideB: "A large structure with walls and a roof" },
  { sideA: "Landmark", sideB: "A well-known place or object that helps you find your way" },
  { sideA: "Hospital", sideB: "A place where doctors help sick people" },
  { sideA: "Police station", sideB: "A place where police officers work" },
];

const DirectionsVocabularyQuiz: React.FC = () => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Directions & Landmarks</h1>
          <p className="text-gray-600">Unit 2 - Lesson 2</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <motion.div
            onClick={handleFlip}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md aspect-video bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg cursor-pointer flex items-center justify-center text-white text-center p-8"
          >
            <motion.div
              key={isFlipped ? "back" : "front"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-3xl font-bold"
            >
              {isFlipped ? flashcards[currentCard].sideB : flashcards[currentCard].sideA}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={handlePrev}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            ← Previous
          </button>
          <button
            onClick={() => speak(isFlipped ? flashcards[currentCard].sideB : flashcards[currentCard].sideA)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            🔊 Speak
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Next →
          </button>
        </div>

        <div className="flex items-center justify-center gap-4">
          <input
            type="checkbox"
            checked={isTtsEnabled}
            onChange={(e) => setIsTtsEnabled(e.target.checked)}
            id="tts-toggle"
            className="w-5 h-5 cursor-pointer"
          />
          <label htmlFor="tts-toggle" className="text-gray-700 cursor-pointer">
            Enable Text-to-Speech
          </label>
        </div>

        <div className="text-center mt-8 text-gray-500">
          Card {currentCard + 1} of {flashcards.length}
        </div>
      </div>
    </motion.div>
  );
};

export default DirectionsVocabularyQuiz;
