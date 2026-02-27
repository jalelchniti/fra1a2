import { useState, useRef } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Volume2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Li_03_01 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const transcript = `
    COMPREHENSION ORALE COMPRENDRE LES DIRECTIONS

    A: Excusez-moi. Comment aller a la gare ?
    B: C'est facile ! Allez tout droit. Puis tournez a gauche a la grande eglise.
    A: Tourner a gauche a l'eglise ?
    B: Oui. Apres l'eglise, vous verrez la gare sur votre droite.
    A: Combien de temps cela prend-il ?
    B: Environ 10 minutes a pied.
    A: Merci beaucoup !
    B: Je vous en prie !
  `;

  const questions: Question[] = [
  {
    id: 1,
    question: "Que demande la personne ?",
    options: ["L'arret de bus", "La gare", "L'eglise", "Le marche"],
    correct: 1,
    explanation: "La personne A demande : 'Comment aller a la gare ?'"
  },
  {
    id: 2,
    question: "Que lui dit la personne B de faire en premier ?",
    options: ["Tourner a gauche", "Tourner a droite", "Aller tout droit", "Aller a l'eglise"],
    correct: 2,
    explanation: "La personne B dit : 'Allez tout droit. Puis tournez a gauche a la grande eglise.'"
  },
  {
    id: 3,
    question: "Ou se trouve la grande eglise ?",
    options: ["A droite", "A gauche", "Pres de la gare", "Au debut"],
    correct: 2,
    explanation: "La personne B dit : 'Tournez a gauche a la grande eglise.'"
  },
  {
    id: 4,
    question: "Ou est la gare ?",
    options: ["A gauche", "A droite", "Derriere l'eglise", "Derriere la personne"],
    correct: 1,
    explanation: "La personne B dit : 'Apres l'eglise, vous verrez la gare sur votre droite.'"
  },
  {
    id: 5,
    question: "Combien de temps dure la marche ?",
    options: ["5 minutes", "10 minutes", "15 minutes", "20 minutes"],
    correct: 1,
    explanation: "La personne B dit : 'Environ 10 minutes a pied.'"
  },
  {
    id: 6,
    question: "Quel est le repere le plus important ?",
    options: ["Le marche", "L'eglise", "L'arret de bus", "Le parc"],
    correct: 1,
    explanation: "L'eglise est mentionnee comme l'endroit ou il faut tourner a gauche. C'est le repere principal."
  },
  {
    id: 7,
    question: "La direction est-elle facile ou difficile ?",
    options: ["Tres difficile", "Un peu difficile", "Facile", "Tres confuse"],
    correct: 2,
    explanation: "La personne B dit : 'C'est facile !'"
  },
  {
    id: 8,
    question: "Comment se sent la personne A a la fin ?",
    options: ["Confuse", "En colere", "Reconnaissante", "Effrayee"],
    correct: 2,
    explanation: "La personne A dit : 'Merci beaucoup !' ce qui montre sa reconnaissance."
  }
];

  const speakWithPauses = () => {
    if (isSpeakingRef.current) return;
    isSpeakingRef.current = true;
    setIsSpeaking(true);

    // Extract meaningful lines (remove empty lines and header)
    const lines = transcript
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.match(/^[A-Z\s]+$/)); // Remove empty and all-caps headers

    let currentIndex = 0;

    const playNextLine = () => {
      if (currentIndex >= lines.length) {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        return;
      }

      const line = lines[currentIndex];
      const utterance = new SpeechSynthesisUtterance(line);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;

      utterance.onend = () => {
        currentIndex++;
        // 5-second pause before next line
        setTimeout(playNextLine, 5000);
      };

      window.speechSynthesis.speak(utterance);
    };

    playNextLine();
  };

  const renderTranscriptWithColors = () => {
    const lines = transcript.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-2"></div>;

      if (trimmed.startsWith('A:')) {
        return (
          <p key={index} className="text-blue-600 font-semibold">
            {trimmed}
          </p>
        );
      } else if (trimmed.startsWith('B:')) {
        return (
          <p key={index} className="text-green-600 font-semibold">
            {trimmed}
          </p>
        );
      } else {
        return (
          <p key={index} className="text-gray-800 font-bold">
            {trimmed}
          </p>
        );
      }
    });
  };

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (optionIndex === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isComplete = currentQuestionIndex === questions.length - 1 && answered;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/listening')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition"
          >
            <ChevronLeft size={20} />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Comprehension orale : comprendre les directions
          </h1>
          <div className="w-[100px]"></div>
        </div>

        {/* Transcript Box */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Transcription d'ecoute :</h2>
            <div className="flex gap-2">
              <button
                onClick={speakWithPauses}
                disabled={isSpeaking}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                <Volume2 size={18} />
                {isSpeaking ? 'Lecture...' : "Ecouter l'audio"}
              </button>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                {showTranscript ? <EyeOff size={18} /> : <Eye size={18} />}
                {showTranscript ? 'Masquer' : 'Afficher'}
              </button>
            </div>
          </div>
          {showTranscript && (
            <div className="text-gray-700 leading-relaxed space-y-2">
              {renderTranscriptWithColors()}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 font-semibold">
              Question {currentQuestionIndex + 1} sur {questions.length}
            </p>
            <p className="text-gray-700 font-semibold">
              Score : {score}/{questions.length}
            </p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      !answered
                        ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                        : selectedAnswer === index
                        ? index === currentQuestion.correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : index === currentQuestion.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{option}</span>
                      {answered && (
                        <>
                          {index === currentQuestion.correct && (
                            <CheckCircle size={24} className="text-green-500" />
                          )}
                          {selectedAnswer === index && index !== currentQuestion.correct && (
                            <XCircle size={24} className="text-red-500" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Explanation */}
        {answered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-lg mb-8 ${
              selectedAnswer === currentQuestion.correct
                ? 'bg-green-50 border-l-4 border-green-500'
                : 'bg-yellow-50 border-l-4 border-yellow-500'
            }`}
          >
            <p className="font-semibold text-gray-800 mb-2">
              {selectedAnswer === currentQuestion.correct ? 'Bonne reponse !' : 'Pas tout a fait'}
            </p>
            <p className="text-gray-700">{currentQuestion.explanation}</p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isComplete && answered && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-600 transition"
            >
              Question suivante
            </button>
          )}

          {isComplete && (
            <div className="w-full text-center">
              <p className="text-2xl font-bold text-gray-800 mb-4">Quiz termine !</p>
              <p className="text-lg text-gray-700 mb-4">
                Votre score : {score} sur {questions.length}
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-600 transition"
              >
                Reessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Li_03_01;


