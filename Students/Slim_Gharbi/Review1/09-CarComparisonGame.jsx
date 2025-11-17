import React, { useState } from 'react';
import { Car, Zap, DollarSign, Star, Trophy, RotateCcw, Gauge, Shield } from 'lucide-react';

const CarComparisonGame = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [usedCards, setUsedCards] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const comparisonPrompts = [
    {
      id: 1,
      icon: <Zap className="w-12 h-12" />,
      title: "Speed Comparison",
      cars: ["Sports Car", "Family Sedan", "SUV"],
      question: "Compare these three vehicles. Which is faster? Which is the fastest?",
      keywords: ["fast", "faster than", "the fastest", "not as fast as", "slower"],
      color: "from-yellow-400 via-orange-500 to-red-500",
      emoji: "⚡"
    },
    {
      id: 2,
      icon: <DollarSign className="w-12 h-12" />,
      title: "Price Battle",
      cars: ["BMW", "Toyota", "Ferrari"],
      question: "Talk about the prices of these cars. Which is more expensive?",
      keywords: ["expensive", "more expensive than", "the most expensive", "cheaper", "not as expensive as"],
      color: "from-green-400 via-emerald-500 to-teal-600",
      emoji: "💰"
    },
    {
      id: 3,
      icon: <Star className="w-12 h-12" />,
      title: "Comfort Level",
      cars: ["Luxury Sedan", "Compact Car", "Pickup Truck"],
      question: "Which vehicle is more comfortable? Compare their comfort levels.",
      keywords: ["comfortable", "more comfortable than", "the most comfortable", "not as comfortable as"],
      color: "from-purple-400 via-pink-500 to-rose-500",
      emoji: "🛋️"
    },
    {
      id: 4,
      icon: <Shield className="w-12 h-12" />,
      title: "Safety First",
      cars: ["Volvo", "Motorcycle", "Bus"],
      question: "Compare the safety of these vehicles. Which is safer?",
      keywords: ["safe", "safer than", "the safest", "dangerous", "not as safe as"],
      color: "from-blue-400 via-indigo-500 to-purple-600",
      emoji: "🛡️"
    },
    {
      id: 5,
      icon: <Gauge className="w-12 h-12" />,
      title: "Size Matters",
      cars: ["Hummer", "Mini Cooper", "Van"],
      question: "Compare the sizes of these vehicles. Which is bigger? Which is the biggest?",
      keywords: ["big", "bigger than", "the biggest", "small", "smaller", "not as big as"],
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      emoji: "📏"
    },
    {
      id: 6,
      icon: <Car className="w-12 h-12" />,
      title: "Dream Car Choice",
      cars: ["Tesla", "Mercedes", "Porsche"],
      question: "Which car is better for living in America? Compare all features.",
      keywords: ["good", "better than", "the best", "practical", "more practical", "modern"],
      color: "from-orange-400 via-red-500 to-pink-600",
      emoji: "🏆"
    }
  ];

  const handleCardComplete = (points) => {
    setScore(score + points);
    setUsedCards([...usedCards, currentCard]);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      const nextUnused = comparisonPrompts.findIndex((_, idx) => 
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

  const currentPrompt = comparisonPrompts[currentCard];
  const allCardsUsed = usedCards.length === comparisonPrompts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="w-12 h-12 text-orange-500 animate-pulse" />
            <h1 className="text-6xl font-bold text-white">Car Showdown</h1>
            <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300">Practice Comparatives & Superlatives</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center border-2 border-orange-500/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Score</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Comparisons Done</p>
            <p className="text-4xl font-bold text-white">{usedCards.length}/{comparisonPrompts.length}</p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Restart</span>
          </button>
        </div>

        {/* Main Card */}
        {!allCardsUsed ? (
          <div className={`bg-gradient-to-br ${currentPrompt.color} rounded-3xl shadow-2xl p-10 text-white transform transition-all duration-500 ${showFeedback ? 'scale-105 rotate-1' : 'scale-100'} border-4 border-white/20`}>
            <div className="flex flex-col items-center">
              <div className="bg-white/30 backdrop-blur-md rounded-full p-6 mb-4 border-4 border-white/40">
                {currentPrompt.icon}
              </div>
              
              <div className="text-7xl mb-4 animate-bounce">{currentPrompt.emoji}</div>
              
              <h2 className="text-4xl font-bold mb-6 text-center">{currentPrompt.title}</h2>

              {/* Cars Display */}
              <div className="flex gap-6 mb-8 flex-wrap justify-center">
                {currentPrompt.cars.map((car, idx) => (
                  <div key={idx} className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl border-2 border-white/40">
                    <Car className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-lg font-bold text-center">{car}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-2xl text-center mb-8 leading-relaxed max-w-2xl font-medium">
                {currentPrompt.question}
              </p>

              {/* Keywords Helper */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full border-2 border-white/30">
                <p className="text-lg font-bold mb-4 text-center uppercase tracking-wider">
                  🎯 Comparison Words to Use
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {currentPrompt.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-white/40 backdrop-blur-sm px-5 py-3 rounded-full text-base font-bold border-2 border-white/50 hover:scale-110 transition-transform"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scoring Buttons */}
              {!showFeedback && (
                <div className="flex gap-4 flex-wrap justify-center">
                  <button
                    onClick={() => handleCardComplete(25)}
                    className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-yellow-100 transition-all hover:scale-110 shadow-2xl border-4 border-yellow-300"
                  >
                    🌟 Perfect! +25 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(18)}
                    className="bg-white/90 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white transition-all hover:scale-110 shadow-2xl"
                  >
                    ⭐ Great! +18 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(12)}
                    className="bg-white/70 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/90 transition-all hover:scale-110 shadow-2xl"
                  >
                    👍 Good! +12 pts
                  </button>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-spin">🎯</div>
                  <p className="text-4xl font-bold">Excellent Comparison!</p>
                  <p className="text-xl mt-2">Next challenge loading...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-12 text-white text-center border-4 border-yellow-300">
            <div className="text-9xl mb-6 animate-bounce">🏆</div>
            <h2 className="text-5xl font-bold mb-4">Champion Status!</h2>
            <p className="text-2xl mb-6">You mastered all car comparisons!</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
              <p className="text-5xl font-bold">Final Score: {score}</p>
            </div>
            <button
              onClick={resetGame}
              className="bg-white text-orange-600 px-14 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl border-4 border-white"
            >
              Race Again 🏁
            </button>
          </div>
        )}

        {/* Card Navigation Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {comparisonPrompts.map((_, idx) => (
            <div
              key={idx}
              className={`w-5 h-5 rounded-full transition-all ${
                usedCards.includes(idx)
                  ? 'bg-green-400 ring-4 ring-green-300/50'
                  : idx === currentCard
                  ? 'bg-orange-500 scale-150 ring-4 ring-orange-300/50'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Grammar Helper Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-400/30">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">📚 Quick Grammar Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <div className="bg-black/20 p-4 rounded-xl">
              <p className="font-bold text-yellow-400 mb-2">Comparative (-er / more):</p>
              <p className="text-sm">• fast → faster than</p>
              <p className="text-sm">• expensive → more expensive than</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl">
              <p className="font-bold text-green-400 mb-2">Superlative (-est / most):</p>
              <p className="text-sm">• fast → the fastest</p>
              <p className="text-sm">• expensive → the most expensive</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl">
              <p className="font-bold text-orange-400 mb-2">Equal Comparison:</p>
              <p className="text-sm">• not as fast as</p>
              <p className="text-sm">• not as expensive as</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl">
              <p className="font-bold text-purple-400 mb-2">Irregular Forms:</p>
              <p className="text-sm">• good → better → the best</p>
              <p className="text-sm">• bad → worse → the worst</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarComparisonGame;
