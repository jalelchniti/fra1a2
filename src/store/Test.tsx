import React, { useState, useRef, useEffect, FC } from 'react';
import { Volume2, VolumeX, CheckCircle, XCircle, Trophy, RotateCcw, Headphones, Play, Pause, Eye, EyeOff, Download } from 'lucide-react';
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
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    const englishVoice = voices.find((v) => v.lang === 'en-US') || voices[0];
    if (englishVoice) {
      utterance.voice = englishVoice;
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
      testTitle: 'Listening Comprehension Test - Teacher Version',
      score: Math.round((score / testQuestions.length) * 100),
      correctAnswers: score,
      totalQuestions: testQuestions.length,
      testDate: new Date().toLocaleDateString(),
      questionBreakdown: testQuestions.map((q, idx) => ({
        questionNum: idx + 1,
        userAnswer: completedQuestions.includes(idx) ? 'Answered' : 'Not answered',
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
            <div className="text-9xl mb-6">🎓</div>
            <Trophy className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-4">Test Complete!</h2>
            <p className="text-2xl mb-6">You got {score} out of {testQuestions.length} correct</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
              <p className="text-5xl font-bold">Score: {Math.round((score / testQuestions.length) * 100)}%</p>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={handleDownloadPDF}
                className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-green-100 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              >
                <Download className="w-6 h-6" />
                Download PDF Report
              </button>
              <button
                onClick={resetTest}
                className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
              >
                Retake Test
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
            <h1 className="text-6xl font-bold text-white">Listening Comprehension Test</h1>
            <Volume2 className="w-12 h-12 text-green-400 animate-pulse" />
          </div>
          <p className="text-xl text-blue-200">Teacher Version - 20 Questions</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-blue-800/80 to-indigo-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center border-2 border-cyan-400/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-sm text-blue-200 font-medium">Score</p>
              <p className="text-4xl font-bold text-white">{score}/{testQuestions.length}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-blue-200 font-medium">Progress</p>
            <p className="text-4xl font-bold text-white">{completedQuestions.length + 1}/{testQuestions.length}</p>
          </div>
          <button
            onClick={resetTest}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            {showAnswers ? (
              <>
                <EyeOff className="w-5 h-5" />
                <span>Hide Answers</span>
              </>
            ) : (
              <>
                <Eye className="w-5 h-5" />
                <span>Show Answers</span>
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
                Question {currentQuestion + 1} of {testQuestions.length}
              </span>
              <p className="text-sm mt-2 text-white/80">Duration: {question.audioLength} | Level: {question.difficulty}</p>
            </div>

            {/* Audio Player Section */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8 w-full border-2 border-white/30">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Headphones className="w-8 h-8" />
                <p className="text-lg font-bold">Listen to the Question</p>
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
                  Play Audio
                </button>

                {isPlaying && (
                  <button
                    onClick={stopSpeaking}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    <Pause className="w-6 h-6" />
                    Stop
                  </button>
                )}
              </div>

              <p className="text-center text-sm mt-4 italic opacity-80">
                💡 You can play the audio as many times as needed
              </p>
            </div>

            {/* Hidden Question Text */}
            {showAnswers && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full border-2 border-white/30">
                <p className="text-center text-xl font-bold text-yellow-200">
                  Question (for teacher): {question.questionText}
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
                  Submit Answer
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
                    Try Again
                  </button>
                  {currentQuestion < testQuestions.length - 1 && (
                    <button
                      onClick={nextQuestion}
                      className="px-10 py-5 rounded-2xl font-bold text-xl bg-white text-gray-900 hover:bg-green-100 transition-all hover:scale-105 shadow-2xl border-4 border-green-300"
                    >
                      Next Question →
                    </button>
                  )}
                  {currentQuestion === testQuestions.length - 1 && (
                    <button
                      onClick={nextQuestion}
                      className="px-10 py-5 rounded-2xl font-bold text-xl bg-white text-gray-900 hover:bg-green-100 transition-all hover:scale-105 shadow-2xl border-4 border-green-300"
                    >
                      Finish Test 🎯
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
            <span className="font-bold text-white">Teacher Access Only:</span> This test assesses basic listening comprehension across 20 progressive questions. Use the "Show Answers" button to reveal question text while administering the test.
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
    questionText: 'What is the person greeting?',
    listeningAudio: 'Hello, how are you?',
    options: ['Saying goodbye', 'Greeting someone', 'Asking for help', 'Asking the time'],
    correctAnswer: 1,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 2,
    questionText: 'What does the person need?',
    listeningAudio: 'Can you help me, please?',
    options: ['Time', 'Money', 'Help', 'Food'],
    correctAnswer: 2,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 3,
    questionText: 'What is the person looking for?',
    listeningAudio: 'Where is the bathroom?',
    options: ['A restaurant', 'A school', 'A bathroom', 'A park'],
    correctAnswer: 2,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 4,
    questionText: 'What is the person thanking for?',
    listeningAudio: 'Thank you very much!',
    options: ['For help', 'For information', 'For speaking', 'For listening'],
    correctAnswer: 0,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },
  {
    id: 5,
    questionText: 'How does the person feel?',
    listeningAudio: 'I am very happy today.',
    options: ['Sad', 'Happy', 'Tired', 'Angry'],
    correctAnswer: 1,
    audioLength: '2 seconds',
    difficulty: 'beginner'
  },

  // Easy Level (Medium) - Questions 6-10
  {
    id: 6,
    questionText: 'What time is it?',
    listeningAudio: 'What time is it? It is three o clock in the afternoon.',
    options: ['Two o clock', 'Three o clock', 'Four o clock', 'Five o clock'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },
  {
    id: 7,
    questionText: 'What did the person buy?',
    listeningAudio: 'I went to the store and bought an apple, a banana, and some milk.',
    options: ['A pen and paper', 'An apple, banana, and milk', 'A shirt and shoes', 'A book and pencil'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },
  {
    id: 8,
    questionText: 'Where does the person live?',
    listeningAudio: 'I live in a small house near the park, very close to the school.',
    options: ['In a big apartment', 'In a small house near the park', 'In a tall building', 'On a farm'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },
  {
    id: 9,
    questionText: 'What is the person\'s job?',
    listeningAudio: 'My brother is a teacher. He works at the school every day.',
    options: ['Doctor', 'Teacher', 'Engineer', 'Farmer'],
    correctAnswer: 1,
    audioLength: '3 seconds',
    difficulty: 'easy'
  },
  {
    id: 10,
    questionText: 'What did the person do yesterday?',
    listeningAudio: 'Yesterday, I went to the park with my friends and we played football.',
    options: ['Went to school', 'Went to the park and played football', 'Stayed at home', 'Went shopping'],
    correctAnswer: 1,
    audioLength: '4 seconds',
    difficulty: 'easy'
  },

  // Intermediate Level (Longer) - Questions 11-20
  {
    id: 11,
    questionText: 'What are the colors mentioned?',
    listeningAudio: 'My favorite colors are blue and green. I like blue because it reminds me of the sky and the ocean.',
    options: ['Red and yellow', 'Blue and green', 'Purple and orange', 'Pink and white'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 12,
    questionText: 'When does the person have class?',
    listeningAudio: 'I have English class on Monday, Wednesday, and Friday. Each class is two hours long, from nine in the morning to eleven.',
    options: ['Tuesday and Thursday', 'Monday, Wednesday, Friday', 'Every day', 'Weekends only'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 13,
    questionText: 'What does the person like to eat for breakfast?',
    listeningAudio: 'Every morning, I eat cereal with milk and a banana. Sometimes I also drink orange juice. It is healthy and delicious.',
    options: ['Eggs and toast', 'Cereal with milk and banana', 'Pancakes and bacon', 'Just coffee'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 14,
    questionText: 'How many siblings does the person have?',
    listeningAudio: 'I have one sister and two brothers. My sister is the oldest. My brothers are younger than me. We all live together with our parents.',
    options: ['One sibling', 'Two siblings', 'Three siblings', 'Four siblings'],
    correctAnswer: 2,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 15,
    questionText: 'What is the person\'s favorite sport?',
    listeningAudio: 'My favorite sport is soccer. I play soccer with my friends every Saturday afternoon in the park. It is very fun and good exercise.',
    options: ['Basketball', 'Soccer', 'Tennis', 'Swimming'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 16,
    questionText: 'What are the person\'s plans for the weekend?',
    listeningAudio: 'This weekend, I am going to visit my grandmother. We will have lunch together and then watch a movie. I am excited to see her.',
    options: ['Go to the beach', 'Visit grandmother and watch a movie', 'Play sports', 'Study for exams'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 17,
    questionText: 'What are the weather conditions described?',
    listeningAudio: 'Yesterday was very hot and sunny. The temperature was thirty-five degrees. It was too hot to go outside. I stayed inside with the air conditioning.',
    options: ['Cold and rainy', 'Hot and sunny', 'Cold and snowy', 'Warm and cloudy'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 18,
    questionText: 'How often does the person exercise?',
    listeningAudio: 'I try to exercise at least three times a week. I usually go to the gym on Monday, Wednesday, and Friday. I also go for a walk on weekends.',
    options: ['Every day', 'Three times a week and walks on weekends', 'Twice a week', 'Once a week'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 19,
    questionText: 'What languages does the person speak?',
    listeningAudio: 'I speak English, French, and Arabic. I learned English at school. I learned French because my mother is from France. Arabic is my native language.',
    options: ['English and Spanish', 'English, French, and Arabic', 'English and German', 'Only English'],
    correctAnswer: 1,
    audioLength: '5 seconds',
    difficulty: 'intermediate'
  },
  {
    id: 20,
    questionText: 'What did the person learn about at school today?',
    listeningAudio: 'Today in science class, we learned about different types of animals. We studied mammals, birds, and fish. We also learned about their habitats and how they live. It was very interesting.',
    options: ['Mathematics', 'History', 'Different types of animals', 'English grammar'],
    correctAnswer: 2,
    audioLength: '6 seconds',
    difficulty: 'intermediate'
  }
];

export default Test;
