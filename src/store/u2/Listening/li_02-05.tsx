// src/store/u2/Listening/li_02-05.tsx
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

interface Question {
  text: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const PresentProgressiveListeningQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = useMemo(() => [
    {
      text: "Bonjour a tous ! Je fais des courses au marche en ce moment. Je cherche des legumes et des fruits frais. Les legumes ont l'air bons aujourd'hui. Je me plains du prix car c'est tres cher !",
      question: "Que fait la personne en ce moment ?",
      options: ["Elle cuisine.", "Elle fait des courses au marche.", "Elle est a l'hopital.", "Elle donne un cours."],
      correctAnswer: "Elle fait des courses au marche."
    },
    {
      text: "Mes amis sont en reunion au cafe. Nous discutons d'un nouveau projet. John presente ses idees et tout le monde ecoute attentivement. Nous sommes tres enthousiastes pour ce projet !",
      question: "Que font les amis en ce moment ?",
      options: ["Ils font du sport.", "Ils sont en reunion.", "Ils regardent un film.", "Ils preparent le diner."],
      correctAnswer: "Ils sont en reunion."
    },
    {
      text: "Je suis assis dans mon bureau et je travaille sur une tache tres difficile. Mon ordinateur fait des bruits etranges. Je m'en plains parce que c'est tres agacant ! Je suis aussi frustre parce que l'internet est tres lent.",
      question: "De quoi la personne se plaint-elle ?",
      options: ["Il fait mauvais temps.", "L'ordinateur fait du bruit et internet est lent.", "Le bureau est trop petit.", "Son patron est impoli."],
      correctAnswer: "L'ordinateur fait du bruit et internet est lent."
    },
    {
      text: "Les enfants jouent au parc en ce moment. Certains jouent au football, d'autres sur l'aire de jeux. Ils passent un moment formidable ! Les parents les regardent et sourient parce que tout le monde est en securite et heureux.",
      question: "Que font les enfants ?",
      options: ["Ils etudient.", "Ils travaillent a l'usine.", "Ils jouent au parc.", "Ils dorment."],
      correctAnswer: "Ils jouent au parc."
    },
    {
      text: "Ma voisine se plaint du bruit parce que je m'entraine a la guitare. Je joue fort et elle est tres en colere. Je suis desole, mais je me prepare pour un concert important ce week-end. La situation est compliquee en ce moment.",
      question: "Pourquoi la voisine se plaint-elle ?",
      options: ["La musique est trop belle.", "Quelqu'un fait trop de bruit avec la guitare.", "La maison est trop vieille.", "La rue est trop passante."],
      correctAnswer: "Quelqu'un fait trop de bruit avec la guitare."
    }
  ], []);

  const speakText = useCallback((text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    if (currentQuestion < questions.length) {
      speakText(questions[currentQuestion].text);
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentQuestion, questions, speakText]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-purple-700 mb-4">Quiz termine !</h2>
          <p className="text-6xl font-bold text-purple-600 mb-4">
            {score}/{questions.length}
          </p>
          <p className="text-xl text-gray-600 mb-8">
            {score === questions.length
              ? 'Parfait ! Tu as compris tous les passages au present progressif !'
              : score >= questions.length * 0.8
              ? "Super comprehension ! Continue a t'entrainer !"
              : 'Bon effort ! Reecoute et concentre-toi sur les verbes en "-ing" !'}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={restartQuiz}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Recommencer le quiz d'ecoute
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2 text-center">
            Comprehension orale : present progressif
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Ecoute attentivement et reponds aux questions sur ce qui se passe
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestion + 1} sur {questions.length}
            </span>
            <span className="text-sm font-semibold text-purple-600">
              Score : {score}
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Audio Section */}
        <div className="mb-8 p-6 bg-purple-50 rounded-lg border-2 border-purple-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-purple-700 flex items-center gap-2">
              <Volume2 size={24} />
              Ecoute ceci :
            </h3>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => speakText(questions[currentQuestion].text)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Volume2 size={18} />
              Reecouter
            </motion.button>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed bg-white p-4 rounded-lg border-l-4 border-purple-500">
            {questions[currentQuestion].text}
          </p>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Note : Le texte sera lu a voix haute. Ecoute bien les verbes en "-ing" !
          </p>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {questions[currentQuestion].question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: isAnswered ? 1 : 1.02 }}
              whileTap={{ scale: isAnswered ? 1 : 0.98 }}
              onClick={() => !isAnswered && handleAnswer(option)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all font-semibold text-lg ${
                selectedAnswer === option
                  ? option === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : option === questions[currentQuestion].correctAnswer && isAnswered
                  ? 'bg-green-100 border-green-500'
                  : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 border-l-4 ${
              selectedAnswer === questions[currentQuestion].correctAnswer
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            <p
              className={`font-semibold ${
                selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}
            >
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? 'Bonne reponse ! Bonne ecoute !'
                : 'Pas tout a fait. Reecoute !'}
            </p>
          </motion.div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {currentQuestion === questions.length - 1 ? 'Voir les resultats' : 'Question suivante'}
          </motion.button>
        )}

        {/* Hint */}
        <div className="mt-6 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
          <p className="text-sm text-gray-700">
            <strong>Astuce :</strong> Repere les mots en "ing" comme "shopping", "playing" ou "complaining" pour identifier le present progressif.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PresentProgressiveListeningQuiz;
