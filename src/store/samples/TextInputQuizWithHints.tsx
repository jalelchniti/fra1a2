import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface QuizItem {
  type: 'mc' | 'type';
  sentence: string;
  question: string;
  options?: string[];
  correct: string;
  positive: string;
  negative: string;
  hint?: string;
}

interface Flashcard {
  sentence: string;
  question: string;
  answer: string;
  hint?: string;
}

const flashcards: Flashcard[] = [
  { sentence: "Je dois reserver une chambre d'hotel.", question: "Que dois-je faire ?", answer: "Vous devez reserver une chambre d'hotel.", hint: "reserver une chambre d'hotel" },
  { sentence: "Ou est la gare la plus proche ?", question: "Qu'est-ce que je demande ?", answer: "Vous demandez ou est la gare la plus proche.", hint: "gare la plus proche" },
  { sentence: "Puis-je avoir un plan, s'il vous plait ?", question: "De quoi ai-je besoin ?", answer: "Vous avez besoin d'un plan.", hint: "plan" },
  { sentence: "Combien coute un billet pour Paris ?", question: "Qu'est-ce que je demande ?", answer: "Vous demandez le prix d'un billet pour Paris.", hint: "prix d'un billet" },
  { sentence: "Je voudrais louer une voiture.", question: "Que veux-je faire ?", answer: "Vous voulez louer une voiture.", hint: "louer une voiture" },
  { sentence: "Le musee est ouvert jusqu'a 18 h.", question: "Quand le musee ferme-t-il ?", answer: "Le musee ferme a 18 h.", hint: "18 h" },
  { sentence: "J'ai perdu mon portefeuille.", question: "Que s'est-il passe ?", answer: "Vous avez perdu votre portefeuille.", hint: "perdu mon portefeuille" },
  { sentence: "Ou puis-je changer de la monnaie ?", question: "Que suis-je en train de chercher ?", answer: "Vous cherchez un endroit pour changer de la monnaie.", hint: "changer de la monnaie" },
  { sentence: "La visite commence a 9 h.", question: "Quand la visite commence-t-elle ?", answer: "Elle commence a 9 h.", hint: "9 h" },
  { sentence: "J'ai besoin d'un adaptateur pour mon telephone.", question: "De quoi ai-je besoin ?", answer: "Vous avez besoin d'un adaptateur pour votre telephone.", hint: "adaptateur" },
];

const quizData: QuizItem[] = flashcards.map((card) => ({
  type: 'type',
  sentence: card.sentence,
  question: card.question,
  correct: card.answer,
  positive: 'Bonne reponse !',
  negative: 'Mauvaise reponse.',
  hint: card.hint,
}));

const InteractiveTypeAnswerQuiz: React.FC = () => {
  // State management
  const [shuffledQuizData, setShuffledQuizData] = useState<QuizItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{question: string, userAnswer: string, correct: string, isCorrect: boolean}[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');

  const shuffleQuizData = React.useCallback(() => {
    return [...quizData].sort(() => Math.random() - 0.5);
  }, []);

  const resetQuiz = React.useCallback(() => {
    const shuffled = shuffleQuizData();
    setShuffledQuizData(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTypedAnswer('');
    setAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setHintLevel(0);
    setShowHint(false);
    setHintText('');
  }, [shuffleQuizData]);

  // Initialize and shuffle quiz data
  React.useEffect(() => {
    resetQuiz();
  }, [resetQuiz]);

  // Play the TTS for the current sentence when the question changes
  React.useEffect(() => {
    if (shuffledQuizData.length > 0 && currentQuestion < shuffledQuizData.length) {
      speakSentence(shuffledQuizData[currentQuestion].sentence);
    }
  }, [currentQuestion, shuffledQuizData]);

  // Shuffle options for current multiple choice question
  React.useEffect(() => {
    if (shuffledQuizData.length > 0 && currentQuestion < shuffledQuizData.length) {
      const current = shuffledQuizData[currentQuestion];
      if (current.type === 'mc' && current.options) {
        setShuffledOptions([...current.options].sort(() => Math.random() - 0.5));
      }
    }
  }, [currentQuestion, shuffledQuizData]);

  const speakSentence = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;

      utterance.onend = () => {
        setAudioPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const speakFeedback = (text: string) => {
    if ('speechSynthesis' in window) {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        window.speechSynthesis.speak(utterance);
      }, 500);
    }
  };

  const getHint = () => {
    if (!shuffledQuizData[currentQuestion] || shuffledQuizData[currentQuestion].type !== 'type') return;

    const correctAnswer = shuffledQuizData[currentQuestion].correct;
    setShowHint(true);

    const newHintLevel = Math.min(hintLevel + 1, correctAnswer.length);
    setHintLevel(newHintLevel);

    let hint = '';
    for (let i = 0; i < correctAnswer.length; i++) {
      if (i < newHintLevel) {
        hint += correctAnswer[i];
      } else if (correctAnswer[i] === ' ') {
        hint += ' ';
      } else {
        hint += '_';
      }
    }
    setHintText(hint);

    if (typedAnswer === '') {
      setTypedAnswer(hint.replace(/_/g, ''));
    }
  };

  const handleOptionSelect = (option: string) => {
    if (answered) return;
    setSelectedAnswer(option);
    setAnswered(true);

    const currentItem = shuffledQuizData[currentQuestion];
    const isCorrect = option === currentItem.correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
      speakFeedback(currentItem.positive);
    } else {
      speakFeedback(`${currentItem.negative} La bonne reponse est : ${currentItem.correct}`);
    }

    setUserAnswers(prev => [...prev, {
      question: currentItem.question,
      userAnswer: option,
      correct: currentItem.correct,
      isCorrect
    }]);
  };

  const handleTypeSubmit = () => {
    if (answered) return;
    setAnswered(true);

    const currentItem = shuffledQuizData[currentQuestion];
    const normalizedUserAnswer = typedAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentItem.correct.toLowerCase();
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      speakFeedback(currentItem.positive);
    } else {
      speakFeedback(`${currentItem.negative} La bonne reponse est : ${currentItem.correct}`);
    }

    setUserAnswers(prev => [...prev, {
      question: currentItem.question,
      userAnswer: typedAnswer,
      correct: currentItem.correct,
      isCorrect
    }]);
  };

  const nextQuestion = () => {
    // If not answered, record it as skipped (empty answer, incorrect)
    if (!answered && currentQuestion < shuffledQuizData.length) {
      const currentItem = shuffledQuizData[currentQuestion];
      setUserAnswers(prev => [...prev, {
        question: currentItem.question,
        userAnswer: '',
        correct: currentItem.correct,
        isCorrect: false
      }]);
    }

    if (currentQuestion < shuffledQuizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setAnswered(false);
      setHintLevel(0);
      setShowHint(false);
      setHintText('');
    } else {
      setQuizCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const prevAnswer = userAnswers[currentQuestion - 1];
      if (prevAnswer) {
        setSelectedAnswer(prevAnswer.userAnswer);
        setTypedAnswer(prevAnswer.userAnswer);
        setAnswered(true);
      } else {
        setSelectedAnswer(null);
        setTypedAnswer('');
        setAnswered(false);
      }
      setHintLevel(0);
      setShowHint(false);
      setHintText('');
    }
  };

  const repeatSentence = () => {
    if (shuffledQuizData.length > 0 && currentQuestion < shuffledQuizData.length) {
      speakSentence(shuffledQuizData[currentQuestion].sentence);
    }
  };

  const progressPercentage = ((currentQuestion + 1) / shuffledQuizData.length) * 100;
  const currentItem = shuffledQuizData[currentQuestion];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Card className="p-10 w-full min-w-[600px] max-w-2xl shadow-xl rounded-xl bg-white border-2 border-indigo-200">
        {!quizCompleted ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-800 text-center flex-grow">
                Ecoutez et repondez
              </h2>
              <motion.button
                onClick={repeatSentence}
                className={`flex items-center justify-center w-12 h-12 ${audioPlaying ? 'bg-green-500' : 'bg-indigo-600'} text-white p-3 rounded-full hover:bg-indigo-700 shadow-md`}
                title="Reecouter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {audioPlaying ? (
                  <span className="text-xs font-bold">SON</span>
                ) : (
                  <span className="text-xs font-bold">SON</span>
                )}
              </motion.button>
            </div>

            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200 mb-6">
              <h3 className="text-2xl font-medium text-indigo-900 mb-3 text-center">
                {currentItem?.question}
              </h3>

              {currentItem?.hint && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                  <p className="font-medium text-green-700 text-center">
                    Indice : <span className="text-green-900 font-bold">{currentItem.hint}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="w-full mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-700">Progression</span>
                <span className="text-sm font-medium text-indigo-700">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full h-3 bg-gray-200" />
              <p className="text-sm font-medium text-gray-700 mt-2 text-right">
                Question {currentQuestion + 1} sur {shuffledQuizData.length}
              </p>
            </div>

            {currentItem?.type === 'mc' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {shuffledOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full text-lg py-4 rounded-lg font-medium shadow-sm border-2 ${
                      answered
                        ? option === currentItem.correct
                          ? 'bg-green-500 text-white border-green-600'
                          : selectedAnswer === option
                            ? 'bg-red-500 text-white border-red-600'
                            : 'bg-gray-100 text-gray-800 border-gray-300'
                        : 'bg-white text-indigo-800 border-indigo-300 hover:bg-indigo-50'
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    disabled={answered}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {currentItem?.type === 'type' && (
              <div className="mb-6">
                <div className="mb-4">
                  <label htmlFor="answer-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Tapez votre reponse :
                  </label>
                  <Input
                    id="answer-input"
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="Tapez votre reponse ici..."
                    className="w-full text-lg py-6 px-4 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={answered}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !answered) {
                        handleTypeSubmit();
                      }
                    }}
                  />
                </div>

                {showHint && !answered && (
                  <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="font-medium text-yellow-800">Indice : {hintText}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleTypeSubmit}
                    disabled={answered}
                    className="flex-1 bg-indigo-600 text-white text-lg hover:bg-indigo-700 py-4 rounded-lg font-bold shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Valider la reponse
                  </motion.button>

                  {!answered && currentItem?.type === 'type' && (
                    <Button
                      onClick={getHint}
                      disabled={hintLevel >= currentItem.correct.length || answered}
                      className="bg-yellow-500 text-white text-lg hover:bg-yellow-600 py-4 px-4 rounded-lg font-bold shadow-md"
                    >
                      Besoin d'un indice
                    </Button>
                  )}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-5 rounded-lg shadow-md ${
                      userAnswers[currentQuestion]?.isCorrect
                        ? 'bg-green-100 border-l-4 border-green-500 text-green-800'
                        : 'bg-red-100 border-l-4 border-red-500 text-red-800'
                    }`}
                  >
                    <p className="font-bold text-lg mb-1">
                      {userAnswers[currentQuestion]?.isCorrect
                        ? 'OK ' + currentItem.positive
                        : 'NON ' + currentItem.negative}
                    </p>
                    {!userAnswers[currentQuestion]?.isCorrect && (
                      <p className="font-medium">
                        La bonne reponse est : <span className="underline">{currentItem.correct}</span>
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-between items-center">
              <motion.button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-6 py-3 rounded-full font-bold shadow-md ${
                  currentQuestion === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-800'
                }`}
                whileHover={currentQuestion !== 0 ? { scale: 1.05 } : {}}
                whileTap={currentQuestion !== 0 ? { scale: 0.95 } : {}}
              >
                Precedent
              </motion.button>

              <motion.button
                onClick={nextQuestion}
                // Removed disabled={!answered} to allow skipping
                className="flex items-center px-6 py-3 rounded-full font-bold shadow-md bg-indigo-600 text-white hover:bg-indigo-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestion === shuffledQuizData.length - 1 ? 'Terminer' : 'Suivant'}
              </motion.button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-indigo-800 mb-2">Quiz termine !</h2>
              <div className="bg-indigo-100 p-5 rounded-lg mb-8">
                <p className="text-3xl font-bold text-indigo-900">
                  Votre score : {score} / {shuffledQuizData.length}
                </p>
                <p className="text-xl font-medium text-indigo-700">
                  ({Math.round((score / shuffledQuizData.length) * 100)}%)
                </p>
              </div>
            </motion.div>

            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-300 pb-2 mb-4">Revisez vos reponses</h3>
              {userAnswers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-lg shadow-md border-l-4 ${
                    answer.isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-lg text-gray-800">{index + 1}. {answer.question}</p>
                    <motion.button
                      onClick={() => speakSentence(shuffledQuizData[index].sentence)}
                      className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 text-sm flex items-center justify-center w-8 h-8 shadow-sm"
                      title="Reecouter la phrase"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-xs font-bold">SON</span>
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">Votre reponse :</p>
                      <p className={`font-medium ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {answer.userAnswer || '(Passe)'}
                      </p>
                    </div>
                    {!answer.isCorrect && (
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Bonne reponse :</p>
                        <p className="font-medium text-green-600">{answer.correct}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
              <motion.button
                onClick={resetQuiz}
                className="w-full bg-amber-500 text-white text-lg hover:bg-amber-600 py-4 rounded-lg font-bold shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Reessayer
              </motion.button>

              {/* Removed the Retour aux cartes button */}
              {/* <motion.button
                onClick={goToFlashcards}
                className="w-full bg-green-600 text-white text-lg hover:bg-green-700 py-4 rounded-lg font-bold shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Retour aux cartes
              </motion.button> */}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InteractiveTypeAnswerQuiz;
