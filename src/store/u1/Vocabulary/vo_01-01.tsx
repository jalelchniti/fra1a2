// src/store/Vocabulary/01-01-01.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fr } from '../../../locales/fr';

const flashcards = [
  { sideA: fr.flashcard_hello_how_are_you_a, sideB: fr.flashcard_hello_how_are_you_b },
  { sideA: fr.flashcard_can_you_help_me_a, sideB: fr.flashcard_can_you_help_me_b },
  { sideA: fr.flashcard_where_is_bathroom_a, sideB: fr.flashcard_where_is_bathroom_b },
  { sideA: fr.flashcard_i_dont_understand_a, sideB: fr.flashcard_i_dont_understand_b },
  { sideA: fr.flashcard_excuse_me_where_is_a, sideB: fr.flashcard_excuse_me_where_is_b },
  { sideA: fr.flashcard_how_much_cost_a, sideB: fr.flashcard_how_much_cost_b },
  { sideA: fr.flashcard_thank_you_a, sideB: fr.flashcard_thank_you_b },
  { sideA: fr.flashcard_im_sorry_new_a, sideB: fr.flashcard_im_sorry_new_b },
  { sideA: fr.flashcard_can_i_have_a, sideB: fr.flashcard_can_i_have_b },
  { sideA: fr.flashcard_what_time_is_it_a, sideB: fr.flashcard_what_time_is_it_b },
  { sideA: fr.flashcard_see_you_later_a, sideB: fr.flashcard_see_you_later_b },
  { sideA: fr.flashcard_i_need_help_a, sideB: fr.flashcard_i_need_help_b },
];

const FlashcardQuiz: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true); // TTS toggle state
  const isSpeakingRef = useRef(false); // Ref to prevent duplicate TTS calls

  // Load voices when the component mounts or when voices change
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

  // Function to speak the text, with deduplication and TTS toggle check
  const speak = (text: string) => {
    if (!isTtsEnabled || isSpeakingRef.current) return; // Exit if TTS is off or already speaking
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    const englishVoice = voices.find((voice) => voice.lang === "en-US") || voices[0];
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    utterance.onend = () => {
      isSpeakingRef.current = false; // Reset after speech ends
    };
    window.speechSynthesis.speak(utterance);
  };

  // Handle flip with TTS for both sides
  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);

    // Speak Side A when showing front, Side B when showing back
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

    // Speak Side A when moving to new card
    speak(flashcards[newCard].sideA);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    const newCard = (currentCard - 1 + flashcards.length) % flashcards.length;
    setCurrentCard(newCard);

    // Speak Side A when moving to new card
    speak(flashcards[newCard].sideA);
  };

  // Repeat the current TTS based on flip state
  const handleRepeat = () => {
    if (!isFlipped) {
      speak(flashcards[currentCard].sideA);
    } else {
      speak(flashcards[currentCard].sideB);
    }
  };

  // Toggle TTS on/off
  const toggleTts = () => {
    setIsTtsEnabled((prev) => !prev);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech when disabling
      isSpeakingRef.current = false;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4 text-center tracking-tight">
        {fr.survival_phrases_title}
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        {fr.survival_phrases_description}
      </p>

      {/* Flashcard */}
      <motion.div
        className="relative w-[460px] h-[288px] mx-auto cursor-pointer"
        onClick={handleFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Side A: Prompt */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-3xl font-bold text-indigo-600 tracking-wide text-center p-6">
            {flashcards[currentCard].sideA}
          </p>
        </motion.div>

        {/* Side B: Response */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl shadow-lg border border-indigo-200 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-2xl text-gray-800 text-center p-6 font-medium leading-relaxed">
            {flashcards[currentCard].sideB}
          </p>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 max-w-md mx-auto w-full">
        <motion.button
          onClick={handlePrev}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {fr.previous}
        </motion.button>
        <p className="text-xl text-gray-600 font-semibold flex items-center">
          {fr.card} {currentCard + 1} {fr.of} {flashcards.length}
        </p>
        <motion.button
          onClick={handleNext}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {fr.next}
        </motion.button>
      </div>

      {/* Instructions and TTS Controls */}
      <div className="text-center mt-8">
        <p className="text-gray-600 text-lg italic mb-4">
          {fr.click_card_to_flip}
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={toggleTts}
            className={`px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg ${
              isTtsEnabled ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isTtsEnabled ? fr.deactivate_sound : fr.activate_sound}
          </motion.button>
          <motion.button
            onClick={handleRepeat}
            className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {fr.repeat_sound}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardQuiz;