import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fr } from '../locales/fr';

interface SpeakingItem {
  id: string;
  title: string;
  content: string;
  level: string;
  topic: string;
}

const SpeakingPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>(fr.all_topics);

  const speakingContent: SpeakingItem[] = [
    // Unit 1
    {
      id: 'sp_01-01',
      title: fr.introducing_yourself,
      content: fr.saying_hello_goodbye_telling_name_age_nationality_occupation,
      level: 'A1',
      topic: fr.introductions_speaking
    },
    // Unit 2
    {
      id: 'sp_02-01',
      title: fr.ask_directions,
      content: fr.learn_key_phrases_asking_directions_understanding_responses,
      level: 'A1',
      topic: fr.directions_speaking
    },
    {
      id: 'sp_02-02',
      title: fr.shopping_phrases,
      content: fr.practice_essential_phrases_shopping_conversations,
      level: 'A1',
      topic: fr.shopping_speaking
    },
    {
      id: 'sp_02-04',
      title: fr.role_play_scenarios,
      content: fr.practice_real_world_role_play_situations_shopping_navigation,
      level: 'A1',
      topic: fr.role_play
    },
    {
      id: 'sp_02-05',
      title: fr.advanced_speaking_practice,
      content: fr.advanced_conversational_practice_complex_scenarios,
      level: 'A1',
      topic: fr.conversations
    },
    // Unit 3
    {
      id: 'sp_03-01',
      title: fr.ask_directions,
      content: fr.learn_how_to_ask_for_understand_directions_english,
      level: 'A1',
      topic: fr.transportation_speaking
    },
    {
      id: 'sp_03-02',
      title: fr.taking_a_taxi_or_bus,
      content: fr.practice_conversations_taking_taxi_bus_journeys,
      level: 'A1',
      topic: fr.transportation_speaking
    },
    {
      id: 'sp_03-03',
      title: fr.talking_about_your_journey_past,
      content: fr.describe_past_trips_experiences_simple_past_tense,
      level: 'A1',
      topic: fr.transportation_speaking
    },
    {
      id: 'sp_03-04',
      title: fr.planning_a_trip_future_plans,
      content: fr.talk_about_future_travel_plans_going_to,
      level: 'A1',
      topic: fr.transportation_speaking
    },
  ];

  const filteredSpeaking = selectedTopic === fr.all_topics
    ? speakingContent
    : speakingContent.filter((item) => item.topic === selectedTopic);

  const allTopics = Array.from(new Set(speakingContent.map((item) => item.topic)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center w-full max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl"
    >
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">{fr.speaking_practice}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
        {fr.improve_beginner_english_speaking}
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
        {filteredSpeaking.length > 0 ? (
          filteredSpeaking.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.content}</p>
              <div className="flex justify-between items-center">
                {(item.id.startsWith('sp_01-') || item.id.startsWith('sp_02-') || item.id.startsWith('sp_03-')) ? (
                  <Link
                    to={`/quiz/${item.id}`}
                    className="text-sm text-indigo-600 hover:underline"
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
          <div className="text-gray-700 text-center">{fr.no_speaking_content_available}</div>
        )}
      </div>
    </motion.div>
  );
};

export default SpeakingPage;
