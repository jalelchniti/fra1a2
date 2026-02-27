// Unit 2 Lesson 3 - Comprehension orale : reperes et lieux
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  audio: string;
}

const questions: Question[] = [
  {
    question: "Quel repere est mentionne en premier ?",
    options: ["Un parc", "Une eglise", "Un hopital", "Une banque"],
    correctAnswer: 1,
    audio: "L'hopital est situe a cote d'une grande vieille eglise. Vous ne pouvez pas le manquer."
  },
  {
    question: "Dans quelle rue se trouve la poste ?",
    options: ["Main Street", "Oak Avenue", "Pine Road", "Elm Street"],
    correctAnswer: 2,
    audio: "La poste est sur Pine Road, entre la boulangerie et le supermarche."
  },
  {
    question: "Qu'y a-t-il a cote de la pharmacie ?",
    options: ["Un cafe", "Une librairie", "Un supermarche", "Un restaurant"],
    correctAnswer: 0,
    audio: "Vous trouverez la pharmacie a cote d'un joli cafe, juste en face du parc."
  },
  {
    question: "A quelle distance est la gare du centre-ville ?",
    options: ["5 minutes", "10 minutes", "20 minutes", "30 minutes"],
    correctAnswer: 1,
    audio: "La gare est a environ 10 minutes du centre-ville en bus ou en taxi."
  },
  {
    question: "Quel est le nom de la place principale ?",
    options: ["Central Plaza", "Town Plaza", "Market Plaza", "Peace Plaza"],
    correctAnswer: 0,
    audio: "Tous les grands magasins se trouvent autour de Central Plaza, au coeur de la ville."
  }
];

const ListeningLandmarksQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasListened, setHasListened] = useState(false);

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(questions[currentQuestion].audio);
    utterance.lang = "fr-FR";
    window.speechSynthesis.speak(utterance);
    setHasListened(true);
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setHasListened(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(selectedAnswers[currentQuestion - 1] !== null);
      setHasListened(false);
    }
  };

  const score = selectedAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Comprehension orale : reperes et lieux</h1>
          <p className="text-gray-600">Unite 2 - Lecon d'ecoute 3</p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-gray-600 mt-2">
            Question {currentQuestion + 1} sur {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>

          <button
            onClick={playAudio}
            className="w-full px-6 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition mb-8 text-lg"
          >
            Ecouter l'audio
          </button>

          {!hasListened && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
              <p className="text-yellow-800">Cliquez sur le bouton "Ecouter l'audio" ci-dessus pour ecouter.</p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={!hasListened}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  !hasListened
                    ? "opacity-50 cursor-not-allowed border-gray-300 bg-gray-50"
                    : selectedAnswers[currentQuestion] === idx
                    ? idx === questions[currentQuestion].correctAnswer
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : "border-gray-300 bg-gray-50 hover:border-blue-400"
                }`}
              >
                <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer
                  ? "bg-green-100 border border-green-500"
                  : "bg-yellow-100 border border-yellow-500"
              }`}
            >
              <p className="font-semibold text-gray-800">
                {selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer
                  ? "Bonne reponse !"
                  : "Incorrect"}
              </p>
              <p className="text-gray-700 mt-2 text-sm italic">{questions[currentQuestion].audio}</p>
            </motion.div>
          )}
        </div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
          >
            Precedent
          </button>
          <div className="text-center">
            <p className="text-gray-600">Score : {score} / {questions.length}</p>
          </div>
          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1 || selectedAnswers[currentQuestion] === null}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
          >
            Suivant
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ListeningLandmarksQuiz;

