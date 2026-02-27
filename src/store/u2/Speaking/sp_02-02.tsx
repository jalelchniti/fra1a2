// Unit 2 Lesson 2 - Speaking: Shopping Phrases
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Phrase {
  english: string;
  description: string;
}

const phrases: Phrase[] = [
  { english: "Combien cela coûte-t-il ?", description: "Demander le prix" },
  { english: "L’avez-vous dans une autre taille ?", description: "Demander une autre taille" },
  { english: "Puis-je essayer ceci ?", description: "Demander à utiliser la cabine d’essayage" },
  { english: "Cet article est-il en promotion ?", description: "Demander une remise" },
  { english: "Acceptez-vous les cartes de crédit ?", description: "Demander les moyens de paiement" },
  { english: "Puis-je avoir un reçu ?", description: "Demander une preuve d’achat" },
  { english: "Quelle est votre politique de retour ?", description: "Demander les retours" },
  { english: "Pouvez-vous m’aider à trouver... ?", description: "Demander de l’aide en magasin" },
  { english: "Ça vous va très bien !", description: "Faire un compliment" },
  { english: "Merci pour votre service !", description: "Exprimer sa reconnaissance" }
];

const SpeakingShoppingQuiz: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Expression orale : phrases pour faire du shopping</h1>
          <p className="text-gray-600">Unité 2 - Leçon d’expression orale 2</p>
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

          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Conseils de pratique :</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Répétez chaque phrase plusieurs fois</li>
              <li>• Utilisez ces phrases en situation réelle</li>
              <li>• Variez l’intonation pour gagner en naturel</li>
              <li>• Faites des jeux de rôle de situations d’achat</li>
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

export default SpeakingShoppingQuiz;
