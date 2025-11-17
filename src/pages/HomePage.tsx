import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section - SmartHub Banner */}
      <section
        className="relative overflow-hidden rounded-2xl text-white h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-cover bg-center shadow-xl"
        style={{ backgroundImage: `url('/slim/assets/images/fb_cover-01.png')` }}
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
              Start Learning
            </Link>
            <Link to="/curriculum" className="btn bg-white/90 hover:bg-white text-gray-800 shadow-lg">
              View Curriculum
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Interactive Practice Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="card p-6 h-full flex flex-col relative">
                {category.badge && (
                  <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    {category.badge}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${category.iconBg}`}>
                  <span className={category.iconColor}>{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="mt-auto pt-4">
                  <Link to={category.path} className="text-primary-600 font-medium flex items-center hover:underline">
                    Start Practice
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
              🆕 Unit 2: Shopping & Directions
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Master Shopping & Navigation (A1)</h2>
            <p className="text-gray-700 mb-6">Learn practical vocabulary and phrases for shopping, asking directions, and understanding locations with interactive quizzes and flashcards.</p>
            <div className="flex gap-4">
              <Link to="/quiz/vo_02-01" className="btn btn-primary">
                Shopping Vocabulary
              </Link>
              <Link to="/quiz/gr_02-01" className="btn bg-orange-100 text-orange-800 hover:bg-orange-200">
                Imperatives Quiz
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-b from-orange-600 to-orange-700 p-6 md:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">📚 Topics Covered:</h3>
            <ul className="space-y-3">
              {featuredLessonPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-orange-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Practice - Present Progressive */}
      <section className="card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-purple-50 to-blue-100 p-6 md:p-10">
            <span className="inline-block bg-purple-200 text-purple-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              🎯 Express Current Actions & Complaints
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Master the Present Progressive (A1)</h2>
            <p className="text-gray-700 mb-6">Master the Present Progressive tense (am/is/are + -ing) to describe what's happening RIGHT NOW and express complaints using interactive lessons and real-world scenarios.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/quiz/vo_02-05" className="btn btn-primary bg-blue-600 hover:bg-blue-700">
                📚 Vocabulary
              </Link>
              <Link to="/quiz/gr_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                📝 Grammar
              </Link>
              <Link to="/quiz/re_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                📖 Reading
              </Link>
              <Link to="/quiz/sp_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                🗣️ Speaking
              </Link>
              <Link to="/quiz/li_02-05" className="btn bg-purple-100 text-purple-800 hover:bg-purple-200">
                🎧 Listening
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-b from-purple-600 to-blue-600 p-6 md:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">✨ Key Learning Outcomes:</h3>
            <ul className="space-y-3">
              {presentProgressivePoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-purple-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Practice - Unit 3: Transportation & All Tenses */}
      <section className="card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-teal-50 to-cyan-100 p-6 md:p-10">
            <span className="inline-block bg-teal-200 text-teal-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              ✨ Unit 3: Transportation & All Tenses (NEW)
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Master Transportation & Tenses (A1)</h2>
            <p className="text-gray-700 mb-6">Learn practical transportation vocabulary and master Present Progressive, Simple Past, and Going To Future tenses through real-world scenarios like asking directions, describing journeys, and planning trips.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/quiz/vo_03-01" className="btn btn-primary bg-teal-600 hover:bg-teal-700">
                🚗 Vocabulary
              </Link>
              <Link to="/quiz/gr_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                📝 Grammar
              </Link>
              <Link to="/quiz/re_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                📖 Reading
              </Link>
              <Link to="/quiz/sp_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                🗣️ Speaking
              </Link>
              <Link to="/quiz/li_03-01" className="btn bg-teal-100 text-teal-800 hover:bg-teal-200">
                🎧 Listening
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-b from-teal-600 to-cyan-600 p-6 md:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">🌍 Topics Covered:</h3>
            <ul className="space-y-3">
              {unit3LessonPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-teal-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Unit 3 Complete Course with All 20 Activities */}
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">🎓 Complete Unit 3 Learning Path</h2>
          <p className="text-gray-700 text-center mb-8">Explore all 20 interactive activities across 5 language skills. Each skill has 4 lessons covering different transportation scenarios and verb tenses.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {unit3Skills.map((skill) => (
              <div key={skill.title} className={`p-6 rounded-lg ${skill.bgColor}`}>
                <h3 className="text-lg font-bold mb-3">{skill.title}</h3>
                <ul className="space-y-2 mb-4">
                  {skill.lessons.map((lesson, idx) => (
                    <li key={idx} className="text-sm">
                      <Link to={`/quiz/${lesson.id}`} className="text-blue-600 hover:underline flex items-center gap-2">
                        <span>→</span> {lesson.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={skill.hubPath} className="btn btn-sm text-center w-full bg-white hover:bg-gray-100 text-gray-800">
                  View All {skill.title}
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
            <h2 className="text-3xl font-bold mb-3 text-center">🎯 Review</h2>
            <p className="text-gray-700 text-center">Consolidate your learning with speaking worksheets, conversation games, and immersive listening activities. Perfect for practice and retention!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {reviewActivities.map((activity) => (
              <div key={activity.id} className={`p-6 rounded-lg ${activity.bgColor} shadow-md hover:shadow-lg transition-shadow`}>
                <div className="text-4xl mb-3 text-center">{activity.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-center text-gray-800">{activity.title}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">{activity.description}</p>
                <Link to={activity.path} className="btn btn-sm text-center w-full bg-white hover:bg-gray-100 text-gray-800 font-medium">
                  Start Activity
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Updated Data
const categories = [
  {
    title: "Vocabulary",
    description: "Practice everyday words with interactive quizzes & flashcards",
    path: "/vocabulary",
    icon: "📚",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "New"
  },
  {
    title: "Grammar",
    description: "Master verb forms with guided exercises & flip cards",
    path: "/grammar",
    icon: "📝",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badge: "New"
  },
  {
    title: "Speaking",
    description: "Improve pronunciation with conversation activities",
    path: "/speaking",
    icon: "🗣️",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    title: "Reading",
    description: "Develop skills with beginner-friendly texts",
    path: "/reading",
    icon: "📖",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    title: "Listening",
    description: "Enhance comprehension with audio exercises",
    path: "/listening",
    icon: "🎧",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600"
  }
];

const featuredLessonPoints = [
  "🛍️ Shopping vocabulary & transactions",
  "🗺️ Asking for and giving directions",
  "💬 Real-world dialogue practice",
  "🔊 Text-to-speech & pronunciation",
  "✅ Interactive quizzes & role plays"
];

const presentProgressivePoints = [
  "✨ Master am/is/are + -ing verb forms",
  "🎯 Describe actions happening RIGHT NOW",
  "😤 Express complaints about current situations",
  "🎵 Song-based learning from Bob Marley",
  "✅ Interactive practice across all 5 skills"
];

const unit3LessonPoints = [
  "🚗 Complete transportation vocabulary (vehicles, verbs, adjectives, phrases)",
  "⏱️ Master all 3 tenses: Present Progressive, Simple Past, Going To Future",
  "🗺️ Real-world scenarios: directions, journeys, travel planning",
  "🎧 Enhanced audio with 5-second pauses for better comprehension",
  "✅ 20 interactive activities across all 5 skills"
];

const unit3Skills = [
  {
    title: "Vocabulary",
    icon: "📚",
    bgColor: "bg-blue-50",
    hubPath: "/vocabulary",
    lessons: [
      { id: "vo_03-01", name: "Vehicles" },
      { id: "vo_03-02", name: "Action Verbs" },
      { id: "vo_03-03", name: "Adjectives" },
      { id: "vo_03-04", name: "Phrases" }
    ]
  },
  {
    title: "Grammar",
    icon: "📝",
    bgColor: "bg-green-50",
    hubPath: "/grammar",
    lessons: [
      { id: "gr_03-01", name: "Present Progressive" },
      { id: "gr_03-02", name: "Going To Future" },
      { id: "gr_03-03", name: "Simple Past" },
      { id: "gr_03-04", name: "Mixed Tenses" }
    ]
  },
  {
    title: "Reading",
    icon: "📖",
    bgColor: "bg-purple-50",
    hubPath: "/reading",
    lessons: [
      { id: "re_03-01", name: "Present Progressive" },
      { id: "re_03-02", name: "Simple Past" },
      { id: "re_03-03", name: "Going To Future" },
      { id: "re_03-04", name: "Comparatives" }
    ]
  },
  {
    title: "Speaking",
    icon: "🗣️",
    bgColor: "bg-yellow-50",
    hubPath: "/speaking",
    lessons: [
      { id: "sp_03-01", name: "Ask Directions" },
      { id: "sp_03-02", name: "Take Transport" },
      { id: "sp_03-03", name: "Past Journey" },
      { id: "sp_03-04", name: "Plan Trip" }
    ]
  },
  {
    title: "Listening",
    icon: "🎧",
    bgColor: "bg-pink-50",
    hubPath: "/listening",
    lessons: [
      { id: "li_03-01", name: "Directions" },
      { id: "li_03-02", name: "Past Travel" },
      { id: "li_03-03", name: "Future Plans" },
      { id: "li_03-04", name: "All Tenses" }
    ]
  }
];

const reviewActivities = [
  {
    id: 1,
    icon: "📝",
    title: "Speaking Worksheet 1",
    description: "Greetings & Personal Info - Master introductions",
    path: "/review/speaking-worksheet-01",
    bgColor: "bg-indigo-50"
  },
  {
    id: 2,
    icon: "⏰",
    title: "Speaking Worksheet 2",
    description: "Daily Activities & Time - Describe your routine",
    path: "/review/speaking-worksheet-02",
    bgColor: "bg-cyan-50"
  },
  {
    id: 3,
    icon: "✅",
    title: "Speaking Worksheet 3",
    description: "Verb To Be & Present Simple - Practice basics",
    path: "/review/speaking-worksheet-03",
    bgColor: "bg-amber-50"
  },
  {
    id: 4,
    icon: "❓",
    title: "Speaking Worksheet 4",
    description: "Questions Master - Form & answer questions",
    path: "/review/speaking-worksheet-04",
    bgColor: "bg-rose-50"
  },
  {
    id: 5,
    icon: "✈️",
    title: "Travel Stories",
    description: "Conversation game - Share your travel experiences",
    path: "/review/travel-stories",
    bgColor: "bg-sky-50"
  },
  {
    id: 6,
    icon: "🚗",
    title: "Car Driving",
    description: "Narration game - Tell driving stories in past tense",
    path: "/review/car-driving",
    bgColor: "bg-orange-50"
  },
  {
    id: 7,
    icon: "🏎️",
    title: "Car Comparison",
    description: "Comparative game - Compare vehicles & features",
    path: "/review/car-comparison",
    bgColor: "bg-yellow-50"
  },
  {
    id: 8,
    icon: "🎧",
    title: "Listening Activity",
    description: "6-level progressive listening comprehension",
    path: "/review/listening-activity",
    bgColor: "bg-blue-50"
  },
  {
    id: 9,
    icon: "📖",
    title: "School Memories",
    description: "Share school experiences with mood indicators",
    path: "/review/school-memories",
    bgColor: "bg-purple-50"
  },
  {
    id: 10,
    icon: "🌟",
    title: "School Life Mix",
    description: "Mixed tenses - past, present, & future practice",
    path: "/review/school-life-mix",
    bgColor: "bg-green-50"
  }
];

export default HomePage;
