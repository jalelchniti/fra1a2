import React, { FC } from 'react';

const SpeakingWorksheet02: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8 bg-gradient-to-r from-blue-700 to-blue-600 rounded-3xl p-6 text-white">
          <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">🎮 SPEAKING GAME LEVEL 2 🎮</h1>
          <div className="text-2xl opacity-90">Topics: Daily Activities & Time</div>
        </div>

        {/* Student Badge */}
        <div className="flex justify-between items-center bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl p-6 mb-8 text-white flex-wrap gap-4">
          <div>
            <span className="text-2xl font-bold block">👤 Student: Slim Gharbi</span>
            <span className="text-lg opacity-90">📅 SmartHub Educational Services</span>
          </div>
          <div className="bg-white text-red-600 px-6 py-3 rounded-full font-bold text-lg">⭐ Level: A1.2</div>
        </div>

        {/* GAME 1 */}
        <div className="mb-8 p-8 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-2xl border-4 border-blue-400">
          <div className="absolute -mt-12 -ml-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
            GAME 1
          </div>

          <h2 className="text-4xl font-bold text-blue-900 mb-4 mt-4">🕐 What Time is It? (With Activities)</h2>

          <div className="bg-white p-4 rounded-xl mb-6 border-l-4 border-green-600">
            <strong className="text-green-600">📋 HOW TO PLAY:</strong><br />
            Teacher shows a time/activity picture. Slim answers: "It's... (time) and I'm... (activity)"
            Each correct answer = 10 points! 🏆
          </div>

          <div className="bg-gradient-to-r from-cyan-100 to-pink-100 rounded-2xl p-4 mb-6">
            <h4 className="text-lg font-bold text-blue-700 mb-3">💡 Useful Phrases:</h4>
            <div className="flex flex-wrap gap-2">
              {['It\'s 8 o\'clock', 'It\'s half past', 'It\'s quarter to', 'I\'m sleeping', 'I\'m studying', 'I\'m eating', 'I\'m playing', 'I\'m working'].map(
                (phrase) => (
                  <span key={phrase} className="bg-white border-2 border-blue-600 text-blue-600 px-3 py-1 rounded-full font-bold text-sm">
                    {phrase}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-5 border-4 border-orange-400 text-center">
            <h3 className="text-2xl font-bold text-red-700 mb-2">🎯 Game 1 Score:</h3>
            <div className="text-3xl mb-2">⭐⭐⭐⭐</div>
            <div className="text-xl font-bold text-red-700">_____ / 50 points</div>
          </div>
        </div>

        {/* GAME 2 */}
        <div className="mb-8 p-8 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-2xl border-4 border-blue-400">
          <div className="absolute -mt-12 -ml-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
            GAME 2
          </div>

          <h2 className="text-4xl font-bold text-blue-900 mb-4 mt-4">📝 My Daily Schedule</h2>

          <div className="bg-white p-4 rounded-xl mb-6 border-l-4 border-green-600">
            <strong className="text-green-600">📋 HOW TO PLAY:</strong><br />
            Teacher asks about Slim's daily routine. Slim answers in full sentences!
            Each correct sentence = 15 points! 🌟
          </div>

          <div className="space-y-3">
            {[
              'What time do you wake up?',
              'What do you do in the morning?',
              'When do you have lunch?',
              'What activities do you do after school?',
              'What time do you go to bed?',
            ].map((question, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <strong className="text-blue-600">Question {idx + 1}:</strong> {question}
                <div className="mt-2">
                  Slim says: <span className="inline-block min-w-[250px] border-b-2 border-dotted border-blue-600">___________________</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-5 border-4 border-orange-400 text-center mt-6">
            <h3 className="text-2xl font-bold text-red-700 mb-2">🎯 Game 2 Score:</h3>
            <div className="text-3xl mb-2">⭐⭐⭐⭐⭐</div>
            <div className="text-xl font-bold text-red-700">_____ / 75 points</div>
          </div>
        </div>

        {/* FINAL SCORE */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-4xl font-bold mb-6">🏆 TODAY'S TOTAL SCORE 🏆</h3>
          <div className="text-5xl font-bold mb-6">_____ / 125 points</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: '🥇', range: '100-125', text: 'EXCELLENT!' },
              { emoji: '🥈', range: '75-99', text: 'GREAT JOB!' },
              { emoji: '🥉', range: '50-74', text: 'GOOD!' },
              { emoji: '📚', range: '0-49', text: 'PRACTICE MORE!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <div className="text-2xl">{item.emoji}</div>
                <div className="text-xs font-bold">{item.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingWorksheet02;
