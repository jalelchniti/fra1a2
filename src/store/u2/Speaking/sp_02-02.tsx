// Unit 2 Lesson 2 - Speaking: Shopping Phrases
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Phrase {
  english: string;
  description: string;
}

const phrases: Phrase[] = [
  { english: "How much does this cost?", description: "Asking for price" },
  { english: "Do you have this in a different size?", description: "Asking for another size" },
  { english: "Can I try this on?", description: "Asking for fitting room permission" },
  { english: "Is this on sale?", description: "Asking about discount" },
  { english: "Do you accept credit cards?", description: "Asking about payment methods" },
  { english: "Can I get a receipt?", description: "Asking for proof of purchase" },
  { english: "What's the return policy?", description: "Asking about returns" },
  { english: "Can you help me find...?", description: "Asking for shopping assistance" },
  { english: "That looks great on you!", description: "Compliment phrase" },
  { english: "Thank you for your service!", description: "Expressing appreciation" }
];

const SpeakingShoppingQuiz: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Speaking: Shopping Phrases</h1>
          <p className="text-gray-600">Unit 2 - Speaking Lesson 2</p>
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
            <div className="bg-orange-100 rounded-lg p-6 mb-4">
              <p className="text-2xl font-bold text-orange-800">{phrases[currentPhrase].english}</p>
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

          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Practice Tips:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Repeat each phrase several times</li>
              <li>• Try using these phrases in real conversations</li>
              <li>• Practice with different intonations</li>
              <li>• Role-play shopping scenarios</li>
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

export default SpeakingShoppingQuiz;
