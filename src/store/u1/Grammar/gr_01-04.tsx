import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fr } from '../../../locales/fr';

interface Flashcard {
  id: number;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: string;
}

const flashcards: Flashcard[] = [
  { id: 1, question: fr.verb_to_be_q1, hint: fr.hint_thumbs_up, options: [fr.yes_she_is, fr.no_she_isnt], correctAnswer: fr.yes_she_is },
  { id: 2, question: fr.gr_q_are_they_students, hint: fr.hint_thumbs_down, options: [fr.yes_they_are, fr.no_they_arent], correctAnswer: fr.no_they_arent },
  { id: 3, question: fr.gr_q_am_i_late, hint: fr.hint_thumbs_down, options: [fr.yes_you_are, fr.no_you_arent], correctAnswer: fr.no_you_arent },
  { id: 4, question: fr.gr_q_is_he_from_london, hint: fr.hint_thumbs_up, options: [fr.yes_he_is, fr.no_he_isnt], correctAnswer: fr.yes_he_is },
  { id: 5, question: fr.gr_q_are_we_at_park, hint: fr.hint_thumbs_up, options: [fr.yes_we_are, fr.no_we_arent], correctAnswer: fr.yes_we_are },
  { id: 6, question: fr.gr_q_is_it_sunny, hint: fr.hint_thumbs_up, options: [fr.yes_it_is, fr.no_it_isnt], correctAnswer: fr.yes_it_is },
  { id: 7, question: fr.gr_q_are_you_doctor, hint: fr.hint_thumbs_down, options: [fr.yes_i_am, fr.no_im_not], correctAnswer: fr.no_im_not },
  { id: 8, question: fr.gr_q_is_she_tall, hint: fr.hint_thumbs_up, options: [fr.yes_she_is, fr.no_she_isnt], correctAnswer: fr.yes_she_is },
  { id: 9, question: fr.gr_q_are_they_from_brazil, hint: fr.hint_thumbs_down, options: [fr.yes_they_are, fr.no_they_arent], correctAnswer: fr.no_they_arent },
  { id: 10, question: fr.gr_q_am_i_right_room, hint: fr.hint_thumbs_up, options: [fr.yes_you_are, fr.no_you_arent], correctAnswer: fr.yes_you_are },
];

const FlashcardQuiz: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const isSpeakingRef = useRef(false);

  const speak = React.useCallback((text: string) => {
    if (!isTtsEnabled || isSpeakingRef.current || !window.speechSynthesis) return;
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    const englishVoice = voices.find((voice) => voice.lang === "en-US") || voices[0];
    if (englishVoice) utterance.voice = englishVoice;
    utterance.onend = () => (isSpeakingRef.current = false);
    window.speechSynthesis.speak(utterance);
  }, [isTtsEnabled, voices]);

  React.useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    if (typeof window !== "undefined" && "speechSynthesis" in window && isTtsEnabled) {
      const timer = setTimeout(() => speak(flashcards[0].question), 500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [isTtsEnabled, speak]);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    if (newFlipped) speak(flashcards[currentCard].correctAnswer);
  };

  const handleNext = () => {
    setIsFlipped(false);
    const newCard = (currentCard + 1) % flashcards.length;
    setCurrentCard(newCard);
    speak(flashcards[newCard].question);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    const newCard = (currentCard - 1 + flashcards.length) % flashcards.length;
    setCurrentCard(newCard);
    speak(flashcards[newCard].question);
  };

  const handleRepeat = () => {
    if (isFlipped) speak(flashcards[currentCard].correctAnswer);
    else speak(flashcards[currentCard].question);
  };

  const toggleTts = () => {
    setIsTtsEnabled((prev) => !prev);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center tracking-tight">
        {fr.verb_to_be_flashcards_title}
      </h1>

      {/* Flashcard */}
      <motion.div
        className="relative w-[460px] h-[288px] mx-auto cursor-pointer"
        onClick={handleFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Side A: Question + Hint */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-3xl font-bold text-indigo-600 tracking-wide text-center">
            {flashcards[currentCard].question}
          </p>
          <p className="text-xl text-gray-600 mt-4">{fr.hint}: {flashcards[currentCard].hint}</p>
        </motion.div>

        {/* Side B: Correct Answer Only */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl shadow-lg border border-indigo-200 flex items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-2xl font-medium text-gray-800 text-center">
            {flashcards[currentCard].correctAnswer}
          </p>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 max-w-md mx-auto w-full">
        <motion.button
          onClick={handlePrev}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
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
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {fr.next}
        </motion.button>
      </div>

      {/* Instructions and TTS Controls */}
      <div className="text-center mt-8">
        <p className="text-gray-600 text-lg italic mb-4">
          {fr.click_card_to_flip_hear_question_answer}
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={toggleTts}
            className={`px-4 py-2 rounded-full shadow-md transition-all duration-300 ${
              isTtsEnabled ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isTtsEnabled ? fr.turn_off_sound : fr.turn_on_sound}
          </motion.button>
          <motion.button
            onClick={handleRepeat}
            className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
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
