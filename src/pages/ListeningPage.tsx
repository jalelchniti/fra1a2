import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fr } from '../locales/fr';

interface ListeningItem {
  id: string;
  title: string;
  level: string;
  topic: string;
}

const ListeningPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>(fr.all_topics);

  const listeningContent: ListeningItem[] = [
    // Unit 1
    { id: 'li_01-01', title: fr.short_conversations_a1, level: 'A1', topic: fr.conversations },
    // Unit 2
    { id: 'li_02-01', title: fr.understanding_directions, level: 'A1', topic: fr.directions_speaking },
    { id: 'li_02-02', title: fr.shopping_conversations, level: 'A1', topic: fr.shopping_speaking },
    { id: 'li_02-03', title: fr.landmarks_locations, level: 'A1', topic: fr.directions_speaking },
    { id: 'li_02-04', title: fr.prices_numbers, level: 'A1', topic: fr.shopping_speaking },
    // Unit 3
    { id: 'li_03-01', title: fr.understanding_directions, level: 'A1', topic: fr.transportation_speaking },
    { id: 'li_03-02', title: fr.past_travel_conversation, level: 'A1', topic: fr.transportation_speaking },
    { id: 'li_03-03', title: fr.future_travel_plans, level: 'A1', topic: fr.transportation_speaking },
    { id: 'li_03-04', title: fr.transportation_story_all_tenses, level: 'A1', topic: fr.transportation_speaking },
  ];

  const filteredListening = selectedTopic === fr.all_topics
    ? listeningContent
    : listeningContent.filter((item) => item.topic === selectedTopic);

  const allTopics = Array.from(new Set(listeningContent.map((item) => item.topic)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center w-full max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl"
    >
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">{fr.listening_practice}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
        {fr.improve_beginner_english_listening}
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
        {filteredListening.length > 0 ? (
          filteredListening.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.title}</h3>
              <div className="flex justify-between items-center">
                {(item.id.startsWith('li_01-') || item.id.startsWith('li_02-') || item.id.startsWith('li_03-')) ? (
                  <Link
                    to={`/quiz/${item.id}`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {fr.start_practice}
                  </Link>
                ) : (
                  <span className="text-sm text-gray-500">{fr.practice_coming_soon}</span>
                )}
                <span className="bg-indigo-50 text-indigo-600 text-sm font-medium px-2.5 py-0.5 rounded">
                  {item.level} | {item.topic}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-700 text-center">{fr.no_listening_content_available}</div>
        )}
      </div>
    </motion.div>
  );
};

export default ListeningPage;