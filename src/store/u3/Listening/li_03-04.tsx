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

const Li_03_04 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const transcript = `
    HISTOIRE DE TRANSPORT PASSE PRESENT ET FUTUR

    A: Salut Sarah ! J'attends le bus en ce moment. Je vais au marche.
    B: Oh ! Tu te souviens de la semaine derniere ? Nous avons pris le train ensemble pour aller a la plage !
    A: Oui ! C'etait merveilleux. Le train etait confortable et le trajet etait rapide.
    B: J'ai pris des photos dans ce train. Tu te souviens ? Je prenais beaucoup de photos !
    A: Je m'en souviens ! Tu souriais tout le temps. Et regarde-toi maintenant !
    B: Oui ! Aujourd'hui je suis assise a l'arret de bus. Demain je vais voyager en voiture.
    A: Ou vas-tu aller demain ?
    B: Je vais aller a la montagne. La voiture va venir me chercher a 9 h.
    A: Ca a l'air sympa. Donc, la tu attends, la semaine derniere tu as voyage en train, et demain tu vas en voiture !
    B: Exactement ! J'adore voyager !
  `;

  const questions: Question[] = [
  {
    id: 1,
    question: "Que fait Sarah EN CE MOMENT ?",
    options: ["Prendre le train", "Attendre le bus", "Etre assise dans une voiture", "Aller a pied au marche"],
    correct: 1,
    explanation: "Sarah dit : 'J'attends le bus en ce moment.'"
  },
  {
    id: 2,
    question: "Ou Sarah VA-T-ELLE aller aujourd'hui ?",
    options: ["A la plage", "A la montagne", "Au marche", "A la gare"],
    correct: 2,
    explanation: "Sarah dit : 'Je vais au marche.'"
  },
  {
    id: 3,
    question: "Quel moyen de transport Sarah a-t-elle utilise LA SEMAINE DERNIERE ?",
    options: ["Bus", "Train", "Voiture", "Taxi"],
    correct: 1,
    explanation: "La personne dit : 'La semaine derniere ? Nous avons pris le train ensemble pour aller a la plage !'"
  },
  {
    id: 4,
    question: "Le trajet en train etait-il long ?",
    options: ["Oui, tres long", "Non, il etait court", "On ne sait pas", "Il etait moyen"],
    correct: 1,
    explanation: "Sarah dit : 'Le trajet etait rapide', ce qui veut dire qu'il etait court/rapide."
  },
  {
    id: 5,
    question: "Le train etait-il confortable ?",
    options: ["Oui", "Non", "Pas vraiment", "Le passage ne le dit pas"],
    correct: 0,
    explanation: "Sarah dit : 'Le train etait confortable.'"
  },
  {
    id: 6,
    question: "Que va faire Sarah DEMAIN ?",
    options: ["Prendre le train", "Attendre le bus", "Voyager en voiture", "Rester a la maison"],
    correct: 2,
    explanation: "Sarah dit : 'Demain je vais voyager en voiture.'"
  },
  {
    id: 7,
    question: "Ou Sarah VA-T-ELLE aller demain ?",
    options: ["A la plage", "Au marche", "A la montagne", "A la gare"],
    correct: 2,
    explanation: "Sarah dit : 'Je vais aller a la montagne.'"
  },
  {
    id: 8,
    question: "A quelle heure la voiture va-t-elle venir chercher Sarah demain ?",
    options: ["8 h", "9 h", "10 h", "11 h"],
    correct: 1,
    explanation: "Sarah dit : 'La voiture va venir me chercher a 9 h.'"
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
            Comprehension orale : histoire de transport (tous les temps)
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

export default Li_03_04;


