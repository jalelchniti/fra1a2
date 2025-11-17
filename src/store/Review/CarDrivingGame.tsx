import React, { useState, FC } from 'react';
import { Car, MapPin, AlertTriangle, Trophy, RotateCcw, Fuel, Navigation } from 'lucide-react';

interface DrivingPrompt {
  id: number;
  icon: React.ReactNode;
  title: string;
  question: string;
  keywords: string[];
  color: string;
  emoji: string;
}

const CarDrivingGame: FC = () => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [usedCards, setUsedCards] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const drivingPrompts: DrivingPrompt[] = [
    {
      id: 1,
      icon: <Car className="w-12 h-12" />,
      title: "First Time Behind the Wheel",
      question: "Tell me about the first time you drove a car. How did you feel?",
      keywords: ["drove", "felt", "was", "tried", "learned"],
      color: "from-red-500 to-pink-400",
      emoji: "🚗"
    },
    {
      id: 2,
      icon: <AlertTriangle className="w-12 h-12" />,
      title: "A Scary Moment",
      question: "Did you ever have a scary or dangerous moment while driving?",
      keywords: ["happened", "saw", "stopped", "avoided", "hit"],
      color: "from-orange-500 to-yellow-400",
      emoji: "⚠️"
    },
    {
      id: 3,
      icon: <Navigation className="w-12 h-12" />,
      title: "Lost on the Road",
      question: "Tell me about a time when you got lost while driving.",
      keywords: ["went", "turned", "missed", "found", "asked"],
      color: "from-blue-500 to-cyan-400",
      emoji: "🗺️"
    },
    {
      id: 4,
      icon: <Fuel className="w-12 h-12" />,
      title: "Car Problems",
      question: "Did your car ever break down or have a problem? What happened?",
      keywords: ["broke", "stopped", "called", "waited", "fixed"],
      color: "from-purple-500 to-indigo-400",
      emoji: "🔧"
    },
    {
      id: 5,
      icon: <Trophy className="w-12 h-12" />,
      title: "Passing Your Test",
      question: "Tell me about the day you passed your driving test.",
      keywords: ["took", "passed", "drove", "was", "felt"],
      color: "from-green-500 to-emerald-400",
      emoji: "🎉"
    },
    {
      id: 6,
      icon: <MapPin className="w-12 h-12" />,
      title: "Long Road Trip",
      question: "Describe a long car journey you took. Where did you go?",
      keywords: ["traveled", "drove", "stopped", "saw", "arrived"],
      color: "from-teal-500 to-blue-400",
      emoji: "🛣️"
    }
  ];

  const handleCardComplete = (points: number): void => {
    setScore(score + points);
    setUsedCards([...usedCards, currentCard]);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      const nextUnused = drivingPrompts.findIndex((_, idx) => 
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

  const currentPrompt = drivingPrompts[currentCard];
  const allCardsUsed = usedCards.length === drivingPrompts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="w-12 h-12 text-red-500" />
            <h1 className="text-5xl font-bold text-white">Driving Stories</h1>
            <Navigation className="w-12 h-12 text-blue-400" />
          </div>
          <p className="text-xl text-gray-300">Practice Simple Past Tense</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center border border-gray-700">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Points</p>
              <p className="text-3xl font-bold text-white">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Stories Shared</p>
            <p className="text-3xl font-bold text-white">{usedCards.length}/{drivingPrompts.length}</p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">Reset</span>
          </button>
        </div>

        {/* Main Card */}
        {!allCardsUsed ? (
          <div className={`bg-gradient-to-br ${currentPrompt.color} rounded-3xl shadow-2xl p-8 text-white transform transition-all duration-500 ${showFeedback ? 'scale-105' : 'scale-100'}`}>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-4">
                {currentPrompt.icon}
              </div>
              
              <div className="text-6xl mb-4">{currentPrompt.emoji}</div>
              
              <h2 className="text-3xl font-bold mb-4 text-center">{currentPrompt.title}</h2>
              <p className="text-xl text-center mb-8 leading-relaxed max-w-2xl">
                {currentPrompt.question}
              </p>

              {/* Keywords Helper */}
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full border border-white/20">
                <p className="text-sm font-semibold mb-3 text-center uppercase tracking-wide">
                  🎯 Use These Past Tense Verbs
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {currentPrompt.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-white/30 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-bold border border-white/40"
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
                    onClick={() => handleCardComplete(20)}
                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-110 shadow-xl border-4 border-white/50"
                  >
                    🏆 Amazing! +20 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(15)}
                    className="bg-white/90 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all hover:scale-110 shadow-xl"
                  >
                    ⭐ Good Job! +15 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(10)}
                    className="bg-white/70 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all hover:scale-110 shadow-xl"
                  >
                    👍 Nice Try! +10 pts
                  </button>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🎊</div>
                  <p className="text-3xl font-bold">Excellent Story!</p>
                  <p className="text-lg mt-2">Loading next card...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-12 text-white text-center">
            <div className="text-8xl mb-6">🏁</div>
            <Trophy className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Mission Complete!</h2>
            <p className="text-2xl mb-6">You shared all your driving stories!</p>
            <p className="text-4xl font-bold mb-8">Final Score: {score} points</p>
            <button
              onClick={resetGame}
              className="bg-white text-orange-600 px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
            >
              Drive Again 🚗
            </button>
          </div>
        )}

        {/* Card Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {drivingPrompts.map((_, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all ${
                usedCards.includes(idx)
                  ? 'bg-green-400 ring-2 ring-green-300'
                  : idx === currentCard
                  ? 'bg-orange-500 scale-125 ring-2 ring-orange-300'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Bonus Tip */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <p className="text-center text-gray-300">
            💡 <span className="font-bold text-white">Pro Tip:</span> Use time expressions like "when I was...", "one day...", "last year..." to make your stories more interesting!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDrivingGame;
