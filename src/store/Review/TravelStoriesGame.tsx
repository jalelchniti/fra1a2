import React, { useState, FC } from 'react';
import { Plane, MapPin, Camera, Award, RotateCcw } from 'lucide-react';



const TravelStoriesGame: FC = () => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [usedCards, setUsedCards] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const travelPrompts = [
    {
      id: 1,
      icon: <Plane className="w-12 h-12" />,
      title: "Your First Flight",
      question: "Tell me about the first time you traveled by plane.",
      keywords: ["flew", "went", "was", "felt", "saw"],
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      icon: <MapPin className="w-12 h-12" />,
      title: "A Special Place",
      question: "Describe a place you visited that you really liked.",
      keywords: ["visited", "walked", "enjoyed", "ate", "took"],
      color: "from-green-500 to-emerald-400"
    },
    {
      id: 3,
      icon: <Camera className="w-12 h-12" />,
      title: "Memorable Moment",
      question: "What was the most memorable thing you did on a trip?",
      keywords: ["did", "went", "saw", "had", "made"],
      color: "from-purple-500 to-pink-400"
    },
    {
      id: 4,
      icon: <Plane className="w-12 h-12" />,
      title: "Travel Problem",
      question: "Did you ever have a problem while traveling? What happened?",
      keywords: ["lost", "forgot", "missed", "was", "helped"],
      color: "from-orange-500 to-red-400"
    },
    {
      id: 5,
      icon: <MapPin className="w-12 h-12" />,
      title: "Dream Destination",
      question: "Where did you dream about going when you were younger?",
      keywords: ["wanted", "dreamed", "hoped", "thought", "planned"],
      color: "from-indigo-500 to-blue-400"
    },
    {
      id: 6,
      icon: <Camera className="w-12 h-12" />,
      title: "Local Tourism",
      question: "Tell me about a place in Tunisia you visited with your family.",
      keywords: ["traveled", "stayed", "visited", "explored", "learned"],
      color: "from-teal-500 to-green-400"
    }
  ];

  const handleCardComplete = (points: number): void => {
    setScore(score + points);
    setUsedCards([...usedCards, currentCard]);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      const nextUnused = travelPrompts.findIndex((_, idx) => 
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

  const currentPrompt = travelPrompts[currentCard];
  const allCardsUsed = usedCards.length === travelPrompts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-800">Travel Stories</h1>
            <MapPin className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-xl text-gray-600">Practice Simple Past Tense</p>
        </div>

        {/* Score Board */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Points</p>
              <p className="text-3xl font-bold text-gray-800">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Cards Completed</p>
            <p className="text-3xl font-bold text-gray-800">{usedCards.length}/{travelPrompts.length}</p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">Reset</span>
          </button>
        </div>

        {/* Main Card */}
        {!allCardsUsed ? (
          <div className={`bg-gradient-to-br ${currentPrompt.color} rounded-3xl shadow-2xl p-8 text-white transform transition-all duration-500 ${showFeedback ? 'scale-105' : 'scale-100'}`}>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-6">
                {currentPrompt.icon}
              </div>
              
              <h2 className="text-3xl font-bold mb-4">{currentPrompt.title}</h2>
              <p className="text-xl text-center mb-8 leading-relaxed max-w-2xl">
                {currentPrompt.question}
              </p>

              {/* Keywords Helper */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full">
                <p className="text-sm font-semibold mb-3 text-center">Try to use these past tense verbs:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {currentPrompt.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-white/30 px-4 py-2 rounded-full text-sm font-medium"
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
                    onClick={() => handleCardComplete(15)}
                    className="bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                  >
                    Great Story! +15 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(10)}
                    className="bg-white/80 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all hover:scale-105 shadow-lg"
                  >
                    Good Try! +10 pts
                  </button>
                  <button
                    onClick={() => handleCardComplete(5)}
                    className="bg-white/60 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/80 transition-all hover:scale-105 shadow-lg"
                  >
                    Keep Going! +5 pts
                  </button>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className="text-center animate-bounce">
                  <p className="text-3xl font-bold">Excellent! 🎉</p>
                  <p className="text-lg mt-2">Moving to next card...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl p-12 text-white text-center">
            <Award className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Congratulations! 🎊</h2>
            <p className="text-2xl mb-6">You completed all travel stories!</p>
            <p className="text-3xl font-bold mb-8">Final Score: {score} points</p>
            <button
              onClick={resetGame}
              className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Card Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {travelPrompts.map((_, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all ${
                usedCards.includes(idx)
                  ? 'bg-green-500'
                  : idx === currentCard
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStoriesGame;
