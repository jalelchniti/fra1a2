// Unit 2 Lesson 4 - Speaking: Role Play Scenarios
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Scenario {
  title: string;
  situation: string;
  rolePlay: string;
  tips: string[];
}

const scenarios: Scenario[] = [
  {
    title: "Faire du shopping dans un magasin de vêtements",
    situation: "Vous voulez acheter une nouvelle chemise pour le travail",
    rolePlay: "Vous êtes le client. Demandez les tailles, les prix, les remises. Demandez une cabine d’essayage.",
    tips: ["Demandez « Combien ça coûte ? »", "Dites « Avez-vous une taille plus petite ? »", "Demandez « Y a-t-il une remise ? »"]
  },
  {
    title: "Demander son chemin",
    situation: "Vous êtes perdu et cherchez une banque",
    rolePlay: "Arrêtez un passant et demandez poliment votre chemin. Demandez des repères et la distance.",
    tips: ["Commencez par « Excusez-moi »", "Demandez « Comment aller à … »", "Demandez « Est-ce loin ? »"]
  },
  {
    title: "Faire un retour",
    situation: "Vous avez acheté une chemise qui ne va pas",
    rolePlay: "Allez au magasin et expliquez le problème. Demandez la politique de retour et le remboursement.",
    tips: ["Apportez votre reçu", "Expliquez poliment le problème", "Demandez le délai de remboursement"]
  },
  {
    title: "Payer en caisse",
    situation: "Vous achetez des articles au supermarché",
    rolePlay: "Discutez avec le caissier, demandez les prix, les moyens de paiement et demandez un reçu.",
    tips: ["Demandez « Combien au total ? »", "Dites « Puis-je payer par carte ? »", "Demandez un reçu"]
  }
];

const SpeakingRolePlayQuiz: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const handleComplete = () => {
    if (!completedScenarios.includes(currentScenario)) {
      setCompletedScenarios([...completedScenarios, currentScenario]);
    }
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    }
  };

  const handlePrev = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1);
    }
  };

  const scenario = scenarios[currentScenario];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Expression orale : jeux de rôle</h1>
          <p className="text-gray-600">Unité 2 - Leçon d’expression orale 4</p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-gray-600 mt-2">
            Scénario {currentScenario + 1} sur {scenarios.length}
          </p>
        </div>

        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">{scenario.title}</h2>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Situation :</p>
              <p className="text-gray-700">{scenario.situation}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Votre rôle :</p>
              <p className="text-gray-700">{scenario.rolePlay}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Phrases utiles :</p>
              <ul className="space-y-2">
                {scenario.tips.map((tip, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-gray-800 mb-2">Practice Instructions:</p>
            <ol className="text-sm text-gray-700 space-y-1">
              <li>1. Read the situation and role carefully</li>
              <li>2. Practice speaking out loud for 2-3 minutes</li>
              <li>3. Try different responses using the tips provided</li>
              <li>4. Record yourself if possible and listen</li>
              <li>5. Mark as complete when ready to move on</li>
            </ol>
          </div>
        </motion.div>

        <div className="flex gap-4 justify-between mb-6">
          <button
            onClick={handlePrev}
            disabled={currentScenario === 0}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
          >
            ← Précédent
          </button>
          <p className="text-center text-gray-600">
            Terminé : {completedScenarios.length} / {scenarios.length}
          </p>
          <button
            onClick={handleNext}
            disabled={currentScenario === scenarios.length - 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
          >
            Suivant →
          </button>
        </div>

        <button
          onClick={handleComplete}
          className={`w-full px-6 py-3 font-semibold rounded-lg transition ${
            completedScenarios.includes(currentScenario)
              ? "bg-green-100 text-green-800 border-2 border-green-500"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {completedScenarios.includes(currentScenario) ? "✓ Terminé" : "Marquer comme terminé"}
        </button>
      </div>
    </motion.div>
  );
};

export default SpeakingRolePlayQuiz;

