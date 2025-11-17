import React, { useState } from 'react';
import { BookOpen, Users, AlertCircle, Award, RotateCcw, GraduationCap, Frown, Smile } from 'lucide-react';

const SchoolMemoriesGame = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [usedCards, setUsedCards] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const schoolPrompts = [
    {
      id: 1,
      icon: <BookOpen className="w-12 h-12" />,
      title: "Favorite Subject",
      question: "What was your favorite subject in school? Why did you like it?",
      keywords: ["liked", "was", "enjoyed", "learned", "studied"],
      color: "from-blue-600 via-indigo-500 to-purple-600",
      emoji: "📖",
      mood: "positive"
    },
    {
      id: 2,
      icon: <Frown className="w-12 h-12" />,
      title: "Difficult Subject",
      question: "Tell me about a subject that was difficult for you. What problems did you have?",
      keywords: ["was", "had", "struggled", "didn't understand", "failed", "tried"],
      color: "from-red-500 via-orange-500 to-yellow-500",
      emoji: "😓",
      mood: "challenging"
    },
    {
      id: 3,
      icon: <Users className="w-12 h-12" />,
      title: "Best School Friend",
      question: "Who was your best friend at school? What did you do together?",
      keywords: ["was", "had", "played", "talked", "sat", "helped"],
      color: "from-green-500 via-emerald-500 to-teal-500",
      emoji: "👥",
      mood: "positive"
    },
    {
      id: 4,
      icon: <AlertCircle className="w-12 h-12" />,
      title: "A Bad Day",
      question: "Tell me about a bad day you had at school. What happened?",
      keywords: ["happened", "got", "was", "forgot", "lost", "broke"],
      color: "from-gray-600 via-slate-600 to-zinc-700",
      emoji: "😞",
      mood: "challenging"
    },
    {
      id: 5,
      icon: <Award className="w-12 h-12" />,
      title: "Proud Moment",
      question: "What was something good you did at school? A test, a project, a competition?",
      keywords: ["passed", "won", "made", "finished", "got", "received"],
      color: "from-yellow-400 via-amber-500 to-orange-500",
      emoji: "🏆",
      mood: "positive"
    },
    {
      id: 6,
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Leaving School",
      question: "Why did you leave school in 7th grade? How did you feel about it?",
      keywords: ["left", "stopped", "decided", "felt", "wanted", "needed"],
      color: "from-purple-600 via-violet-600 to-indigo-700",
      emoji: "🎓",
      mood: "reflective"
    }
  ];

  const handleCardComplete = (points) => {
    setScore(score + points);
    setUsedCards([...usedCards, currentCard]);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      const nextUnused = schoolPrompts.findIndex((_, idx) => 
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

  const currentPrompt = schoolPrompts[currentCard];
  const allCardsUsed = usedCards.length === schoolPrompts.length;

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'positive': return 'text-green-400';
      case 'challenging': return 'text-orange-400';
      case 'reflective': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
            <h1 className="text-6xl font-bold text-gray-800">School Memories</h1>
            <GraduationCap className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-xl text-gray-700">Share Your School Stories - Simple Past Tense</p>
        </div>

        {/* Score Board */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex justify-between items-center border-4 border-orange-200">
          <div className="flex items-center gap-3">
            <Award className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Memory Points</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Stories Shared</p>
            <p className="text-4xl font-bold text-gray-800">{usedCards.length}/{schoolPrompts.length}</p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Main Card */}
        {!allCardsUsed ? (
          <div className={`bg-gradient-to-br ${currentPrompt.color} rounded-3xl shadow-2xl p-10 text-white transform transition-all duration-500 ${showFeedback ? 'scale-105' : 'scale-100'} border-4 border-white/30`}>
            <div className="flex flex-col items-center">
              {/* Mood Indicator */}
              <div className="mb-4">
                <span className={`text-sm font-bold uppercase tracking-widest ${getMoodColor(currentPrompt.mood)} bg-white/20 px-4 py-2 rounded-full`}>
                  {currentPrompt.mood} memory
                </span>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-full p-6 mb-4 border-4 border-white/30">
                {currentPrompt.icon}
              </div>
              
              <div className="text-7xl mb-6">{currentPrompt.emoji}</div>
              
              <h2 className="text-4xl font-bold mb-6 text-center">{currentPrompt.title}</h2>
              
              <p className="text-2xl text-center mb-8 leading-relaxed max-w-2xl font-medium">
                {currentPrompt.question}
              </p>

              {/* Keywords Helper */}
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full border-2 border-white/30">
                <p className="text-lg font-bold mb-4 text-center uppercase tracking-wide flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Past Tense Verbs You Can Use
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {currentPrompt.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-white/30 backdrop-blur-sm px-5 py-3 rounded-full text-base font-bold border-2 border-white/40 hover:bg-white/40 transition-all"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Encouragement Text */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
                <p className="text-sm text-center italic">
                  💭 Take your time. It's okay to talk about difficult memories. This is practice!
                </p>
              </div>

              {/* Scoring Buttons */}
              {!showFeedback && (
                <div className="flex gap-4 flex-wrap justify-center">
                  <button
                    onClick={() => handleCardComplete(20)}
                    className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-yellow-50 transition-all hover:scale-110 shadow-2xl border-4 border-yellow-200"
                  >
                    🌟 Excellent! +20 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(15)}
                    className="bg-white/90 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white transition-all hover:scale-110 shadow-2xl"
                  >
                    ⭐ Very Good! +15 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(10)}
                    className="bg-white/75 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/90 transition-all hover:scale-110 shadow-2xl"
                  >
                    👏 Good Try! +10 pts
                  </button>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className="text-center">
                  <div className="text-8xl mb-4">✨</div>
                  <p className="text-4xl font-bold">Thank You for Sharing!</p>
                  <p className="text-xl mt-2">Next memory coming up...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-12 text-white text-center border-4 border-green-300">
            <div className="text-9xl mb-6">🎓</div>
            <Smile className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-4">All Memories Shared!</h2>
            <p className="text-2xl mb-6">You talked about all your school experiences!</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block border-2 border-white/30">
              <p className="text-5xl font-bold">Final Score: {score}</p>
            </div>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Great job practicing the past tense! Every story you share helps you speak better English. 🌟
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-emerald-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl border-4 border-white"
            >
              Share Again 📚
            </button>
          </div>
        )}

        {/* Card Navigation Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {schoolPrompts.map((prompt, idx) => (
            <div
              key={idx}
              className={`w-5 h-5 rounded-full transition-all relative group ${
                usedCards.includes(idx)
                  ? 'bg-green-500 ring-4 ring-green-300/50'
                  : idx === currentCard
                  ? 'bg-orange-500 scale-150 ring-4 ring-orange-300/50'
                  : 'bg-gray-400'
              }`}
            >
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {prompt.emoji}
              </span>
            </div>
          ))}
        </div>

        {/* Grammar Helper Box */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-xl border-4 border-orange-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6 text-orange-500" />
            Simple Past Tense - Quick Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
              <p className="font-bold text-blue-700 mb-3 text-lg">✅ Regular Verbs (+ed):</p>
              <div className="space-y-1 text-gray-700">
                <p>• study → <span className="font-bold">studied</span></p>
                <p>• play → <span className="font-bold">played</span></p>
                <p>• help → <span className="font-bold">helped</span></p>
                <p>• finish → <span className="font-bold">finished</span></p>
              </div>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-200">
              <p className="font-bold text-purple-700 mb-3 text-lg">⚡ Common Irregular Verbs:</p>
              <div className="space-y-1 text-gray-700">
                <p>• have → <span className="font-bold">had</span></p>
                <p>• go → <span className="font-bold">went</span></p>
                <p>• get → <span className="font-bold">got</span></p>
                <p>• feel → <span className="font-bold">felt</span></p>
              </div>
            </div>
            <div className="bg-orange-50 p-5 rounded-xl border-2 border-orange-200">
              <p className="font-bold text-orange-700 mb-3 text-lg">❌ Negative Form:</p>
              <div className="space-y-1 text-gray-700">
                <p>• I <span className="font-bold">didn't like</span> math</p>
                <p>• We <span className="font-bold">didn't go</span> to school</p>
                <p>• He <span className="font-bold">didn't understand</span></p>
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
              <p className="font-bold text-green-700 mb-3 text-lg">❓ Question Form:</p>
              <div className="space-y-1 text-gray-700">
                <p>• <span className="font-bold">Did you like</span> school?</p>
                <p>• <span className="font-bold">What did you study?</span></p>
                <p>• <span className="font-bold">Where did you sit?</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Supportive Note */}
        <div className="mt-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border-2 border-blue-200 text-center">
          <p className="text-gray-700 text-lg">
            <span className="font-bold text-purple-700">Remember:</span> Everyone has different school experiences. 
            It's okay to talk about challenges you faced. This helps you practice English! 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolMemoriesGame;
