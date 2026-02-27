import React, { useState, useEffect, FC } from 'react';
import { Volume2, CheckCircle, XCircle, Trophy, RotateCcw, Headphones, Play, Pause } from 'lucide-react';





const ListeningActivityGame: FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const activities = [
    {
      level: 1,
      title: "Niveau 1 : Une phrase courte",
      difficulty: "Debutant",
      text: "Maria vit a New York.",
      questions: [
        {
          id: "q1",
          question: "Ou vit Maria ?",
          options: ["A Boston", "A New York", "A Chicago", "A Miami"],
          correct: 1,
          type: "location"
        }
      ],
      color: "from-green-400 to-emerald-500"
    },
    {
      level: 2,
      title: "Niveau 2 : Une phrase longue",
      difficulty: "Debutant",
      text: "Mon frere John travaille comme ingenieur logiciel dans une entreprise de technologie a San Francisco.",
      questions: [
        {
          id: "q1",
          question: "Quel est le metier de John ?",
          options: ["Enseignant", "Medecin", "Ingenieur logiciel", "Responsable des ventes"],
          correct: 2,
          type: "occupation"
        },
        {
          id: "q2",
          question: "Ou travaille John ?",
          options: ["A New York", "A Los Angeles", "A San Francisco", "A Seattle"],
          correct: 2,
          type: "location"
        }
      ],
      color: "from-blue-400 to-cyan-500"
    },
    {
      level: 3,
      title: "Niveau 3 : Deux phrases courtes",
      difficulty: "Elementaire",
      text: "Sarah est allee au supermarche hier. Elle a achete des legumes et des fruits frais.",
      questions: [
        {
          id: "q1",
          question: "Ou est allee Sarah ?",
          options: ["A la pharmacie", "Au supermarche", "A la bibliotheque", "A la banque"],
          correct: 1,
          type: "location"
        },
        {
          id: "q2",
          question: "Quand y est-elle allee ?",
          options: ["Aujourd'hui", "Demain", "Hier", "La semaine derniere"],
          correct: 2,
          type: "time"
        },
        {
          id: "q3",
          question: "Qu'a achete Sarah ?",
          options: ["Des vetements et des chaussures", "Des livres et des magazines", "Des legumes et des fruits", "De la viande et du poisson"],
          correct: 2,
          type: "detail"
        }
      ],
      color: "from-purple-400 to-pink-500"
    },
    {
      level: 4,
      title: "Niveau 4 : Deux phrases longues",
      difficulty: "Elementaire",
      text: "Tom prevoit de demenager a Boston le mois prochain parce qu'il a obtenu un nouveau travail dans un grand hopital la-bas. Il est tres enthousiaste pour cette opportunite et cherche deja un appartement pres du centre-ville.",
      questions: [
        {
          id: "q1",
          question: "Ou Tom va-t-il demenager ?",
          options: ["A Chicago", "A Boston", "A Miami", "A Denver"],
          correct: 1,
          type: "location"
        },
        {
          id: "q2",
          question: "Quand Tom va-t-il demenager ?",
          options: ["Cette semaine", "Le mois prochain", "L'annee prochaine", "Demain"],
          correct: 1,
          type: "time"
        },
        {
          id: "q3",
          question: "Pourquoi Tom demenage-t-il ?",
          options: ["Pour les vacances", "Pour etudier", "Il a obtenu un nouveau travail", "Pour visiter sa famille"],
          correct: 2,
          type: "reason"
        },
        {
          id: "q4",
          question: "Que cherche Tom ?",
          options: ["Une voiture", "Un appartement", "Un restaurant", "Une ecole"],
          correct: 1,
          type: "detail"
        }
      ],
      color: "from-orange-400 to-red-500"
    },
    {
      level: 5,
      title: "Niveau 5 : Trois phrases",
      difficulty: "Intermediaire",
      text: "Lisa apprend l'anglais depuis trois ans et elle fait de grands progres. La semaine derniere, elle a reussi un examen important avec une tres bonne note. Maintenant, elle prevoit de voyager en Angleterre l'ete prochain pour pratiquer son expression orale.",
      questions: [
        {
          id: "q1",
          question: "Depuis combien de temps Lisa apprend-elle l'anglais ?",
          options: ["Un an", "Deux ans", "Trois ans", "Quatre ans"],
          correct: 2,
          type: "duration"
        },
        {
          id: "q2",
          question: "Que s'est-il passe la semaine derniere ?",
          options: ["Elle a commence un cours", "Elle a reussi un examen", "Elle a voyage", "Elle a obtenu un travail"],
          correct: 1,
          type: "past_event"
        },
        {
          id: "q3",
          question: "Comment a-t-elle fait a l'examen ?",
          options: ["Elle a echoue", "Elle a eu une mauvaise note", "Elle a eu une tres bonne note", "Elle ne l'a pas passe"],
          correct: 2,
          type: "result"
        },
        {
          id: "q4",
          question: "Ou Lisa prevoit-elle d'aller ?",
          options: ["En France", "En Espagne", "En Angleterre", "En Italie"],
          correct: 2,
          type: "location"
        },
        {
          id: "q5",
          question: "Pourquoi veut-elle voyager la-bas ?",
          options: ["Pour les vacances", "Pour pratiquer l'expression orale", "Pour travailler", "Pour etudier la grammaire"],
          correct: 1,
          type: "purpose"
        }
      ],
      color: "from-indigo-400 to-purple-600"
    },
    {
      level: 6,
      title: "Niveau 6 : Histoire complexe",
      difficulty: "Intermediaire",
      text: "Ahmed a demenage aux Etats-Unis il y a deux ans pour poursuivre son reve de devenir medecin. Au debut, tout etait difficile parce qu'il ne parlait pas tres bien anglais et sa famille en Tunisie lui manquait. Cependant, il a etudie dur chaque jour, il s'est fait beaucoup de nouveaux amis et il a rejoint un club de conversation a l'universite. Maintenant, son anglais est bien meilleur, il se sent plus confiant et il reussit bien ses cours de medecine. Il appelle sa famille chaque semaine et leur parle de ses progres.",
      questions: [
        {
          id: "q1",
          question: "Quand Ahmed a-t-il demenage aux Etats-Unis ?",
          options: ["Il y a un an", "Il y a deux ans", "Il y a trois ans", "Il y a cinq ans"],
          correct: 1,
          type: "time"
        },
        {
          id: "q2",
          question: "Quel est l'objectif d'Ahmed ?",
          options: ["Devenir enseignant", "Devenir medecin", "Devenir ingenieur", "Devenir homme d'affaires"],
          correct: 1,
          type: "goal"
        },
        {
          id: "q3",
          question: "Qu'est-ce qui etait difficile au debut ?",
          options: ["Se faire des amis", "Trouver un logement", "Bien parler anglais", "Acheter de la nourriture"],
          correct: 2,
          type: "difficulty"
        },
        {
          id: "q4",
          question: "Qu'a fait Ahmed pour s'ameliorer ?",
          options: ["Il a quitte l'ecole", "Il est rentre chez lui", "Il a etudie dur et a rejoint un club", "Il a change de filiere"],
          correct: 2,
          type: "action"
        },
        {
          id: "q5",
          question: "Comment Ahmed s'en sort-il maintenant ?",
          options: ["Il a des difficultes", "Il reussit bien", "Il est rentre chez lui", "Il a change d'ecole"],
          correct: 1,
          type: "current_status"
        },
        {
          id: "q6",
          question: "A quelle frequence Ahmed appelle-t-il sa famille ?",
          options: ["Tous les jours", "Chaque semaine", "Chaque mois", "Chaque annee"],
          correct: 1,
          type: "frequency"
        }
      ],
      color: "from-pink-400 to-rose-600"
    }
  ];

  const speakText = (text: string): void => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Desole, votre navigateur ne prend pas en charge la synthese vocale.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleAnswerSelect = (questionId: string, optionIndex: number): void => {
    if (!showResults) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: optionIndex
      });
    }
  };

  const checkAnswers = () => {
    const currentActivity = activities[currentLevel];
    let correct = 0;
    
    currentActivity.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    
    const points = correct * 10;
    setScore(score + points);
    setShowResults(true);
    
    if (correct === currentActivity.questions.length) {
      setCompletedLevels([...completedLevels, currentLevel]);
    }
  };

  const nextLevel = () => {
    if (currentLevel < activities.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setSelectedAnswers({});
      setShowResults(false);
      stopSpeaking();
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setSelectedAnswers({});
    setShowResults(false);
    setCompletedLevels([]);
    stopSpeaking();
  };

  const currentActivity = activities[currentLevel];
  const allLevelsComplete = completedLevels.length === activities.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Headphones className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-6xl font-bold text-white">Ecouter et apprendre</h1>
            <Volume2 className="w-12 h-12 text-green-400 animate-pulse" />
          </div>
          <p className="text-xl text-blue-200">Activites d'ecoute progressives</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-blue-800/80 to-indigo-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center border-2 border-cyan-400/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-sm text-blue-200 font-medium">Score total</p>
              <p className="text-4xl font-bold text-white">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-blue-200 font-medium">Niveaux termines</p>
            <p className="text-4xl font-bold text-white">{completedLevels.length}/{activities.length}</p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reinitialiser</span>
          </button>
        </div>

        {/* Main Activity Card */}
        {!allLevelsComplete ? (
          <div className={`bg-gradient-to-br ${currentActivity.color} rounded-3xl shadow-2xl p-10 text-white border-4 border-white/20`}>
            <div className="flex flex-col items-center">
              {/* Level Header */}
              <div className="mb-6 text-center">
                <span className="bg-white/30 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider border-2 border-white/40">
                  {currentActivity.difficulty}
                </span>
                <h2 className="text-4xl font-bold mt-4">{currentActivity.title}</h2>
              </div>

              {/* Audio Player Section */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8 w-full border-2 border-white/30">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Headphones className="w-8 h-8" />
                  <p className="text-lg font-bold">Ecoutez attentivement</p>
                </div>
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => speakText(currentActivity.text)}
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
                   Vous pouvez lire l'audio autant de fois que necessaire
                </p>
              </div>

              {/* Questions Section */}
              <div className="w-full space-y-6">
                {currentActivity.questions.map((question, qIndex) => (
                  <div key={question.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                    <p className="text-xl font-bold mb-4">
                      Question {qIndex + 1} : {question.question}
                    </p>
                    
                    <div className="space-y-3">
                      {question.options.map((option, optIndex) => {
                        const isSelected = selectedAnswers[question.id] === optIndex;
                        const isCorrect = question.correct === optIndex;
                        const showCorrect = showResults && isCorrect;
                        const showWrong = showResults && isSelected && !isCorrect;

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleAnswerSelect(question.id, optIndex)}
                            disabled={showResults}
                            className={`w-full text-left p-4 rounded-lg font-medium transition-all border-2 ${
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
                              {showCorrect && <CheckCircle className="w-5 h-5" />}
                              {showWrong && <XCircle className="w-5 h-5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                {!showResults ? (
                  <button
                    onClick={checkAnswers}
                    disabled={Object.keys(selectedAnswers).length !== currentActivity.questions.length}
                    className={`px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl ${
                      Object.keys(selectedAnswers).length !== currentActivity.questions.length
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-900 hover:bg-yellow-100 hover:scale-105'
                    }`}
                  >
                    Valider les reponses
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelectedAnswers({});
                        setShowResults(false);
                      }}
                      className="px-10 py-5 rounded-2xl font-bold text-xl bg-white/80 text-gray-900 hover:bg-white transition-all hover:scale-105 shadow-2xl"
                    >
                      Reessayer
                    </button>
                    {currentLevel < activities.length - 1 && (
                      <button
                        onClick={nextLevel}
                        className="px-10 py-5 rounded-2xl font-bold text-xl bg-white text-gray-900 hover:bg-green-100 transition-all hover:scale-105 shadow-2xl border-4 border-green-300"
                      >
                        Niveau suivant 
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-12 text-white text-center border-4 border-yellow-300">
            <div className="text-9xl mb-6">ECOUTE</div>
            <Trophy className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-4">Maitre de l'ecoute !</h2>
            <p className="text-2xl mb-6">Vous avez termine les 6 niveaux !</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
              <p className="text-5xl font-bold">Score final : {score}</p>
            </div>
            <button
              onClick={resetGame}
              className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
            >
              S'entrainer a nouveau
            </button>
          </div>
        )}

        {/* Level Progress */}
        <div className="mt-8 flex justify-center gap-3">
          {activities.map((activity, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                completedLevels.includes(idx)
                  ? 'bg-green-500 ring-4 ring-green-300/50 text-white'
                  : idx === currentLevel
                  ? 'bg-cyan-500 scale-125 ring-4 ring-cyan-300/50 text-white'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Tips Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-400/30">
          <h3 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
            <Headphones className="w-6 h-6 text-cyan-400" />
            Conseils d'ecoute
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
            <p>Ecoutez 2 a 3 fois avant de repondre</p>
            <p>Concentrez-vous sur les mots cles et les noms</p>
            <p>Faites attention aux nombres et aux heures</p>
            <p>Ecoutez les mots interrogatifs (qui, quoi, quand, ou, pourquoi, comment)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningActivityGame;
