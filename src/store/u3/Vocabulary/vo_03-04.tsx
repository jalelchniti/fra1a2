import { useState, useRef } from 'react';
import { Volume2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fr } from '../../../../locales/fr';

interface FlashCard {
  sideA: string;
  sideB: string;
}

const Vo_03_04 = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isSpeakingRef = useRef(false);

  const cards: FlashCard[] = [
    { sideA: fr.by_train_sideA, sideB: fr.by_train_sideB },
    { sideA: fr.by_bus_sideA, sideB: fr.by_bus_sideB },
    { sideA: fr.by_car_sideA, sideB: fr.by_car_sideB },
    { sideA: fr.by_taxi_sideA, sideB: fr.by_taxi_sideB },
    { sideA: fr.on_foot_sideA, sideB: fr.on_foot_sideB },
    { sideA: fr.in_the_car_sideA, sideB: fr.in_the_car_sideB },
    { sideA: fr.on_the_bus_sideA, sideB: fr.on_the_bus_sideB },
    { sideA: fr.train_station_sideA, sideB: fr.train_station_sideB },
  ];

  // Load voices
  const loadVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
  };

  window.speechSynthesis.onvoiceschanged = loadVoices;

  const speak = (text: string, cardIndex: number) => {
    if (!isTtsEnabled || isSpeakingRef.current) return;

    // Only speak side B (definition)
    if (cardIndex === 0) return;

    isSpeakingRef.current = true;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    const voice = voices.find(v => v.lang === 'en-US') || voices[0];
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/vocabulary')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition"
          >
            <ChevronLeft size={20} />
            {fr.back_button}
          </button>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {fr.transport_phrases_title}
          </h1>
          <div className="w-[100px]"></div>
        </div>

        {/* Flashcard Container */}
        <div className="flex justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => {
                  setIsFlipped(!isFlipped);
                  if (!isFlipped && currentCard) {
                    speak(currentCard.sideB, 1);
                  }
                }}
                className="w-80 h-64 bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center cursor-pointer hover:shadow-3xl transition transform hover:scale-105"
              >
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isFlipped ? 'back' : 'front'}
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: -90 }}
                      transition={{ duration: 0.3 }}
                    >
                      {!isFlipped ? (
                        <div>
                          <p className="text-sm text-gray-500 mb-4">{fr.click_to_reveal}</p>
                          <p className="text-4xl font-bold text-blue-600">{currentCard.sideA}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {currentCard.sideB}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speak(currentCard.sideB, 1);
                            }}
                            className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                          >
                            <Volume2 size={18} />
                            {fr.listen}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card Counter */}
        <div className="text-center mb-8">
          <p className="text-gray-700 font-semibold">
            {fr.card} {currentCardIndex + 1} {fr.of} {cards.length}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={20} />
            {fr.previous}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:shadow-lg transition"
          >
            <RotateCcw size={20} />
            {fr.reset}
          </button>
          <button
            onClick={handleNext}
            disabled={currentCardIndex === cards.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {fr.next}
            <ChevronRight size={20} />
          </button>
        </div>

        {/* TTS Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsTtsEnabled(!isTtsEnabled)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              isTtsEnabled
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            {isTtsEnabled ? fr.sound_on : fr.sound_off}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vo_03_04;