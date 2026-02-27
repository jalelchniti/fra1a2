import React, { useState, useRef, useEffect, FC } from 'react';
import { Volume2, CheckCircle, XCircle, Trophy, RotateCcw, Headphones, Play, Pause, Eye, EyeOff, Download } from 'lucide-react';
import { generateTestPDF } from '@/lib/pdfGenerator';

interface TestQuestion {
  id: number;
  questionText: string;
  listeningAudio: string;
  options: string[];
  correctAnswer: number;
  audioLength: string;
  difficulty: 'beginner' | 'easy' | 'intermediate';
}

const Test: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text: string): void => {
    if (isSpeakingRef.current) return;
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.95;
    const frenchVoice = voices.find((v) => v.lang.toLowerCase().startsWith('fr')) || voices[0];
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      isSpeakingRef.current = false;
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = (): void => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      isSpeakingRef.current = false;
    }
  };

  const playQuestion = (): void => {
    speakText(testQuestions[currentQuestion].listeningAudio);
  };

  const handleAnswerSelect = (optionIndex: number): void => {
    if (!showResults) {
      setSelectedAnswer(optionIndex);
    }
  };

  const submitAnswer = (): void => {
    const question = testQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResults(true);
    setCompletedQuestions([...completedQuestions, currentQuestion]);
  };

  const nextQuestion = (): void => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResults(false);
      setShowAnswers(false);
      stopSpeaking();
    } else {
      setQuizComplete(true);
    }
  };

  const resetTest = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setCompletedQuestions([]);
    setShowAnswers(false);
    setQuizComplete(false);
    stopSpeaking();
  };


  const handleDownloadPDF = (): void => {
    const testResults = {
      testTitle: 'Test de comprAhension orale - Version enseignant',
      score: Math.round((score / testQuestions.length) * 100),
      correctAnswers: score,
      totalQuestions: testQuestions.length,
      testDate: new Date().toLocaleDateString(),
      questionBreakdown: testQuestions.map((q, idx) => ({
        questionNum: idx + 1,
        userAnswer: completedQuestions.includes(idx) ? 'Repondu' : 'Non repondu',
        correctAnswer: q.options[q.correctAnswer],
        isCorrect: idx < score ? true : false,
        difficulty: q.difficulty,
      })),
    };

    generateTestPDF(testResults);
  };
  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-12 text-white text-center border-4 border-yellow-300">
            <div className="text-9xl mb-6">YZ</div>
            <Trophy className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-4">Test terminA !</h2>
            <p className="text-2xl mb-6">Vous avez {score} bonnes rAponses sur {testQuestions.length}</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
              <p className="text-5xl font-bold">Score : {Math.round((score / testQuestions.length) * 100)}%</p>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={handleDownloadPDF}
                className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-green-100 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              >
                <Download className="w-6 h-6" />
                Telecharger le rapport PDF
              </button>
              <button
                onClick={resetTest}
                className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
              >
                Refaire le test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = testQuestions[currentQuestion];
  const progressPercentage = ((completedQuestions.length) / testQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Headphones className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-6xl font-bold text-white">ComprAhension orale</h1>
            <Volume2 className="w-12 h-12 text-green-400 animate-pulse" />
          </div>
          <p className="text-xl text-blue-200">Version enseignant - 20 questions</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-blue-800/80 to-indigo-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center border-2 border-cyan-400/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-sm text-blue-200 font-medium">Score </p>
              <p className="text-4xl font-bold text-white">{score}/{testQuestions.length}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-blue-200 font-medium">Progression</p>
            <p className="text-4xl font-bold text-white">{completedQuestions.length + 1}/{testQuestions.length}</p>
          </div>
          <button
            onClick={resetTest}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>RAinitialiser</span>
          </button>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            {showAnswers ? (
              <>
                <EyeOff className="w-5 h-5" />
                <span>Masquer les rAponses</span>
              </>
            ) : (
              <>
                <Eye className="w-5 h-5" />
                <span>Afficher les rAponses</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-10 text-white border-4 border-white/20">
          <div className="flex flex-col items-center">
            {/* Question Number */}
            <div className="mb-6 text-center">
              <span className="bg-white/30 backdrop-blur-sm px-6 py-2 rounded-full text-lg font-bold uppercase tracking-wider border-2 border-white/40">
                Question {currentQuestion + 1} sur {testQuestions.length}
              </span>
              <p className="text-sm mt-2 text-white/80">DurAe : {question.audioLength} | Niveau : {question.difficulty}</p>
            </div>

            {/* Audio Player Section */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8 w-full border-2 border-white/30">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Headphones className="w-8 h-8" />
                <p className="text-lg font-bold">Ecouter la question</p>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={playQuestion}
                  disabled={isPlaying}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                    isPlaying
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 hover:scale-105'
                  }`}
                >
                  <Play className="w-6 h-6" />
                  Lire l'audio
                </button>

                {isPlaying && (
                  <button
                    onClick={stopSpeaking}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    <Pause className="w-6 h-6" />
                    Arreter
                  </button>
                )}
              </div>

              <p className="text-center text-sm mt-4 italic opacity-80">
                 Vous pouvez ecouter l'audio autant de fois que necessaire
              </p>
            </div>

            {/* Hidden Question Text */}
            {showAnswers && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full border-2 border-white/30">
                <p className="text-center text-xl font-bold text-yellow-200">
                  Question (enseignant) : {question.questionText}
                </p>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="w-full space-y-4 mb-8">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === question.correctAnswer;
                const showCorrect = showResults && isCorrect;
                const showWrong = showResults && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showResults}
                    className={`w-full text-left p-4 rounded-lg font-medium transition-all border-2 text-lg ${
                      showCorrect
                        ? 'bg-green-500 border-green-300 text-white'
                        : showWrong
                        ? 'bg-red-500 border-red-300 text-white'
                        : isSelected
                        ? 'bg-white/30 border-white/50'
                        : 'bg-white/10 border-white/30 hover:bg-white/20'
                    } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle className="w-6 h-6" />}
                      {showWrong && <XCircle className="w-6 h-6" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 flex-wrap justify-center w-full">
              {!showResults ? (
                <button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl ${
                    selectedAnswer === null
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-white text-gray-900 hover:bg-yellow-100 hover:scale-105'
                  }`}
                >
                  Valider la reponse
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setShowResults(false);
                    }}
                    className="px-10 py-5 rounded-2xl font-bold text-xl bg-white/80 text-gray-900 hover:bg-white transition-all hover:scale-105 shadow-2xl"
                  >
                    Reessayer
                  </button>
                  {currentQuestion < testQuestions.length - 1 && (
                    <button
                      onClick={nextQuestion}
                      className="px-10 py-5 rounded-2xl font-bold text-xl bg-white text-gray-900 hover:bg-green-100 transition-all hover:scale-105 shadow-2xl border-4 border-green-300"
                    >
                      Question suivante a
                    </button>
                  )}
                  {currentQuestion === testQuestions.length - 1 && (
                    <button
                      onClick={nextQuestion}
                      className="px-10 py-5 rounded-2xl font-bold text-xl bg-white text-gray-900 hover:bg-green-100 transition-all hover:scale-105 shadow-2xl border-4 border-green-300"
                    >
                      Terminer le test YZ 
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Question Progress Dots */}
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {testQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all ${
                completedQuestions.includes(idx)
                  ? 'bg-green-400 ring-2 ring-green-300'
                  : idx === currentQuestion
                  ? 'bg-cyan-500 scale-125 ring-2 ring-cyan-300'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Test Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-400/30 text-center">
          <p className="text-blue-100">
            <span className="font-bold text-white">Acces enseignant uniquement :</span> Ce test evalue la comprehension orale de base sur 20 questions progressives. Utilisez le bouton  Afficher les reponses  pour reveler le texte des questions pendant l'animation.
          </p>
        </div>
      </div>
    </div>
  );
};

// 20 Listening Comprehension Questions - Progressive in Length & Difficulty
const testQuestions: TestQuestion[] = [
  // Beginner Level (Short) - Questions 1-5
  {
    id: 1,
    questionText: 'Que dit la personne en guise de salut',
    listeningAudio: 'Bonjour, comment allez-vous',
    options: ['Il dit au revoir', 'Il salue quelquun', 'Il demande de laide', 'Il demande lheure'],
    correctAnswer: 1,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 2,
    questionText: 'De quoi la personne a-t-elle besoin',
    listeningAudio: 'Pouvez-vous maider, sil vous plait',
    options: ['Du temps', 'De largent', 'De laide', 'De la nourriture'],
    correctAnswer: 2,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 3,
    questionText: 'Que cherche la personne',
    listeningAudio: 'Ou sont les toilettes',
    options: ['Un restaurant', 'Une ecole', 'Les toilettes', 'Un parc'],
    correctAnswer: 2,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 4,
    questionText: 'Pourquoi la personne remercie-t-elle',
    listeningAudio: 'Merci beaucoup !',
    options: ['Pour laide', 'Pour des informations', 'Pour avoir parle', 'Pour avoir ecoute'],
    correctAnswer: 0,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 5,
    questionText: 'Comment se sent la personne',
    listeningAudio: 'Je suis tres heureux aujourdhui.',
    options: ['Triste', 'Heureux(se)', 'Fatigue(e)', 'En colere'],
    correctAnswer: 1,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },

  // Easy Level (Medium) - Questions 6-10
  {
    id: 6,
    questionText: 'Quelle heure est-il',
    listeningAudio: 'Quelle heure est-il ? Il est trois heures de lapres-midi.',
    options: ['Deux heures', 'Trois heures', 'Quatre heures', 'Cinq heures'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },
  {
    id: 7,
    questionText: 'Qua achete la personne',
    listeningAudio: 'Je suis alle au magasin et jai achete une pomme, une banane et du lait.',
    options: ['Un stylo et du papier', 'Une pomme, une banane et du lait', 'Une chemise et des chaussures', 'Un livre et un crayon'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },
  {
    id: 8,
    questionText: 'Ou habite la personne',
    listeningAudio: 'Jhabite dans une petite maison pres du parc, tout pres de lecole.',
    options: ['Dans un grand appartement', 'Dans une petite maison pres du parc', 'Dans un immeuble haut', 'Dans une ferme'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },
  {
    id: 9,
    questionText: 'Quel est le metier de la personne',
    listeningAudio: 'Mon frere est enseignant. Il travaille a lecole tous les jours.',
    options: ['Medecin', 'Enseignant', 'Ingenieur', 'Agriculteur'],
    correctAnswer: 1,
    audioLength: '3 seconds',
    difficulty: 'easy'
  },
  {
    id: 10,
    questionText: 'Qua fait la personne hier',
    listeningAudio: 'Hier, je suis alle au parc avec mes amis et nous avons joue au football.',
    options: ['Je suis alle a lecole', 'Je suis alle au parc et jai joue au football', 'Je suis reste a la maison', 'Je suis alle faire du shopping'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },

  // Intermediate Level (Longer) - Questions 11-20
  {
    id: 11,
    questionText: 'Quelles couleurs sont mentionnees',
    listeningAudio: 'Mes couleurs preferees sont le bleu et le vert. Jaime le bleu parce quil me rappelle le ciel et locean.',
    options: ['Rouge et jaune', 'Bleu et vert', 'Violet et orange', 'Rose et blanc'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 12,
    questionText: 'Quand la personne a-t-elle cours',
    listeningAudio: 'Jai cours danglais lundi, mercredi et vendredi. Chaque cours dure deux heures, de neuf heures a onze heures.',
    options: ['Mardi et jeudi', 'Lundi, mercredi, vendredi', 'Tous les jours', 'Uniquement le week-end'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 13,
    questionText: 'Que la personne aime-t-elle manger au petit-dejeuner',
    listeningAudio: 'Chaque matin, je mange des cereales avec du lait et une banane. Parfois je bois aussi du jus dorange. Cest sain et delicieux.',
    options: ['Des ufs et du pain grille', 'Des cereales avec du lait et une banane', 'Des pancakes et du bacon', 'Juste du cafe'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 14,
    questionText: 'Combien de freres et surs la personne a-t-elle',
    listeningAudio: 'Jai une sur et deux freres. Ma sur est lainee. Mes freres sont plus jeunes que moi. Nous vivons tous ensemble avec nos parents.',
    options: ['Un seul frere ou sur', 'Deux freres et surs', 'Trois freres et surs', 'Quatre freres et surs'],
    correctAnswer: 2,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 15,
    questionText: 'Quel est le sport prefere de la personne',
    listeningAudio: 'Mon sport prefere est le football. Je joue au football avec mes amis chaque samedi apres-midi au parc. Cest tres amusant et bon pour la sante.',
    options: ['Basket-ball', 'Football', 'Tennis', 'Natation'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 16,
    questionText: 'Quels sont les plans de la personne pour le week-end',
    listeningAudio: 'Ce week-end, je vais rendre visite a ma grand-mere. Nous dejeunerons ensemble puis regarderons un film. Jai hate de la voir.',
    options: ['Aller a la plage', 'Rendre visite a ma grand-mere et regarder un film', 'Faire du sport', 'Etudier pour les examens'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 17,
    questionText: 'Quelles sont les conditions meteo decrites',
    listeningAudio: 'Hier, il faisait tres chaud et ensoleille. La temperature etait de trente-cinq degres. Il faisait trop chaud pour sortir. Je suis reste a linterieur avec la climatisation.',
    options: ['Froid et pluvieux', 'Chaud et ensoleille', 'Froid et neigeux', 'Doux et nuageux'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 18,
    questionText: 'A quelle frequence la personne fait-elle de lexercice',
    listeningAudio: 'Jessaie de faire du sport au moins trois fois par semaine. Je vais generalement a la salle de sport le lundi, mercredi et vendredi. Je fais aussi une marche le week-end.',
    options: ['Tous les jours', 'Trois fois par semaine et marche le week-end', 'Deux fois par semaine', 'Une fois par semaine'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 19,
    questionText: 'Quelles langues la personne parle-t-elle',
    listeningAudio: 'Je parle anglais, francais et arabe. Jai appris langlais a lecole. Jai appris le francais parce que ma mere vient de France. Larabe est ma langue maternelle.',
    options: ['Anglais et espagnol', 'Anglais, francais et arabe', 'Anglais et allemand', 'Seulement langlais'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 20,
    questionText: 'Qua appris la personne a lecole aujourdhui',
    listeningAudio: 'Aujourdhui en cours de sciences, nous avons appris les differents types danimaux. Nous avons etudie les mammiferes, les oiseaux et les poissons. Nous avons aussi appris leurs habitats et leur mode de vie. Cetait tres interessant.',
    options: ['Mathematiques', 'Histoire', 'Differents types danimaux', 'Grammaire anglaise'],
    correctAnswer: 2,
    audioLength: '6 seconds',
    difficulty: 'intermediate'
  }
];

export default Test;

