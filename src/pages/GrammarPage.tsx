import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fr } from '../locales/fr';

interface GrammarItem {
  id: string;
  title: string;
  content: string;
  level: string;
  topic: string;
  quizId?: string;
  flashcardId?: string;
}

const GrammarPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>(fr.all_topics);

  const grammarContent: GrammarItem[] = [
    // Unit 1
    {
      id: 'gr_01-01',
      title: fr.verb_to_be,
      content: fr.practice_verb_to_be_simple_sentences,
      level: 'A1',
      topic: fr.verbs,
      quizId: 'gr_01-01',
    },
    {
      id: 'gr_01-02',
      title: fr.present_simple,
      content: fr.learn_present_simple_tense_habits_facts,
      level: 'A1',
      topic: fr.tenses,
      flashcardId: 'gr_01-02',
    },
    {
      id: 'gr_01-03',
      title: fr.yes_no_questions,
      content: fr.practice_yes_no_questions_short_answers,
      level: 'A1',
      topic: fr.tenses,
      quizId: 'gr_01-03',
    },
    {
      id: 'gr_01-04',
      title: fr.yes_no_flashcards,
      content: fr.flashcards_yes_no_questions_short_answers,
      level: 'A1',
      topic: fr.tenses,
      flashcardId: 'gr_01-04',
    },
    // Unit 2
    {
      id: 'gr_02-01',
      title: fr.imperatives_for_directions,
      content: fr.learn_imperative_forms_give_directions,
      level: 'A1',
      topic: fr.verbs,
      quizId: 'gr_02-01',
    },
    {
      id: 'gr_02-02',
      title: fr.asking_questions,
      content: fr.master_question_formation_asking_directions_information,
      level: 'A1',
      topic: fr.questions,
      quizId: 'gr_02-02',
    },
    {
      id: 'gr_02-03',
      title: fr.prepositions_of_place_direction,
      content: fr.practice_prepositions_locations_directions,
      level: 'A1',
      topic: fr.prepositions,
      quizId: 'gr_02-03',
    },
    {
      id: 'gr_02-04',
      title: fr.modal_verbs_polite_requests,
      content: fr.learn_modal_verbs_polite_requests_help,
      level: 'A1',
      topic: fr.verbs,
      quizId: 'gr_02-04',
    },
    // Unit 3
    {
      id: 'gr_03-01',
      title: fr.present_progressive,
      content: fr.practice_present_progressive_tense_actions_now,
      level: 'A1',
      topic: fr.tenses,
      quizId: 'gr_03-01',
    },
    {
      id: 'gr_03-02',
      title: fr.future_with_going_to,
      content: fr.learn_express_future_plans_going_to,
      level: 'A1',
      topic: fr.tenses,
      quizId: 'gr_03-02',
    },
    {
      id: 'gr_03-03',
      title: fr.simple_past_tense,
      content: fr.master_simple_past_regular_verbs,
      level: 'A1',
      topic: fr.tenses,
      quizId: 'gr_03-03',
    },
    {
      id: 'gr_03-04',
      title: fr.mixed_tenses_questions,
      content: fr.practice_all_three_tenses_question_formation,
      level: 'A1',
      topic: fr.tenses,
      quizId: 'gr_03-04',
    },
  ];

  const filteredGrammar = selectedTopic === fr.all_topics
    ? grammarContent
    : grammarContent.filter((item) => item.topic === selectedTopic);

  const allTopics = Array.from(new Set(grammarContent.map((item) => item.topic)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center w-full max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl"
    >
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">{fr.grammar_practice}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
        {fr.improve_beginner_english_grammar}
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
        {filteredGrammar.length > 0 ? (
          filteredGrammar.map((item) => (
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
          <div className="text-gray-700 text-center">{fr.no_grammar_content_available}</div>
        )}
      </div>
    </motion.div>
  );
};

export default GrammarPage;
