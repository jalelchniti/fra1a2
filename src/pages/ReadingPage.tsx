import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fr } from '../locales/fr';

interface ReadingItem {
  id: string;
  title: string;
  content: string;
  level: string;
  topic: string;
  quizId?: string;
}

const ReadingPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>(fr.all_topics);

  const readingContent: ReadingItem[] = [
    // Unit 1
    {
      id: 're_01-01',
      title: fr.all_about_you,
      content: fr.read_about_jobs_personal_information,
      level: 'A1',
      topic: fr.personal_information,
      quizId: 're_01-01'
    },
    {
      id: 're_01-02',
      title: fr.annas_daily_life,
      content: fr.read_about_annas_house_daily_routine,
      level: 'A1',
      topic: fr.short_texts,
      quizId: 're_01-02'
    },
    { id: 're_01-03', title: fr.basic_notices, content: fr.read_signs_notices_short_texts, level: 'A1', topic: fr.notices_topic },
    { id: 're_01-04', title: fr.family_and_friends, content: fr.understand_texts_about_family_friends, level: 'A1', topic: fr.relationships },
    // Unit 2
    {
      id: 're_02-01',
      title: fr.shopping_information,
      content: fr.read_store_information_hours_special_offers,
      level: 'A1',
      topic: fr.shopping,
      quizId: 're_02-01'
    },
    {
      id: 're_02-02',
      title: fr.directions,
      content: fr.read_understand_step_by_step_navigation_instructions,
      level: 'A1',
      topic: fr.directions_speaking,
      quizId: 're_02-02'
    },
    {
      id: 're_02-03',
      title: fr.shopping_dialogue,
      content: fr.read_understand_conversations_customers_cashiers,
      level: 'A1',
      topic: fr.conversations,
      quizId: 're_02-03'
    },
    {
      id: 're_02-04',
      title: fr.return_exchange_policy,
      content: fr.read_understand_store_policies_procedures,
      level: 'A1',
      topic: fr.notices_topic,
      quizId: 're_02-04'
    },
    // Unit 3
    {
      id: 're_03-01',
      title: fr.on_the_train_right_now,
      content: fr.read_about_ali_on_train_practice_present_progressive_actions,
      level: 'A1',
      topic: fr.transportation_speaking,
      quizId: 're_03-01'
    },
    {
      id: 're_03-02',
      title: fr.yesterdays_bus_trip,
      content: fr.read_about_laylas_past_bus_trip_practice_simple_past_tense_comprehension,
      level: 'A1',
      topic: fr.transportation_speaking,
      quizId: 're_03-02'
    },
    {
      id: 're_03-03',
      title: fr.tomorrows_travel_plans,
      content: fr.read_about_omars_future_travel_plans_practice_going_to_future_plans,
      level: 'A1',
      topic: fr.transportation_speaking,
      quizId: 're_03-03'
    },
    {
      id: 're_03-04',
      title: fr.comparing_transportation,
      content: fr.compare_trains_buses_cars_practice_comparative_adjectives,
      level: 'A1',
      topic: fr.transportation_speaking,
      quizId: 're_03-04'
    },
  ];

  const filteredReading = selectedTopic === fr.all_topics
    ? readingContent
    : readingContent.filter((item) => item.topic === selectedTopic);

  const allTopics = Array.from(new Set(readingContent.map((item) => item.topic)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center w-full max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl"
    >
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">{fr.reading_practice}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
        {fr.improve_beginner_english_reading}
      </p>

      <div className="w-full sm:w-auto mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {filteredReading.length > 0 ? (
          filteredReading.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.content}</p>
              <div className="flex justify-between items-center">
                {item.quizId ? (
                  <Link
                    to={`/quiz/${item.quizId}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <motion.button
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {fr.take_quiz}
                    </motion.button>
                  </Link>
                ) : (
                  <span className="text-sm text-gray-500">{fr.practice_coming_soon}</span>
                )}
                <span className="bg-indigo-50 text-indigo-600 text-sm font-medium px-2.5 py-0.5 rounded">
                  {item.level} | {item.topic}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-700 text-center">{fr.no_reading_content_available}</div>
        )}
      </div>
    </motion.div>
  );
};

export default ReadingPage;