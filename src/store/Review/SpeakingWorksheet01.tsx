import React, { FC } from 'react';

const SpeakingWorksheet01: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-700 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-4 border-dashed border-indigo-500">
          <h1 className="text-5xl font-bold text-indigo-600 mb-2">🎮 SPEAKING GAME LEVEL 1 🎮</h1>
          <div className="text-2xl font-bold text-purple-700">Topics: Greetings & Personal Information</div>
        </div>

        {/* Student Info */}
        <div className="bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl p-4 mb-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">👤 Student: Slim Gharbi</h3>
          <div className="text-lg mb-3">📅 SmartHub Educational Services - Tunis City Center</div>
          <div className="inline-block bg-white text-red-500 px-4 py-2 rounded-full font-bold">
            ⭐ Level: A1.1
          </div>
        </div>

        {/* GAME 1 */}
        <div className="mb-8 p-6 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl border-4 border-orange-400">
          <h2 className="text-3xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            GAME 1: Complete the Dialogue!
          </h2>

          <div className="bg-white p-4 rounded-xl mb-4 border-l-4 border-red-700">
            <strong className="text-red-700">📋 HOW TO PLAY:</strong><br />
            Teacher reads the dialogue. Slim fills in the blanks by SPEAKING the answers out loud.
            Each correct answer = 10 points! 🏆
          </div>

          <div className="bg-gradient-to-r from-cyan-200 to-red-200 rounded-2xl p-5 mb-6">
            <h4 className="text-xl font-bold text-indigo-600 mb-3">💡 Word Bank (Help Box):</h4>
            <div className="flex flex-wrap gap-2">
              {['Hello', 'My name is', "I'm", '18', 'from', 'Tunisia', 'Nice to meet you', 'How are you?'].map(
                (word) => (
                  <span key={word} className="bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-full font-bold shadow-md">
                    {word}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            {/* Dialogue */}
            <div className="space-y-4">
              {[
                { role: 'Teacher', avatar: '👨‍🏫', text: 'Hello! Good morning!', isTeacher: true },
                { role: 'Slim', avatar: '👨', text: '<span className="inline-block min-w-[200px] border-b-2 border-dotted border-indigo-600">_____________</span>! Good morning!', isTeacher: false },
                { role: 'Teacher', avatar: '👨‍🏫', text: "What's your name?", isTeacher: true },
                { role: 'Slim', avatar: '👨', text: '<span className="inline-block min-w-[200px] border-b-2 border-dotted border-indigo-600">_____________</span> Slim.', isTeacher: false },
                { role: 'Teacher', avatar: '👨‍🏫', text: 'Nice to meet you, Slim! How old are you?', isTeacher: true },
                { role: 'Slim', avatar: '👨', text: '<span className="inline-block min-w-[200px] border-b-2 border-dotted border-indigo-600">_____________</span> <span className="inline-block min-w-[200px] border-b-2 border-dotted border-indigo-600">_____________</span> years old.', isTeacher: false },
                { role: 'Teacher', avatar: '👨‍🏫', text: 'Where are you from?', isTeacher: true },
                { role: 'Slim', avatar: '👨', text: 'I\'m <span className="inline-block min-w-[200px] border-b-2 border-dotted border-indigo-600">_____________</span> <span className="inline-block min-w-[200px] border-b-2 border-dotted border-indigo-600">_____________</span>.', isTeacher: false },
              ].map((dialogue, idx) => (
                <div key={idx} className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                      dialogue.isTeacher
                        ? 'bg-gradient-to-br from-blue-400 to-cyan-400'
                        : 'bg-gradient-to-br from-green-400 to-emerald-400'
                    }`}
                  >
                    {dialogue.avatar}
                  </div>
                  <div className="flex-1 bg-gray-100 p-4 rounded-2xl">
                    <strong className="text-indigo-600 block mb-1">{dialogue.role}:</strong>
                    <div>{dialogue.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-300 to-yellow-200 rounded-2xl p-5 border-4 border-pink-400 text-center">
            <h3 className="text-2xl font-bold text-red-700 mb-3">🎯 Game 1 Score:</h3>
            <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
            <div className="text-2xl font-bold text-red-700">_____ / 50 points</div>
          </div>
        </div>

        {/* GAME 2 */}
        <div className="mb-8 p-6 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl border-4 border-orange-400">
          <h2 className="text-3xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">🔄</span>
            GAME 2: Now YOU Ask ME!
          </h2>

          <div className="bg-white p-4 rounded-xl mb-4 border-l-4 border-red-700">
            <strong className="text-red-700">📋 HOW TO PLAY:</strong><br />
            Now Slim asks the questions, and Teacher answers! Each correct question = 15 points! 🌟
          </div>

          <div className="bg-gradient-to-r from-cyan-200 to-red-200 rounded-2xl p-5 mb-6">
            <h4 className="text-xl font-bold text-indigo-600 mb-3">💡 Question Starters:</h4>
            <div className="flex flex-wrap gap-2">
              {["What's your...?", 'How old...?', 'Where are you...?', 'What do you...?'].map((word) => (
                <span key={word} className="bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-full font-bold shadow-md">
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-200 to-pink-200 rounded-2xl p-5 border-4 border-dashed border-red-500 mb-6">
            <h4 className="text-2xl font-bold text-red-700 mb-4">🎤 Slim's Turn to Ask Questions:</h4>
            {[
              { num: 1, instruction: "Ask about the teacher's name", hint: "What's...?", label: 'Slim says:' },
              { num: 2, instruction: "Ask about the teacher's age", hint: 'How old...?', label: 'Slim says:' },
              { num: 3, instruction: 'Ask where the teacher is from', hint: 'Where...?', label: 'Slim says:' },
            ].map((challenge) => (
              <div key={challenge.num} className="bg-white p-4 rounded-lg mb-3 border-l-4 border-red-700">
                <strong>Question {challenge.num}:</strong> {challenge.instruction}
                <br />
                <em className="text-gray-600">Hint: {challenge.hint}</em>
                <div className="mt-3">
                  {challenge.label}{' '}
                  <span className="inline-block min-w-[300px] border-b-2 border-dotted border-indigo-600">_____________________</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-300 to-yellow-200 rounded-2xl p-5 border-4 border-pink-400 text-center">
            <h3 className="text-2xl font-bold text-red-700 mb-3">🎯 Game 2 Score:</h3>
            <div className="text-3xl mb-3">⭐⭐⭐</div>
            <div className="text-2xl font-bold text-red-700">_____ / 45 points</div>
          </div>
        </div>

        {/* GAME 3 */}
        <div className="mb-8 p-6 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl border-4 border-orange-400">
          <h2 className="text-3xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            GAME 3: Speed Round! (1 minute)
          </h2>

          <div className="bg-white p-4 rounded-xl mb-4 border-l-4 border-red-700">
            <strong className="text-red-700">📋 HOW TO PLAY:</strong><br />
            Teacher gives the situation. Slim responds as FAST as possible! Each correct answer = 5 points! ⏱️
          </div>

          <div className="bg-gradient-to-br from-red-200 to-pink-200 rounded-2xl p-5 border-4 border-dashed border-red-500">
            <h4 className="text-2xl font-bold text-red-700 mb-4">⚡ Quick Responses:</h4>
            {[
              'You meet someone in the morning → Say: "___________"',
              'Someone says "Hello!" → You say: "___________"',
              'Someone asks "What\'s your name?" → You say: "___________"',
              'You want to know someone\'s age → You ask: "___________"',
              'Someone says "Nice to meet you" → You say: "___________"',
              'You leave at the end of class → You say: "___________"',
            ].map((situation, idx) => (
              <div key={idx} className="flex items-center gap-3 mb-3">
                <input type="checkbox" className="w-6 h-6" />
                <label className="text-lg">
                  <strong>Situation:</strong> {situation}
                </label>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-300 to-yellow-200 rounded-2xl p-5 border-4 border-pink-400 text-center mt-6">
            <h3 className="text-2xl font-bold text-red-700 mb-3">🎯 Game 3 Score:</h3>
            <div className="text-4xl mb-3">⭐⭐⭐⭐⭐⭐</div>
            <div className="text-2xl font-bold text-red-700">_____ / 30 points</div>
          </div>
        </div>

        {/* FINAL SCORE */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-4xl font-bold mb-6">🏆 TODAY'S TOTAL SCORE 🏆</h3>
          <div className="text-6xl font-bold mb-8">_____ / 125 points</div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { emoji: '🥇', range: '100-125', text: 'EXCELLENT!' },
              { emoji: '🥈', range: '75-99', text: 'GREAT JOB!' },
              { emoji: '🥉', range: '50-74', text: 'GOOD!' },
              { emoji: '📚', range: '0-49', text: 'KEEP PRACTICING!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-bold">{item.range}</div>
                <div>{item.text}</div>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-white/30 pt-6">
            <strong className="text-2xl">Teacher's Comments:</strong>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mt-3 min-h-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingWorksheet01;
