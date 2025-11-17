// Unit 2 Lesson 3 - Currency & Payment Vocabulary
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const flashcards = [
  { sideA: "Dollar", sideB: "A unit of money used in many countries" },
  { sideA: "Cent", sideB: "A small unit of money, 100 cents = 1 dollar" },
  { sideA: "Money", sideB: "Paper or coins used to buy things" },
  { sideA: "Cash", sideB: "Paper money or coins (not credit card)" },
  { sideA: "Credit card", sideB: "A card used to pay for things and pay the bank later" },
  { sideA: "Change", sideB: "Money returned to you after payment" },
  { sideA: "Receipt", sideB: "A paper showing what you bought and how much you paid" },
  { sideA: "Return", sideB: "To bring something back to the store" },
  { sideA: "Refund", sideB: "Money given back to you by the store" },
  { sideA: "Payment", sideB: "The money you give for something" },
];

const CurrencyVocabularyQuiz: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Currency & Payment</h1>
          <p className="text-gray-600">Unit 2 - Lesson 3</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <motion.div
            onClick={handleFlip}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md aspect-video bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg cursor-pointer flex items-center justify-center text-white text-center p-8"
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

export default CurrencyVocabularyQuiz;
