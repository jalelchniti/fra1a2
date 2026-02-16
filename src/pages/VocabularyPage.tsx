import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fr } from '../locales/fr';

interface VocabularyItem {
  id: string;
  title: string;
  content: string;
  level: string;
  topic: string;
  quizId?: string;
  flashcardId?: string;
}

const VocabularyPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>(fr.all_topics);

  const vocabularyContent: VocabularyItem[] = [
    // Unit 1
    {
      id: 'vo_01-01',
      title: fr.introductions_flashcards,
      content: fr.practice_basic_vocab_greetings_flashcards,
      level: 'A1',
      topic: fr.introductions,
      flashcardId: 'vo_01-01',
    },
    {
      id: 'vo_01-02',
      title: fr.introductions_quiz,
      content: fr.practice_basic_vocab_greetings_quiz,
      level: 'A1',
      topic: fr.introductions,
      quizId: 'vo_01-02',
    },
    {
      id: 'vo_01-03',
      title: fr.everyday_objects_flashcards,
      content: fr.practice_common_objects_around_you_flashcards,
      level: 'A1',
      topic: fr.everyday_objects,
      flashcardId: 'vo_01-03',
    },
    {
      id: 'vo_01-04',
      title: fr.classroom_objects_flashcards,
      content: fr.practice_vocab_classroom_objects_flashcards,
      level: 'A1',
      topic: fr.classroom_objects,
      flashcardId: 'vo_01-04',
    },
    // Unit 2
    {
      id: 'vo_02-01',
      title: fr.shopping_vocabulary_title,
      content: fr.learn_clothing_prices_shopping_vocab_flashcards,
      level: 'A1',
      topic: fr.shopping,
      quizId: 'vo_02-01',
    },
    {
      id: 'vo_02-02',
      title: fr.directions_landmarks,
      content: fr.practice_directional_vocab_landmark_names_flashcards,
      level: 'A1',
      topic: fr.directions_topic,
      quizId: 'vo_02-02',
    },
    {
      id: 'vo_02-03',
      title: fr.currency_payment,
      content: fr.learn_currency_vocab_payment_methods_transaction_terms,
      level: 'A1',
      topic: fr.shopping,
      quizId: 'vo_02-03',
    },
    {
      id: 'vo_02-04',
      title: fr.shopping_conversation_vocabulary,
      content: fr.practice_vocab_shopping_dialogues_transactions,
      level: 'A1',
      topic: fr.shopping,
      quizId: 'vo_02-04',
    },
    // Unit 3
    {
      id: 'vo_03-01',
      title: fr.transportation_vehicles,
      content: fr.learn_vocab_trains_buses_cars_taxis_transport,
      level: 'A1',
      topic: fr.transportation,
      quizId: 'vo_03-01',
    },
    {
      id: 'vo_03-02',
      title: fr.transport_action_verbs,
      content: fr.practice_action_verbs_transportation,
      level: 'A1',
      topic: fr.transportation,
      quizId: 'vo_03-02',
    },
    {
      id: 'vo_03-03',
      title: fr.transport_adjectives,
      content: fr.learn_adjectives_describe_transportation,
      level: 'A1',
      topic: fr.transportation,
      quizId: 'vo_03-03',
    },
    {
      id: 'vo_03-04',
      title: fr.transport_phrases_prepositions,
      content: fr.practice_phrases_by_train_bus_car_in_car_on_bus,
      level: 'A1',
      topic: fr.transportation,
      quizId: 'vo_03-04',
    },
  ];

  const filteredVocabulary = selectedTopic === 'All Topics'
    ? vocabularyContent
    : vocabularyContent.filter((item) => item.topic === selectedTopic);

  const allTopics = Array.from(new Set(vocabularyContent.map((item) => item.topic)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center w-full max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl"
    >
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">{fr.vocabulary_practice_quizzes}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
        {fr.improve_english_vocabulary}
      </p>

      <div className="flex flex-wrap w-full mb-8 gap-4 justify-center">
        <div className="w-full sm:w-auto">
          <label htmlFor="topic-select" className="block text-sm font-medium text-gray-700 mb-2 text-center sm:text-left">
            {fr.sort_by_topic}
          </label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-5 py-2.5 rounded-full bg-white text-gray-800 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-md w-full sm:w-auto"
          >
            <option value={fr.all_topics}>{fr.all_topics}</option>
            {allTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {filteredVocabulary.length > 0 ? (
          filteredVocabulary.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.content}</p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  {item.quizId && (
                    <Link
                      to={`/quiz/${item.quizId}`}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      {fr.practice_quiz}
                    </Link>
                  )}
                  {item.flashcardId && (
                    <Link
                      to={`/quiz/${item.flashcardId}`}
                      className="text-sm text-green-600 hover:underline text-center"
                    >
                      {fr.flashcard_practice}
                    </Link>
                  )}
                  <span className="bg-indigo-50 text-indigo-600 text-sm font-medium px-2.5 py-0.5 rounded">
                    {item.level} | {item.topic}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-700">{fr.no_vocabulary_quizzes_available_yet}</div>
        )}
      </div>
    </motion.div>
  );
};

export default VocabularyPage;