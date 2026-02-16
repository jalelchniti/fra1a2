import React, { useState, FC } from 'react';
import { BookOpen, Clock, Calendar, History, RotateCcw, Trophy, Zap, Target } from 'lucide-react';



const SchoolLifeMixGame: FC = () => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [usedCards, setUsedCards] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const mixedPrompts = [
    {
      id: 1,
      icon: <History className="w-12 h-12" />,
      title: "Then vs Now",
      question: "What subjects did you study in school? Do you still use any of that knowledge today?",
      tenses: ["Simple Past", "Simple Present"],
      keywords: ["studied", "learned", "use", "remember", "know", "help"],
      color: "from-blue-500 via-cyan-500 to-teal-500",
      emoji: "📚➡️💡"
    },
    {
      id: 2,
      icon: <Clock className="w-12 h-12" />,
      title: "Learning Right Now",
      question: "What are you learning now? How is it different from what you learned in school?",
      tenses: ["Present Progressive", "Simple Past"],
      keywords: ["am learning", "am studying", "is teaching", "learned", "was", "studied"],
      color: "from-purple-500 via-pink-500 to-rose-500",
      emoji: "📖⏰"
    },
    {
      id: 3,
      icon: <Calendar className="w-12 h-12" />,
      title: "Future Plans",
      question: "What are you going to study when you move to America? Why did you choose this?",
      tenses: ["Going to Future", "Simple Past"],
      keywords: ["am going to study", "am going to learn", "want", "chose", "decided"],
      color: "from-orange-500 via-red-500 to-pink-500",
      emoji: "🎯🇺🇸"
    },
    {
      id: 4,
      icon: <Target className="w-12 h-12" />,
      title: "Skills & Progress",
      question: "What skills do you have now? Which ones are you improving? Which ones did you have before?",
      tenses: ["Simple Present", "Present Progressive", "Simple Past"],
      keywords: ["have", "know", "am improving", "am getting better", "had", "learned"],
      color: "from-green-500 via-emerald-500 to-cyan-500",
      emoji: "💪📈"
    },
    {
      id: 5,
      icon: <Zap className="w-12 h-12" />,
      title: "Daily Routine",
      question: "What do you do every day now? What did you do every day when you were in school?",
      tenses: ["Simple Present", "Simple Past"],
      keywords: ["wake up", "study", "work", "woke up", "went", "studied", "played"],
      color: "from-indigo-500 via-purple-500 to-fuchsia-500",
      emoji: "🌅📅"
    },
    {
      id: 6,
      icon: <BookOpen className="w-12 h-12" />,
      title: "The Big Picture",
      question: "Where are you going to be in 5 years? What are you doing now to prepare? What did you do in the past that helps you?",
      tenses: ["All Four Tenses"],
      keywords: ["am going to be", "am preparing", "am learning", "do", "learned", "studied", "want"],
      color: "from-yellow-400 via-orange-500 to-red-600",
      emoji: "🌟🚀"
    }
  ];

  const handleCardComplete = (points: number): void => {
    setScore(score + points);
    setUsedCards([...usedCards, currentCard]);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      const nextUnused = mixedPrompts.findIndex((_, idx) =>
        !usedCards.includes(idx) && idx !== currentCard
      );
      if (nextUnused !== -1) {
        setCurrentCard(nextUnused);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentCard(0);
    setScore(0);
    setUsedCards([]);
    setShowFeedback(false);
  };

  const currentPrompt = mixedPrompts[currentCard];
  const allCardsUsed = usedCards.length === mixedPrompts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <History className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-6xl font-bold text-white">Time Traveler</h1>
            <Calendar className="w-12 h-12 text-pink-400 animate-pulse" />
          </div>
          <p className="text-xl text-purple-200">Past • Present • Progressive • Future</p>
          <p className="text-lg text-purple-300 mt-2">Mix All Four Tenses!</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-purple-800/80 to-pink-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center border-2 border-purple-400/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-300" />
            <div>
              <p className="text-sm text-purple-200 font-medium">Master Points</p>
              <p className="text-4xl font-bold text-white">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-purple-200 font-medium">Challenges Done</p>
            <p className="text-4xl font-bold text-white">{usedCards.length}/{mixedPrompts.length}</p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Restart</span>
          </button>
        </div>

        {/* Main Card */}
        {!allCardsUsed ? (
          <div className={`bg-gradient-to-br ${currentPrompt.color} rounded-3xl shadow-2xl p-10 text-white transform transition-all duration-500 ${showFeedback ? 'scale-105 rotate-1' : 'scale-100'} border-4 border-white/20`}>
            <div className="flex flex-col items-center">
              {/* Tense Tags */}
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {currentPrompt.tenses.map((tense, idx) => (
                  <span
                    key={idx}
                    className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-white/40"
                  >
                    {tense}
                  </span>
                ))}
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-full p-6 mb-4 border-4 border-white/30">
                {currentPrompt.icon}
              </div>
              
              <div className="text-6xl mb-6">{currentPrompt.emoji}</div>
              
              <h2 className="text-4xl font-bold mb-6 text-center">{currentPrompt.title}</h2>
              
              <p className="text-2xl text-center mb-8 leading-relaxed max-w-2xl font-medium">
                {currentPrompt.question}
              </p>

              {/* Keywords Helper */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full border-2 border-white/30">
                <p className="text-lg font-bold mb-4 text-center uppercase tracking-wider flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  Key Phrases & Verbs
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {currentPrompt.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm px-5 py-3 rounded-full text-base font-bold border-2 border-white/50 hover:scale-110 transition-transform"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenge Reminder */}
              <div className="bg-yellow-400/20 backdrop-blur-sm rounded-xl p-4 mb-6 border-2 border-yellow-300/30">
                <p className="text-sm text-center font-semibold">
                  ⚡ CHALLENGE: Try to use ALL the tenses shown above! ⚡
                </p>
              </div>

              {/* Scoring Buttons */}
              {!showFeedback && (
                <div className="flex gap-4 flex-wrap justify-center">
                  <button
                    onClick={() => handleCardComplete(30)}
                    className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-yellow-100 transition-all hover:scale-110 shadow-2xl border-4 border-yellow-300"
                  >
                    🌟 Perfect Mix! +30 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(22)}
                    className="bg-white/90 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white transition-all hover:scale-110 shadow-2xl"
                  >
                    ⭐ Great! +22 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(15)}
                    className="bg-white/75 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/90 transition-all hover:scale-110 shadow-2xl"
                  >
                    👍 Good! +15 pts
                  </button>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-spin">⭐</div>
                  <p className="text-4xl font-bold">Time Master!</p>
                  <p className="text-xl mt-2">Next challenge loading...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-12 text-white text-center border-4 border-yellow-300">
            <div className="text-9xl mb-6 animate-bounce">🏆</div>
            <h2 className="text-5xl font-bold mb-4">Time Travel Complete!</h2>
            <p className="text-2xl mb-6">You mastered all four tenses!</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block border-2 border-white/30">
              <p className="text-5xl font-bold">Final Score: {score}</p>
            </div>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Amazing work! You can now talk about the past, present, what you're doing now, and your future plans! 🎉
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl border-4 border-white"
            >
              Time Travel Again ⏰
            </button>
          </div>
        )}

        {/* Card Navigation Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {mixedPrompts.map((_, idx) => (
            <div
              key={idx}
              className={`w-5 h-5 rounded-full transition-all ${
                usedCards.includes(idx)
                  ? 'bg-green-400 ring-4 ring-green-300/50'
                  : idx === currentCard
                  ? 'bg-pink-500 scale-150 ring-4 ring-pink-300/50'
                  : 'bg-purple-300/50'
              }`}
            />
          ))}
        </div>

        {/* Grammar Reference Box */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-400/30">
          <h3 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            Four Tenses - Quick Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Simple Present */}
            <div className="bg-cyan-500/20 backdrop-blur-sm p-6 rounded-xl border-2 border-cyan-400/40">
              <p className="font-bold text-cyan-300 mb-3 text-xl flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Simple Present
              </p>
              <p className="text-purple-200 text-sm mb-3">Habits, facts, routines</p>
              <div className="space-y-2 text-white">
                <p className="bg-black/20 p-2 rounded">• I <span className="font-bold text-cyan-300">study</span> English every day</p>
                <p className="bg-black/20 p-2 rounded">• He <span className="font-bold text-cyan-300">works</span> hard</p>
                <p className="bg-black/20 p-2 rounded">• They <span className="font-bold text-cyan-300">live</span> in Tunis</p>
              </div>
            </div>

            {/* Present Progressive */}
            <div className="bg-pink-500/20 backdrop-blur-sm p-6 rounded-xl border-2 border-pink-400/40">
              <p className="font-bold text-pink-300 mb-3 text-xl flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Present Progressive
              </p>
              <p className="text-purple-200 text-sm mb-3">Happening now, temporary</p>
              <div className="space-y-2 text-white">
                <p className="bg-black/20 p-2 rounded">• I <span className="font-bold text-pink-300">am learning</span> English</p>
                <p className="bg-black/20 p-2 rounded">• She <span className="font-bold text-pink-300">is teaching</span> me</p>
                <p className="bg-black/20 p-2 rounded">• We <span className="font-bold text-pink-300">are preparing</span> now</p>
              </div>
            </div>

            {/* Simple Past */}
            <div className="bg-orange-500/20 backdrop-blur-sm p-6 rounded-xl border-2 border-orange-400/40">
              <p className="font-bold text-orange-300 mb-3 text-xl flex items-center gap-2">
                <History className="w-5 h-5" />
                Simple Past
              </p>
              <p className="text-purple-200 text-sm mb-3">Finished actions in the past</p>
              <div className="space-y-2 text-white">
                <p className="bg-black/20 p-2 rounded">• I <span className="font-bold text-orange-300">studied</span> in school</p>
                <p className="bg-black/20 p-2 rounded">• He <span className="font-bold text-orange-300">went</span> to Tunis</p>
                <p className="bg-black/20 p-2 rounded">• We <span className="font-bold text-orange-300">learned</span> math</p>
              </div>
            </div>

            {/* Going to Future */}
            <div className="bg-green-500/20 backdrop-blur-sm p-6 rounded-xl border-2 border-green-400/40">
              <p className="font-bold text-green-300 mb-3 text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Going to Future
              </p>
              <p className="text-purple-200 text-sm mb-3">Plans, intentions</p>
              <div className="space-y-2 text-white">
                <p className="bg-black/20 p-2 rounded">• I <span className="font-bold text-green-300">am going to move</span> to USA</p>
                <p className="bg-black/20 p-2 rounded">• She <span className="font-bold text-green-300">is going to study</span></p>
                <p className="bg-black/20 p-2 rounded">• We <span className="font-bold text-green-300">are going to learn</span></p>
              </div>
            </div>

          </div>

          {/* Pro Tips */}
          <div className="mt-6 bg-yellow-400/20 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-300/30">
            <p className="font-bold text-yellow-300 mb-3 text-lg text-center">💡 Pro Tips for Mixing Tenses:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white text-sm">
              <p>✅ Use time words: <span className="font-bold">now, before, tomorrow, every day</span></p>
              <p>✅ Connect ideas: <span className="font-bold">but, and, because, so</span></p>
              <p>✅ Compare: <span className="font-bold">Then I..., now I..., soon I...</span></p>
              <p>✅ Be specific: Add <span className="font-bold">when, where, why, how</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolLifeMixGame;
