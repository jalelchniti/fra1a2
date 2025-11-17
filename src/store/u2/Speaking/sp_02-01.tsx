// Unit 2 Lesson 1 - Speaking: Asking for Directions
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Phrase {
  english: string;
  description: string;
}

const phrases: Phrase[] = [
  { english: "Excuse me, where is the bank?", description: "Polite way to ask for a location" },
  { english: "How do I get to the hospital?", description: "Asking for directions" },
  { english: "Could you tell me the way to...?", description: "Very polite request for directions" },
  { english: "Is the station far from here?", description: "Asking about distance" },
  { english: "Can you help me find Main Street?", description: "Asking for help finding a place" },
  { english: "Turn left at the traffic light.", description: "Giving directions" },
  { english: "Go straight ahead.", description: "Telling someone to continue forward" },
  { english: "It's next to the coffee shop.", description: "Describing location relative to landmarks" },
  { english: "Thank you for your help!", description: "Expressing gratitude" },
  { english: "I appreciate your assistance.", description: "Formal gratitude" }
];

const SpeakingDirectionsQuiz: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState<number[]>([]);

  const speak = (text: string) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handlePhraseComplete = () => {
    if (!completedPhrases.includes(currentPhrase)) {
      setCompletedPhrases([...completedPhrases, currentPhrase]);
    }
  };

  const handleNext = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
    }
  };

  const handlePrev = () => {
    if (currentPhrase > 0) {
      setCurrentPhrase(currentPhrase - 1);
    }
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Speaking: Asking for Directions</h1>
          <p className="text-gray-600">Unit 2 - Speaking Lesson 1</p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPhrase + 1) / phrases.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-gray-600 mt-2">
            Phrase {currentPhrase + 1} of {phrases.length}
          </p>
        </div>

        <motion.div
          key={currentPhrase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-lg p-6 mb-4">
              <p className="text-2xl font-bold text-blue-800">{phrases[currentPhrase].english}</p>
            </div>
            <p className="text-gray-600 italic">{phrases[currentPhrase].description}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => speak(phrases[currentPhrase].english)}
              disabled={isSpeaking}
              className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition"
            >
              {isSpeaking ? "🔊 Speaking..." : "🔊 Listen & Pronounce"}
            </button>

            <button
              onClick={handlePhraseComplete}
              className={`w-full px-6 py-3 font-semibold rounded-lg transition ${
                completedPhrases.includes(currentPhrase)
                  ? "bg-green-100 text-green-800 border-2 border-green-500"
                  : "bg-orange-100 text-orange-800 border-2 border-orange-500 hover:bg-orange-200"
              }`}
            >
              {completedPhrases.includes(currentPhrase) ? "✓ Practiced" : "Mark as Practiced"}
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Speaking Tips:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Listen to the pronunciation carefully</li>
              <li>• Repeat after hearing the phrase</li>
              <li>• Focus on correct stress and intonation</li>
              <li>• Record yourself and compare</li>
            </ul>
          </div>
        </motion.div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentPhrase === 0}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
          >
            ← Previous
          </button>
          <p className="text-center text-gray-600">
            Practiced: {completedPhrases.length} / {phrases.length}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPhrase === phrases.length - 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakingDirectionsQuiz;
