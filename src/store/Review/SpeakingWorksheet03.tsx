import React, { FC } from 'react';

const SpeakingWorksheet03: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-green-600 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8 bg-gradient-to-r from-green-600 to-teal-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-9xl opacity-10">🎯</div>
          <h1 className="text-5xl font-bold mb-2 relative z-10">🎮 SPEAKING GAME LEVEL 3 🎮</h1>
          <div className="text-2xl opacity-90 relative z-10">Topics: Verb To Be & Present Simple</div>
        </div>

        {/* Student Info */}
        <div className="flex justify-between items-center bg-gradient-to-r from-red-500 to-yellow-400 rounded-2xl p-6 mb-8 text-white flex-wrap gap-4">
          <div className="font-bold text-lg">👤 Student: Slim Gharbi</div>
          <div className="bg-white text-red-500 px-6 py-2 rounded-full font-bold">⭐ Level: A1.3</div>
        </div>

        {/* GAME 1 */}
        <div className="mb-8 p-8 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-2xl border-4 border-yellow-400 relative">
          <div className="absolute -top-6 left-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-bold">🎯 GAME 1</div>

          <h2 className="text-4xl font-bold text-red-700 mb-4 mt-4">Is it True or False? (Verb To Be)</h2>

          <div className="bg-white p-4 rounded-xl mb-6 border-l-4 border-green-600">
            <strong className="text-green-600">📋 HOW TO PLAY:</strong><br />
            Teacher makes a statement. Slim says "True" or "False" and explains using "To Be" verb.
            Each correct answer = 12 points! 🏆
          </div>

          <div className="space-y-3 mb-6">
            {[
              'Statement 1: "I am a teacher"',
              'Statement 2: "You are 25 years old"',
              'Statement 3: "Tunisia is in Africa"',
              'Statement 4: "We are students"',
              'Statement 5: "They are from France"',
            ].map((stmt, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                <div className="font-bold text-green-700">{stmt}</div>
                <div className="mt-2">
                  Slim answers:
                  <span className="inline-block min-w-[200px] border-b-2 border-dotted border-green-600 ml-2">_______________</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-xl p-4 border-4 border-orange-400 text-center">
            <h3 className="font-bold text-red-700 text-lg">🎯 Game 1 Score: _____ / 60 points</h3>
          </div>
        </div>

        {/* GAME 2 */}
        <div className="mb-8 p-8 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-2xl border-4 border-yellow-400 relative">
          <div className="absolute -top-6 left-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-bold">🔄 GAME 2</div>

          <h2 className="text-4xl font-bold text-red-700 mb-4 mt-4">Present Simple Questions & Answers</h2>

          <div className="bg-white p-4 rounded-xl mb-6 border-l-4 border-green-600">
            <strong className="text-green-600">📋 HOW TO PLAY:</strong><br />
            Complete the conversations using Present Simple tense correctly.
            Each correct response = 15 points! 🌟
          </div>

          <div className="space-y-4">
            {[
              { q: 'Teacher: "Do you like English?"', a: 'Slim: "_______________"' },
              { q: 'Teacher: "What do you do every day?"', a: 'Slim: "_______________"' },
              { q: 'Teacher: "Does your family like sports?"', a: 'Slim: "_______________"' },
              { q: 'Teacher: "What time do you have lunch?"', a: 'Slim: "_______________"' },
            ].map((dialogue, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <div className="font-bold text-blue-700 mb-2">{dialogue.q}</div>
                <div>{dialogue.a}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-xl p-4 border-4 border-orange-400 text-center mt-6">
            <h3 className="font-bold text-red-700 text-lg">🎯 Game 2 Score: _____ / 60 points</h3>
          </div>
        </div>

        {/* Final Score */}
        <div className="bg-gradient-to-r from-green-700 to-teal-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-4xl font-bold mb-6">🏆 TODAY'S TOTAL SCORE 🏆</h3>
          <div className="text-5xl font-bold mb-6">_____ / 120 points</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: '🥇', range: '100+', text: 'EXCELLENT!' },
              { emoji: '🥈', range: '80-99', text: 'GREAT JOB!' },
              { emoji: '🥉', range: '60-79', text: 'GOOD!' },
              { emoji: '📚', range: '<60', text: 'TRY AGAIN!' },
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

export default SpeakingWorksheet03;
