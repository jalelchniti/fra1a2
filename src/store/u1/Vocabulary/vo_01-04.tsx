import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fr } from '../../../locales/fr';

const flashcards = [
  { id: 1, image: 'table.png', word: fr.table_word },
  { id: 2, image: 'chair.png', word: fr.chair_word },
  { id: 3, image: 'desk.png', word: fr.desk_word },
  { id: 4, image: 'door.png', word: fr.door_word },
  { id: 5, image: 'window.png', word: fr.window_word },
  { id: 6, image: 'bed.png', word: fr.bed_word },
  { id: 7, image: 'lamp.png', word: fr.lamp_word },
  { id: 8, image: 'book.png', word: fr.book_word },
];

const FlashcardQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isFlipped) {
      const utterance = new SpeechSynthesisUtterance(flashcards[currentIndex].word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }, [isFlipped, currentIndex]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReplay = () => {
    const utterance = new SpeechSynthesisUtterance(flashcards[currentIndex].word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full h-[67vh] flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">{fr.classroom_objects_flashcards_title}</h2>
      <div className="flex-1 w-full max-w-xl bg-white p-6 rounded-xl shadow-lg flex items-center justify-center">
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
            <img
              src={`/assets/images/${flashcards[currentIndex].image}`}
              alt={flashcards[currentIndex].word}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <span className="text-4xl font-bold text-indigo-700 flex items-center justify-center h-full">
              {flashcards[currentIndex].word}
            </span>
          </div>
        </motion.div>
      </div>
      <div className="flex justify-between w-full max-w-xl mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-all duration-300"
        >
          {fr.previous}
        </button>
        <button
          onClick={handleFlip}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-all duration-300"
        >
          {isFlipped ? fr.show_image : fr.show_word}
        </button>
        <button
          onClick={handleReplay}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-all duration-300"
        >
          {fr.replay_sound}
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-all duration-300"
        >
          {fr.next}
        </button>
      </div>
    </div>
  );
};

export default FlashcardQuiz;