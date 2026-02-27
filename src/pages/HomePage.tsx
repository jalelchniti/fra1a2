import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fr } from '../locales/fr';

// Updated Data
interface Category {
  titleKey: keyof typeof fr;
  descriptionKey: keyof typeof fr;
  path: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge?: keyof typeof fr;
}

const categories: Category[] = [
  {
    titleKey: 'vocabulary',
    descriptionKey: 'practice_everyday_words',
    path: "/vocabulary",
    icon: "📚",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: 'new'
  },
  {
    titleKey: 'grammar',
    descriptionKey: 'master_verb_forms',
    path: "/grammar",
    icon: "📝",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badge: 'new'
  },
  {
    titleKey: 'speaking',
    descriptionKey: 'improve_pronunciation',
    path: "/speaking",
    icon: "🗣️",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    titleKey: 'reading',
    descriptionKey: 'develop_skills_beginner_texts',
    path: "/reading",
    icon: "📖",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    titleKey: 'listening',
    descriptionKey: 'enhance_comprehension_audio',
    path: "/listening",
    icon: "🎧",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600"
  }
];

type FrKey = keyof typeof fr;

interface Unit3Lesson {
  id: string;
  nameKey: FrKey;
}

interface Unit3Skill {
  titleKey: FrKey;
  icon: string;
  bgColor: string;
  hubPath: string;
  lessons: Unit3Lesson[];
}

interface ReviewActivity {
  id: number;
  icon: string;
  titleKey: FrKey;
  descriptionKey: FrKey;
  path: string;
  bgColor: string;
}



const unit3Skills: Unit3Skill[] = [
  {
    titleKey: 'vocabulary',
    icon: "📚",
    bgColor: "bg-blue-50",
    hubPath: "/vocabulary",
    lessons: [
      { id: "vo_03-01", nameKey: 'vehicles' },
      { id: "vo_03-02", nameKey: 'action_verbs' },
      { id: "vo_03-03", nameKey: 'adjectives' },
      { id: "vo_03-04", nameKey: 'phrases' }
    ]
  },
  {
    titleKey: 'grammar',
    icon: "📝",
    bgColor: "bg-green-50",
    hubPath: "/grammar",
    lessons: [
      { id: "gr_03-01", nameKey: 'present_progressive' },
      { id: "gr_03-02", nameKey: 'going_to_future' },
      { id: "gr_03-03", nameKey: 'simple_past' },
      { id: "gr_03-04", nameKey: 'mixed_tenses' }
    ]
  },
  {
    titleKey: 'reading',
    icon: "📖",
    bgColor: "bg-purple-50",
    hubPath: "/reading",
    lessons: [
      { id: "re_03-01", nameKey: 'present_progressive' },
      { id: "re_03-02", nameKey: 'simple_past' },
      { id: "re_03-03", nameKey: 'going_to_future' },
      { id: "re_03-04", nameKey: 'comparatives' }
    ]
  },
  {
    titleKey: 'speaking',
    icon: "🗣️",
    bgColor: "bg-yellow-50",
    hubPath: "/speaking",
    lessons: [
      { id: "sp_03-01", nameKey: 'ask_directions' },
      { id: "sp_03-02", nameKey: 'take_transport' },
      { id: "sp_03-03", nameKey: 'past_journey' },
      { id: "sp_03-04", nameKey: 'plan_trip' }
    ]
  },
  {
    titleKey: 'listening',
    icon: "🎧",
    bgColor: "bg-pink-50",
    hubPath: "/listening",
    lessons: [
      { id: "li_03-01", nameKey: 'directions' },
      { id: "li_03-02", nameKey: 'past_travel' },
      { id: "li_03-03", nameKey: 'future_plans' },
      { id: "li_03-04", nameKey: 'all_tenses' }
    ]
  }
];

const reviewActivities: ReviewActivity[] = [
  {
    id: 1,
    icon: "📝",
    titleKey: 'speaking_worksheet_1',
    descriptionKey: 'greetings_personal_info_master_introductions',
    path: "/review/speaking-worksheet-01",
    bgColor: "bg-indigo-50"
  },
  {
    id: 2,
    icon: "⏰",
    titleKey: 'speaking_worksheet_2',
    descriptionKey: 'daily_activities_time_describe_routine',
    path: "/review/speaking-worksheet-02",
    bgColor: "bg-cyan-50"
  },
  {
    id: 3,
    icon: "✅",
    titleKey: 'speaking_worksheet_3',
    descriptionKey: 'verb_to_be_present_simple_practice_basics',
    path: "/review/speaking-worksheet-03",
    bgColor: "bg-amber-50"
  },
  {
    id: 4,
    icon: "❓",
    titleKey: 'speaking_worksheet_4',
    descriptionKey: 'questions_master_form_answer_questions',
    path: "/review/speaking-worksheet-04",
    bgColor: "bg-rose-50"
  },
  {
    id: 5,
    icon: "✈️",
    titleKey: 'travel_stories',
    descriptionKey: 'conversation_game_share_travel_experiences',
    path: "/review/travel-stories",
    bgColor: "bg-sky-50"
  },
  {
    id: 6,
    icon: "🚗",
    titleKey: 'car_driving',
    descriptionKey: 'narration_game_tell_driving_stories',
    path: "/review/car-driving",
    bgColor: "bg-orange-50"
  },
  {
    id: 7,
    icon: "🏎️",
    titleKey: 'car_comparison',
    descriptionKey: 'comparative_game_compare_vehicles_features',
    path: "/review/car-comparison",
    bgColor: "bg-yellow-50"
  },
  {
    id: 8,
    icon: "🎧",
    titleKey: 'listening_activity',
    descriptionKey: 'six_level_progressive_listening_comprehension',
    path: "/review/listening-activity",
    bgColor: "bg-blue-50"
  },
  {
    id: 9,
    icon: "📖",
    titleKey: 'school_memories',
    descriptionKey: 'share_school_experiences_mood_indicators',
    path: "/review/school-memories",
    bgColor: "bg-purple-50"
  },
  {
    id: 10,
    icon: "🌟",
    titleKey: 'school_life_mix',
    descriptionKey: 'mixed_tenses_past_present_future_practice',
    path: "/review/school-life-mix",
    bgColor: "bg-green-50"
  }
];

const HomePage = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section - SmartHub Banner */}
      <section
        className="relative overflow-hidden rounded-2xl text-white h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-cover bg-center shadow-xl"
        style={{ backgroundImage: `url('/assets/images/fb_cover-01.png')` }}
      >
        {/* Optional subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

        {/* Content area - can be used for call-to-action buttons if needed */}
        <div className="relative h-full flex items-end justify-center pb-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4"
          >
            <Link to="/vocabulary" className="btn bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              {fr.start_learning}
            </Link>
            <Link to="/curriculum" className="btn bg-white/90 hover:bg-white text-gray-800 shadow-lg">
              {fr.view_curriculum}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">{fr.interactive_practice_areas}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="card p-6 h-full flex flex-col relative">
                {category.badge && (
                  <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    {fr.new}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${category.iconBg}`}>
                  <span className={category.iconColor}>{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{fr[category.titleKey]}</h3>
                <p className="text-gray-600 mb-4">{fr[category.descriptionKey]}</p>
                <div className="mt-auto pt-4">
                  <Link to={category.path} className="text-primary-600 font-medium flex items-center hover:underline">
                    {fr.start_practice}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Practice - Unit 2 */}
      <section className="card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-10">
            <span className="inline-block bg-orange-200 text-orange-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              {fr.unit2_shopping_directions}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{fr.master_shopping_navigation_a1}</h2>
            <p className="text-gray-700 mb-6">{fr.learn_practical_vocab_phrases}</p>
            <div className="flex gap-4">
              <Link to="/quiz/vo_02-01" className="btn btn-primary">
                {fr.shopping_vocabulary}
              </Link>
              <Link to="/quiz/gr_02-01" className="btn bg-orange-100 text-orange-800 hover:bg-orange-200">
                {fr.imperatives_quiz}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-b from-orange-600 to-orange-700 p-6 md:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">{fr.topics_covered}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.shopping_vocab_transactions}</span>
                </li>
              <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.asking_giving_directions}</span>
                </li>
              <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.real_world_dialogue_practice}</span>
                </li>
              <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.text_to_speech_pronunciation}</span>
                </li>
              <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.interactive_quizzes_role_plays}</span>
                </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Practice - Present Progressive */}
      <section className="card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-purple-50 to-blue-100 p-6 md:p-10">
            <span className="inline-block bg-purple-200 text-purple-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              {fr.express_current_actions_complaints}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{fr.master_present_progressive_a1}</h2>
            <p className="text-gray-700 mb-6">{fr.master_present_progressive_tense}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/quiz/vo_02-05" className="btn btn-primary bg-blue-600 hover:bg-blue-700">
                📚 {fr.vocabulary}
              </Link>
              <Link to="/quiz/gr_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                📝 {fr.grammar}
              </Link>
              <Link to="/quiz/re_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                📖 {fr.reading}
              </Link>
              <Link to="/quiz/sp_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                🗣️ {fr.speaking}
              </Link>
              <Link to="/quiz/li_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                🎧 {fr.listening}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-b from-purple-600 to-blue-600 p-6 md:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">{fr.key_learning_outcomes}</h3>
            <ul className="space-y-3">
              <li key="master_aming_verb_forms" className="flex items-start">
                  <svg className="h-6 w-6 text-purple-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.master_aming_verb_forms}</span>
                </li>
              <li key="describe_actions_happening_now" className="flex items-start">
                  <svg className="h-6 w-6 text-purple-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.describe_actions_happening_now}</span>
                </li>
              <li key="express_complaints_current_situations" className="flex items-start">
                  <svg className="h-6 w-6 text-purple-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.express_complaints_current_situations}</span>
                </li>
              <li key="song_based_learning_bob_marley" className="flex items-start">
                  <svg className="h-6 w-6 text-purple-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.song_based_learning_bob_marley}</span>
                </li>
              <li key="interactive_practice_all_5_skills" className="flex items-start">
                  <svg className="h-6 w-6 text-purple-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.interactive_practice_all_5_skills}</span>
                </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Practice - Unit 3: Transportation & All Tenses */}
      <section className="card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-teal-50 to-cyan-100 p-6 md:p-10">
            <span className="inline-block bg-teal-200 text-teal-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              {fr.unit3_transportation_all_tenses_new}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{fr.master_transportation_tenses_a1}</h2>
            <p className="text-gray-700 mb-6">{fr.learn_practical_transport_vocab}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/quiz/vo_03-01" className="btn btn-primary bg-teal-600 hover:bg-teal-700">
                🚗 {fr.vocabulary}
              </Link>
              <Link to="/quiz/gr_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                📝 {fr.grammar}
              </Link>
              <Link to="/quiz/re_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                📖 {fr.reading}
              </Link>
              <Link to="/quiz/sp_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                🗣️ {fr.speaking}
              </Link>
              <Link to="/quiz/li_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                🎧 {fr.listening}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-b from-teal-600 to-cyan-600 p-6 md:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">{fr.topics_covered}</h3>
            <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.complete_transportation_vocabulary}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.master_all_3_tenses}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.real_world_scenarios_directions}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.enhanced_audio_5_second_pauses}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{fr.interactive_activities_all_5_skills}</span>
                </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Unit 3 Complete Course with All 20 Activities */}
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{fr.complete_unit3_learning_path}</h2>
          <p className="text-gray-700 text-center mb-8">{fr.explore_20_interactive_activities}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {unit3Skills.map((skill) => (
              <div key={skill.titleKey} className={`p-6 rounded-lg ${skill.bgColor}`}>
                <h3 className="text-lg font-bold mb-3">{fr[skill.titleKey]}</h3>
                <ul className="space-y-2 mb-4">
                  {skill.lessons.map((lesson, idx) => (
                    <li key={idx} className="text-sm">
                      <Link to={`/quiz/${lesson.id}`} className="text-blue-600 hover:underline flex items-center gap-2">
                        <span>→</span> {fr[lesson.nameKey]}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={skill.hubPath} className="btn btn-sm text-center w-full bg-white hover:bg-gray-100 text-gray-800">
                  {fr.view_all} {fr[skill.titleKey]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section - Practice & Consolidation */}
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3 text-center">{fr.review}</h2>
            <p className="text-gray-700 text-center">{fr.consolidate_learning_speaking_worksheets}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {reviewActivities.map((activity) => (
              <div key={activity.id} className={`p-6 rounded-lg ${activity.bgColor} shadow-md hover:shadow-lg transition-shadow`}>
                <div className="text-4xl mb-3 text-center">{activity.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-center text-gray-800">{fr[activity.titleKey]}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">{fr[activity.descriptionKey]}</p>
                <Link to={activity.path} className="btn btn-sm text-center w-full bg-white hover:bg-gray-100 text-gray-800 font-medium">
                  {fr.start_activity}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
