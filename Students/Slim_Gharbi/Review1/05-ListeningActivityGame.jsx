import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CheckCircle, XCircle, Trophy, RotateCcw, Headphones, Play, Pause } from 'lucide-react';

const ListeningActivityGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);

  const activities = [
    {
      level: 1,
      title: "Level 1: One Short Sentence",
      difficulty: "Beginner",
      text: "Maria lives in New York.",
      questions: [
        {
          id: "q1",
          question: "Where does Maria live?",
          options: ["In Boston", "In New York", "In Chicago", "In Miami"],
          correct: 1,
          type: "location"
        }
      ],
      color: "from-green-400 to-emerald-500"
    },
    {
      level: 2,
      title: "Level 2: One Long Sentence",
      difficulty: "Beginner",
      text: "My brother John works as a software engineer at a technology company in San Francisco.",
      questions: [
        {
          id: "q1",
          question: "What is John's job?",
          options: ["Teacher", "Doctor", "Software engineer", "Sales manager"],
          correct: 2,
          type: "occupation"
        },
        {
          id: "q2",
          question: "Where does John work?",
          options: ["New York", "Los Angeles", "San Francisco", "Seattle"],
          correct: 2,
          type: "location"
        }
      ],
      color: "from-blue-400 to-cyan-500"
    },
    {
      level: 3,
      title: "Level 3: Two Short Sentences",
      difficulty: "Elementary",
      text: "Sarah went to the supermarket yesterday. She bought fresh vegetables and fruit.",
      questions: [
        {
          id: "q1",
          question: "Where did Sarah go?",
          options: ["To the pharmacy", "To the supermarket", "To the library", "To the bank"],
          correct: 1,
          type: "location"
        },
        {
          id: "q2",
          question: "When did she go there?",
          options: ["Today", "Tomorrow", "Yesterday", "Last week"],
          correct: 2,
          type: "time"
        },
        {
          id: "q3",
          question: "What did Sarah buy?",
          options: ["Clothes and shoes", "Books and magazines", "Vegetables and fruit", "Meat and fish"],
          correct: 2,
          type: "detail"
        }
      ],
      color: "from-purple-400 to-pink-500"
    },
    {
      level: 4,
      title: "Level 4: Two Long Sentences",
      difficulty: "Elementary",
      text: "Tom is planning to move to Boston next month because he got a new job at a large hospital there. He is very excited about this opportunity and is already looking for an apartment near the city center.",
      questions: [
        {
          id: "q1",
          question: "Where is Tom going to move?",
          options: ["Chicago", "Boston", "Miami", "Denver"],
          correct: 1,
          type: "location"
        },
        {
          id: "q2",
          question: "When is Tom moving?",
          options: ["This week", "Next month", "Next year", "Tomorrow"],
          correct: 1,
          type: "time"
        },
        {
          id: "q3",
          question: "Why is Tom moving?",
          options: ["For vacation", "To study", "He got a new job", "To visit family"],
          correct: 2,
          type: "reason"
        },
        {
          id: "q4",
          question: "What is Tom looking for?",
          options: ["A car", "An apartment", "A restaurant", "A school"],
          correct: 1,
          type: "detail"
        }
      ],
      color: "from-orange-400 to-red-500"
    },
    {
      level: 5,
      title: "Level 5: Three Sentences",
      difficulty: "Intermediate",
      text: "Lisa has been learning English for three years and she is making great progress. Last week, she passed an important exam with a very high score. Now she is planning to travel to England next summer to practice her speaking skills.",
      questions: [
        {
          id: "q1",
          question: "How long has Lisa been learning English?",
          options: ["One year", "Two years", "Three years", "Four years"],
          correct: 2,
          type: "duration"
        },
        {
          id: "q2",
          question: "What happened last week?",
          options: ["She started a class", "She passed an exam", "She traveled", "She got a job"],
          correct: 1,
          type: "past_event"
        },
        {
          id: "q3",
          question: "How did she do on the exam?",
          options: ["She failed", "She got a low score", "She got a high score", "She didn't take it"],
          correct: 2,
          type: "result"
        },
        {
          id: "q4",
          question: "Where is Lisa planning to go?",
          options: ["France", "Spain", "England", "Italy"],
          correct: 2,
          type: "location"
        },
        {
          id: "q5",
          question: "Why does she want to travel there?",
          options: ["For vacation", "To practice speaking", "To work", "To study grammar"],
          correct: 1,
          type: "purpose"
        }
      ],
      color: "from-indigo-400 to-purple-600"
    },
    {
      level: 6,
      title: "Level 6: Complex Story",
      difficulty: "Intermediate",
      text: "Ahmed moved to the United States two years ago to pursue his dream of becoming a doctor. At first, everything was difficult because he didn't speak English very well and he missed his family in Tunisia. However, he studied hard every day, made many new friends, and joined a conversation club at his university. Now, his English is much better, he feels more confident, and he is doing well in his medical school classes. He calls his family every week and tells them about his progress.",
      questions: [
        {
          id: "q1",
          question: "When did Ahmed move to the USA?",
          options: ["One year ago", "Two years ago", "Three years ago", "Five years ago"],
          correct: 1,
          type: "time"
        },
        {
          id: "q2",
          question: "What is Ahmed's goal?",
          options: ["To be a teacher", "To be a doctor", "To be an engineer", "To be a businessman"],
          correct: 1,
          type: "goal"
        },
        {
          id: "q3",
          question: "What was difficult at first?",
          options: ["Making friends", "Finding a house", "Speaking English well", "Buying food"],
          correct: 2,
          type: "difficulty"
        },
        {
          id: "q4",
          question: "What did Ahmed do to improve?",
          options: ["He quit school", "He went home", "He studied hard and joined a club", "He changed majors"],
          correct: 2,
          type: "action"
        },
        {
          id: "q5",
          question: "How is Ahmed doing now?",
          options: ["He's struggling", "He's doing well", "He went back home", "He changed schools"],
          correct: 1,
          type: "current_status"
        },
        {
          id: "q6",
          question: "How often does Ahmed call his family?",
          options: ["Every day", "Every week", "Every month", "Every year"],
          correct: 1,
          type: "frequency"
        }
      ],
      color: "from-pink-400 to-rose-600"
    }
  ];

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
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

  const handleAnswerSelect = (questionId, optionIndex) => {
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
            <h1 className="text-6xl font-bold text-white">Listen & Learn</h1>
            <Volume2 className="w-12 h-12 text-green-400 animate-pulse" />
          </div>
          <p className="text-xl text-blue-200">Progressive Listening Activities</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-blue-800/80 to-indigo-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center border-2 border-cyan-400/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-sm text-blue-200 font-medium">Total Score</p>
              <p className="text-4xl font-bold text-white">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-blue-200 font-medium">Levels Completed</p>
            <p className="text-4xl font-bold text-white">{completedLevels.length}/{activities.length}</p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
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
                  <p className="text-lg font-bold">Listen Carefully</p>
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
                  💡 You can play the audio as many times as you need
                </p>
              </div>

              {/* Questions Section */}
              <div className="w-full space-y-6">
                {currentActivity.questions.map((question, qIndex) => (
                  <div key={question.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                    <p className="text-xl font-bold mb-4">
                      Question {qIndex + 1}: {question.question}
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
                    Submit Answers
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
                      Try Again
                    </button>
                    {currentLevel < activities.length - 1 && (
                      <button
                        onClick={nextLevel}
                        className="px-10 py-5 rounded-2xl font-bold text-xl bg-white text-gray-900 hover:bg-green-100 transition-all hover:scale-105 shadow-2xl border-4 border-green-300"
                      >
                        Next Level →
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-12 text-white text-center border-4 border-yellow-300">
            <div className="text-9xl mb-6">🎧</div>
            <Trophy className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-4">Listening Master!</h2>
            <p className="text-2xl mb-6">You completed all 6 levels!</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
              <p className="text-5xl font-bold">Final Score: {score}</p>
            </div>
            <button
              onClick={resetGame}
              className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
            >
              Practice Again
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
            Listening Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
            <p>🎧 Listen 2-3 times before answering</p>
            <p>📝 Focus on key words and names</p>
            <p>🔢 Pay attention to numbers and times</p>
            <p>❓ Listen for question words (who, what, when, where, why, how)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningActivityGame;
