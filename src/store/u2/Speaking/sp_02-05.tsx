// src/store/u2/Speaking/sp_02-05.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PresentProgressiveSpeakingPractice = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<boolean[]>(new Array(10).fill(false));

  const flashcards = [
    {
      front: 'Décris ce que tu fais en ce moment.',
      back: 'Exemple : « Je suis en train d’étudier l’anglais. » ou « J’apprends le présent progressif. »',
      icon: '📚',
      category: 'action en cours'
    },
    {
      front: 'Dis ce que fait quelqu’un d’autre.',
      back: 'Exemple : « Elle fait du shopping au centre commercial. » ou « Il attend le bus. »',
      icon: '👤',
      category: 'action en cours'
    },
    {
      front: 'Décris plusieurs personnes qui font quelque chose.',
      back: 'Exemple : « Ils déjeunent ensemble. » ou « Nous sommes en train de discuter. »',
      icon: '👥',
      category: 'action en cours'
    },
    {
      front: 'Te plains d’une situation actuelle.',
      back: 'Exemple : « Je me plains du prix, c’est trop cher. » ou « Elle se plaint du service. »',
      icon: '😠',
      category: 'plainte'
    },
    {
      front: 'Demande à quelqu’un ce qu’il fait maintenant.',
      back: 'Exemple : « Que fais-tu en ce moment ? » ou « Étudies-tu l’anglais ? »',
      icon: '❓',
      category: 'question'
    },
    {
      front: 'Dis ce que tu NE fais PAS en ce moment.',
      back: 'Exemple : « Je ne travaille pas aujourd’hui. » ou « Elle ne dort pas, elle étudie. »',
      icon: '❌',
      category: 'négation'
    },
    {
      front: 'Te plains de ce que fait quelqu’un.',
      back: 'Exemple : « Il est en retard et j’attends ! » ou « Ils font trop de bruit. »',
      icon: '😤',
      category: 'plainte'
    },
    {
      front: 'Décris une action qui se passe autour de toi.',
      back: 'Exemple : « Un oiseau vole dans le ciel. » ou « Des enfants jouent au parc. »',
      icon: '🌍',
      category: 'observation'
    },
    {
      front: 'Dis ce que tu fais et comment tu te sens.',
      back: 'Exemple : « J’étudie et je suis content. » ou « Elle se plaint et il écoute. »',
      icon: '😊',
      category: 'émotion'
    },
    {
      front: 'Décris un problème qui se produit maintenant.',
      back: 'Exemple : « Le bus est en retard et je rate mon rendez-vous. » ou « Le repas refroidit. »',
      icon: '⚠️',
      category: 'problème'
    },
  ];

  const markCardAsPracticed = () => {
    const newProgress = [...progress];
    newProgress[currentCard] = true;
    setProgress(newProgress);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => {
      const newFlipped = !prev;
      if (!prev) markCardAsPracticed();
      return newFlipped;
    });
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const completedCount = progress.filter(Boolean).length;
  const completionPercentage = Math.round((completedCount / flashcards.length) * 100);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-xl min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-orange-700 mb-2 text-center tracking-tight">
        Present Progressive Speaking Practice
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Entraîne-toi à parler des actions en cours et des plaintes !
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Progression</span>
          <span className="text-sm font-semibold text-orange-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          {completedCount} sur {flashcards.length} cartes pratiquées
        </p>
      </div>

      {/* Flashcard */}
      <motion.div
        onClick={handleFlip}
        className="mb-8 cursor-pointer w-full max-w-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`min-h-64 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center ${
            isFlipped
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
              : 'bg-gradient-to-br from-orange-500 to-red-600'
          }`}
        >
          <div className="text-center">
            <p className="text-5xl mb-4">{flashcards[currentCard].icon}</p>
            <p className="text-white text-xl font-bold leading-relaxed">
              {isFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
            </p>
            <p className="text-white/70 text-sm mt-6">
              {isFlipped ? 'Cliquer pour voir l’indice' : 'Cliquer pour voir l’exemple'}
            </p>
            {isFlipped && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(flashcards[currentCard].back);
                }}
                className="mt-4 flex items-center gap-2 mx-auto bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Volume2 size={18} />
                <span className="text-sm">Écouter</span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Card Counter and Category */}
      <div className="flex justify-between items-center w-full max-w-md mb-6 text-center">
        <span className="text-sm font-semibold text-gray-700">
          Carte {currentCard + 1} sur {flashcards.length}
        </span>
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {flashcards[currentCard].category}
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 w-full max-w-md mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
          Précédent
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFlip}
          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          {isFlipped ? '← Indice' : 'Exemple →'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Suivant
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Practice Status */}
      {progress[currentCard] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6 text-green-600 font-semibold"
        >
          <Check size={20} />
          <span>You've practiced this one!</span>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border-l-4 border-orange-500">
        <p className="text-sm text-gray-700 mb-2">
          <strong>📒 Comment pratiquer :</strong>
        </p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>✓ Lis l’indice et prépare ce que tu vas dire</li>
          <li>✓ Clique pour révéler l’exemple de réponse</li>
          <li>✓ Répète l’exemple à voix haute 3 fois</li>
          <li>✓ Crée ta propre version en utilisant le présent progressif</li>
        </ul>
      </div>
    </div>
  );
};

export default PresentProgressiveSpeakingPractice;


