// Unit 2 Lesson 1 - Speaking: Asking for Directions
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Phrase {
  english: string;
  description: string;
}

const phrases: Phrase[] = [
  { english: "Excusez-moi, où se trouve la banque ?", description: "Demander poliment un lieu" },
  { english: "Comment puis-je aller à l’hôpital ?", description: "Demander un itinéraire" },
  { english: "Pourriez-vous m’indiquer le chemin vers... ?", description: "Demande très polie de directions" },
  { english: "La gare est-elle loin d’ici ?", description: "Demander la distance" },
  { english: "Pouvez-vous m’aider à trouver la rue Principale ?", description: "Demander de l’aide pour trouver un endroit" },
  { english: "Tournez à gauche au feu tricolore.", description: "Donner une direction" },
  { english: "Allez tout droit.", description: "Dire de continuer tout droit" },
  { english: "C’est à côté du café.", description: "Décrire un emplacement par rapport à un repère" },
  { english: "Merci pour votre aide !", description: "Exprimer sa gratitude" },
  { english: "J’apprécie votre assistance.", description: "Gratitude plus formelle" }
];

const SpeakingDirectionsQuiz: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState<number[]>([]);

  const speak = (text: string) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Expression orale : demander son chemin</h1>
          <p className="text-gray-600">Unité 2 - Leçon d’expression orale 1</p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPhrase + 1) / phrases.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-gray-600 mt-2">
            Phrase {currentPhrase + 1} sur {phrases.length}
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
              {isSpeaking ? "🔊 Lecture..." : "🔊 Écouter et prononcer"}
            </button>

            <button
              onClick={handlePhraseComplete}
              className={`w-full px-6 py-3 font-semibold rounded-lg transition ${
                completedPhrases.includes(currentPhrase)
                  ? "bg-green-100 text-green-800 border-2 border-green-500"
                  : "bg-orange-100 text-orange-800 border-2 border-orange-500 hover:bg-orange-200"
              }`}
            >
              {completedPhrases.includes(currentPhrase) ? "✓ Pratiqué" : "Marquer comme pratiqué"}
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Conseils d’expression orale :</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Écoutez attentivement la prononciation</li>
              <li>• Répétez après avoir entendu la phrase</li>
              <li>• Travaillez l’accentuation et l’intonation</li>
              <li>• Enregistrez-vous et comparez</li>
            </ul>
          </div>
        </motion.div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentPhrase === 0}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
          >
            ← Précédent
          </button>
          <p className="text-center text-gray-600">
            Pratiqué : {completedPhrases.length} / {phrases.length}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPhrase === phrases.length - 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
          >
            Suivant →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakingDirectionsQuiz;
