// Unit 2 Lesson 3 - Speaking: Dialogue Practice
import React, { useState } from "react";
import { motion } from "framer-motion";

interface DialogueTurn {
  speaker: string;
  text: string;
}

const dialogues: DialogueTurn[][] = [
  [
    { speaker: "Customer", text: "Excuse me, where's the nearest bank?" },
    { speaker: "Passerby", text: "It's on Main Street, turn right at the corner." },
    { speaker: "Customer", text: "Thank you for your help!" }
  ],
  [
    { speaker: "Customer", text: "How much does this shirt cost?" },
    { speaker: "Cashier", text: "It's $25 today. We have a 30% discount on all shirts!" },
    { speaker: "Customer", text: "That's great! I'll take it." }
  ],
  [
    { speaker: "Customer", text: "Can you tell me how to get to the hospital?" },
    { speaker: "Local", text: "Go straight ahead, then take the second left." },
    { speaker: "Customer", text: "Is it far from here?" }
  ]
];

const SpeakingDialogueQuiz: React.FC = () => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedDialogues, setCompletedDialogues] = useState<number[]>([]);

  const speak = (text: string) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleNextTurn = () => {
    if (currentTurn < dialogues[currentDialogue].length - 1) {
      setCurrentTurn(currentTurn + 1);
    }
  };

  const handleCompleteDialogue = () => {
    if (!completedDialogues.includes(currentDialogue)) {
      setCompletedDialogues([...completedDialogues, currentDialogue]);
    }
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
      setCurrentTurn(0);
    }
  };

  const handlePrevDialogue = () => {
    if (currentDialogue > 0) {
      setCurrentDialogue(currentDialogue - 1);
      setCurrentTurn(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Speaking: Dialogue Practice</h1>
          <p className="text-gray-600">Unit 2 - Speaking Lesson 3</p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentDialogue + 1) / dialogues.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-gray-600 mt-2">
            Dialogue {currentDialogue + 1} of {dialogues.length}
          </p>
        </div>

        <motion.div
          key={`dialogue-${currentDialogue}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Conversation</h2>

          <div className="space-y-4 mb-8">
            {dialogues[currentDialogue].map((turn, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg ${
                  turn.speaker === "Customer" ? "bg-blue-100 ml-8" : "bg-gray-100 mr-8"
                }`}
              >
                <p className="font-semibold text-gray-800">{turn.speaker}:</p>
                <p className="text-gray-700 mt-1">{turn.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Current Line to Practice:</h3>
            <div className="bg-yellow-100 p-3 rounded">
              <p className="font-semibold text-gray-700">{dialogues[currentDialogue][currentTurn].speaker}:</p>
              <p className="text-lg text-gray-800">{dialogues[currentDialogue][currentTurn].text}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => speak(dialogues[currentDialogue][currentTurn].text)}
              disabled={isSpeaking}
              className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition"
            >
              {isSpeaking ? "🔊 Speaking..." : "🔊 Listen & Repeat"}
            </button>

            <button
              onClick={handleNextTurn}
              disabled={currentTurn === dialogues[currentDialogue].length - 1}
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
            >
              Next Line →
            </button>

            {currentTurn === dialogues[currentDialogue].length - 1 && (
              <button
                onClick={handleCompleteDialogue}
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                {currentDialogue === dialogues.length - 1 ? "✓ Finished!" : "Continue to Next Dialogue"}
              </button>
            )}
          </div>
        </motion.div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrevDialogue}
            disabled={currentDialogue === 0}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
          >
            ← Previous
          </button>
          <p className="text-center text-gray-600">
            Completed: {completedDialogues.length} / {dialogues.length}
          </p>
          <button
            onClick={handleCompleteDialogue}
            disabled={currentDialogue === dialogues.length - 1 && currentTurn === dialogues[currentDialogue].length - 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
          >
            Skip →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakingDialogueQuiz;
