import React, { FC } from 'react';

const SpeakingWorksheet04: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-blue-700 to-purple-600 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 rotate-12">❓</div>
          <h1 className="text-5xl font-bold mb-4 relative z-10">🎮 SPEAKING GAME LEVEL 4 🎮</h1>
          <div className="text-2xl opacity-90 relative z-10">Topics: Questions Master</div>
        </div>

        {/* Student Panel */}
        <div className="flex justify-between items-center bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl p-6 mb-8 text-white flex-wrap gap-4">
          <div>
            <div className="text-xl font-bold">👤 Student: Slim Gharbi</div>
            <div className="text-lg opacity-90">📅 SmartHub Educational Services - Tunis</div>
          </div>
          <div className="bg-white text-red-600 px-6 py-3 rounded-full font-bold text-lg">⭐ Level: A1.4</div>
        </div>

        {/* GAME 1 */}
        <div className="mb-8 p-8 bg-gradient-to-br from-cyan-200 to-purple-200 rounded-2xl border-4 border-purple-400 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-bold text-lg">
            GAME 1: WH- Questions
          </div>

          <h2 className="text-4xl font-bold text-purple-900 mb-4 mt-4">Ask Questions with WHO, WHAT, WHERE, WHY, WHEN, HOW</h2>

          <div className="bg-white p-4 rounded-xl mb-6 border-l-4 border-red-600">
            <strong className="text-red-600">📋 HOW TO PLAY:</strong><br />
            Teacher gives an answer. Slim must ask the correct WH- question!
            Each correct question = 15 points! 🏆
          </div>

          <div className="space-y-3 mb-6">
            {[
              { answer: 'Answer: "I go to school every day"', hint: 'Where... OR What...' },
              { answer: 'Answer: "Because I want to learn English"', hint: 'Why...' },
              { answer: 'Answer: "My father is a teacher"', hint: 'Who...' },
              { answer: 'Answer: "I wake up at 7 o\'clock"', hint: 'When... OR What time...' },
              { answer: 'Answer: "By bus"', hint: 'How...' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
                <div className="font-bold text-purple-700 mb-2">{item.answer}</div>
                <div className="text-sm text-gray-600 mb-2">💡 Hint: {item.hint}</div>
                <div>
                  Slim asks: <span className="inline-block min-w-[250px] border-b-2 border-dotted border-purple-600">___________________</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl p-4 border-4 border-pink-400 text-center">
            <h3 className="font-bold text-purple-900 text-lg">🎯 Game 1 Score: _____ / 75 points</h3>
          </div>
        </div>

        {/* GAME 2 */}
        <div className="mb-8 p-8 bg-gradient-to-br from-cyan-200 to-purple-200 rounded-2xl border-4 border-purple-400 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-bold text-lg">
            GAME 2: Yes/No Questions
          </div>

          <h2 className="text-4xl font-bold text-purple-900 mb-4 mt-4">Ask Questions and Answer Correctly</h2>

          <div className="bg-white p-4 rounded-xl mb-6 border-l-4 border-red-600">
            <strong className="text-red-600">📋 HOW TO PLAY:</strong><br />
            Complete questions and give short answers using DO/DOES/AM/IS/ARE!
            Each correct pair = 15 points! 🌟
          </div>

          <div className="space-y-3">
            {[
              '1. _____ you like pizza? (Do/Does)',
              '2. _____ they English students? (Are/Is)',
              '3. _____ she go to school every day? (Do/Does)',
              '4. _____ we in Tunis? (Are/Is)',
              '5. _____ he 18 years old? (Do/Does)',
            ].map((question, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <div className="font-bold text-blue-700 mb-2">{question}</div>
                <div>
                  Slim answers: <span className="inline-block min-w-[200px] border-b-2 border-dotted border-blue-600">_______________</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl p-4 border-4 border-pink-400 text-center mt-6">
            <h3 className="font-bold text-purple-900 text-lg">🎯 Game 2 Score: _____ / 75 points</h3>
          </div>
        </div>

        {/* Final Score */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-4xl font-bold mb-6">🏆 TODAY'S TOTAL SCORE 🏆</h3>
          <div className="text-5xl font-bold mb-6">_____ / 150 points</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: '🥇', range: '130+', text: 'EXCELLENT!' },
              { emoji: '🥈', range: '100-129', text: 'GREAT JOB!' },
              { emoji: '🥉', range: '70-99', text: 'GOOD!' },
              { emoji: '📚', range: '<70', text: 'PRACTICE!' },
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

export default SpeakingWorksheet04;
