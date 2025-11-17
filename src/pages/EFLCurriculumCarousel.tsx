// src/pages/EFLCurriculumCarousel.tsx
import React, { useState, useMemo } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight, FaCalendar, FaClock } from 'react-icons/fa';

const courseSchedule = [
  {
    week: 'Week 1',
    theme: 'Foundation & Self-Introduction',
    duration: 'October 14-20, 2025',
    sessions: [
      {
        session: 'Lesson 1',
        date: 'Monday, October 14, 2025',
        time: '11:00-12:30',
        objective: 'Build rapport & assess level',
        content: 'Ice-breaking activities, assessing current English level through guided conversation, introducing survival phrases for daily interactions (greetings, basic questions, expressing needs), pronunciation fundamentals, setting personal learning goals. Grammar: Verb "to be" in all forms (am/is/are), Do/does introduced.',
        status: '✅ Completed',
      },
      {
        session: 'Lesson 2',
        date: 'Wednesday, October 16, 2025',
        time: '11:00-12:30',
        objective: 'Self-presentation skills',
        content: 'Talking about yourself (name, age, background, interests, hobbies). Vocabulary: Clothes, colors, frequency adverbs (always, usually, sometimes, never). Time-telling with analog and digital clocks. Pronunciation practice.',
        status: '✅ Completed',
      },
      {
        session: 'Lesson 3',
        date: 'Friday, October 18, 2025',
        time: '11:00-12:30',
        objective: 'Forming questions & time expressions',
        content: 'Yes/No questions with "to be". Short answer practice. Contractions (I\'m, she\'s, they\'re, etc.). Days of the week, months, cardinal numbers with ordinals (1st, 2nd, 3rd). Basic directional vocabulary (left, right, straight, corner). Phone conversation basics.',
        status: '✅ Completed',
      },
      {
        session: 'Lesson 4',
        date: 'Sunday, October 20, 2025',
        time: '11:00-12:30',
        objective: 'Shopping & Directions',
        content: 'Detailed directional language with landmarks and street names. Asking for and giving precise directions. Shopping vocabulary: items, sizes, colors, prices, currency. Returns and exchanges. Cashier interactions. Real-world application of all previous grammar foundations.',
        status: '✅ Completed',
      },
    ],
  },
  {
    week: 'Week 2',
    theme: 'Speaking Fluency & Natural Rhythm (Music-Based Learning)',
    duration: 'October 23-27, 2025',
    sessions: [
      {
        session: 'Song Practice Session',
        date: 'Wednesday, October 23, 2025',
        time: '11:00-12:30',
        objective: 'Review & Speaking Enhancement through music',
        content: '🎵 Song-based speaking practice: Bob Marley\'s "Redemption Song". Activities: Listen and identify familiar vocabulary, practice pronunciation with the song\'s rhythm, discuss the song\'s meaning and message, identify grammar structures in the lyrics. Develop natural speech patterns and authentic pronunciation. Homework: Learn full lyrics while maintaining the song\'s rhythm throughout the week.',
        status: '🎵 In Progress',
      },
      {
        session: 'Lesson 4 Extended',
        date: 'Sunday, October 27, 2025',
        time: '11:00-12:30',
        objective: 'Song Review + Present Progressive Introduction',
        content: '🔄 Review "Redemption Song" learned over the week; develop fluency through repeated practice. NEW GRAMMAR: Present Progressive (am/is/are + -ing) to describe actions happening right now. Examples: "I am studying English," "She is singing the song," "They are learning together." Contrast with simple present. Real-life conversation practice using new tense to describe current classroom and real-time situations.',
        status: '🔄 Today\'s Session',
      },
    ],
  },
  {
    week: 'Week 3',
    theme: 'Housing & Neighborhood Navigation (Slower Pace Begins)',
    duration: 'October 29 - October 31, 2025',
    sessions: [
      {
        session: 'Lesson 5',
        date: 'Wednesday, October 29, 2025',
        time: '11:00-12:30',
        objective: 'Housing & Neighborhood Navigation (Part 1)',
        content: 'Advanced directional instructions using Present Progressive. Describing location and neighborhood features. Apartment hunting conversations. Talking with landlords about rent, lease agreements, and move-in details. Introducing yourself to neighbors. Grammar: Present Progressive for describing ongoing situations, questions about housing, prepositions of place.',
        status: '⏳ Upcoming',
      },
      {
        session: 'Lesson 6',
        date: 'Friday, October 31, 2025',
        time: '11:00-12:30',
        objective: 'Housing Practice & Consolidation',
        content: 'Continued application of Lesson 5 concepts through real-world dialogues. Scenarios: describing housing problems and requesting repairs, negotiating with landlords, asking about utilities and amenities. Role-plays with native-like interactions. Consolidation of housing vocabulary and phrases.',
        status: '⏳ Upcoming',
      },
    ],
  },
  {
    week: 'Week 4',
    theme: 'Transportation & Services (Building Practical Skills)',
    duration: 'November 5 - November 7, 2025',
    sessions: [
      {
        session: 'Lesson 7',
        date: 'Wednesday, November 5, 2025',
        time: '11:00-12:30',
        objective: 'Transportation & Services (Part 1)',
        content: 'Public transport vocabulary: bus, train, taxi, subway. Asking for directions using transportation. Using maps and schedules. Doctor\'s office conversations: describing symptoms, making appointments, understanding prescriptions. Banking basics: opening accounts, understanding services, asking about fees.',
        status: '⏳ Upcoming',
      },
      {
        session: 'Lesson 8',
        date: 'Friday, November 7, 2025',
        time: '11:00-12:30',
        objective: 'Transportation & Services Practice',
        content: 'Dialogues and role-plays: buying tickets, asking for help on public transport, directions to destinations. At the doctor: explaining medical issues, understanding instructions, pharmacy interactions. At the bank: conducting transactions, asking about account options. Emergency situations vocabulary: calling 911, describing emergencies, getting help.',
        status: '⏳ Upcoming',
      },
    ],
  },
  {
    week: 'Week 5',
    theme: 'Social & Professional Connections',
    duration: 'November 12 - November 14, 2025',
    sessions: [
      {
        session: 'Lesson 9',
        date: 'Wednesday, November 12, 2025',
        time: '11:00-12:30',
        objective: 'Social Connections (Building Confidence)',
        content: 'Making small talk: weather, current events, hobbies, interests. Expressing opinions and preferences politely. Accepting and declining invitations appropriately. Sharing about Tunisian culture with Americans. Understanding American social cues and conversation norms. Building friendships through natural conversation.',
        status: '⏳ Upcoming',
      },
      {
        session: 'Lesson 10',
        date: 'Friday, November 14, 2025',
        time: '11:00-12:30',
        objective: 'Education & Work (Professional Contexts)',
        content: 'Discussing educational options (GED, community college, vocational training). Job interview basics: talking about work experience, skills, and career goals. Understanding workplace conversation and professional introductions. Networking basics. Workplace scenarios: asking for help, understanding instructions, communicating with colleagues.',
        status: '⏳ Upcoming',
      },
    ],
  },
  {
    week: 'Week 6',
    theme: 'Advanced Communication & Course Consolidation',
    duration: 'November 19 - November 21, 2025',
    sessions: [
      {
        session: 'Lesson 11',
        date: 'Wednesday, November 19, 2025',
        time: '11:00-12:30',
        objective: 'Communication Strategies & Independence',
        content: 'Using technology and apps in English: ordering Uber, using GPS, online shopping, social media. Understanding different American accents and speaking speeds. Idiomatic expressions for everyday situations. Slang awareness (what to use and what to avoid). Listening to native speakers: podcasts, movies, news. Building independent learning strategies.',
        status: '⏳ Upcoming',
      },
      {
        session: 'Lesson 12 - Final Consolidation',
        date: 'Friday, November 21, 2025',
        time: '11:00-12:30',
        objective: 'Final Consolidation & Course Completion',
        content: '🎉 Comprehensive role-play scenarios combining ALL learned skills. Troubleshooting common communication breakdowns. Building confidence through simulated real-life situations. Creating personal action plan for continued English improvement. Conflict management: making complaints appropriately, disagreeing politely, negotiating solutions. Celebration of progress and final assessment.',
        status: '⏳ Upcoming',
      },
    ],
  },
];

const EFLCurriculumCarousel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Flatten sessions for filtering
  const allSessions = useMemo(() => {
    return courseSchedule.flatMap(week =>
      week.sessions.map(session => ({
        ...session,
        week: week.week,
        theme: week.theme,
        duration: week.duration,
      }))
    );
  }, []);

  // Filter sessions based on search query and selected filter
  const filteredSessions = useMemo(() => {
    let sessions = allSessions;

    // Apply week filter
    if (selectedFilter !== 'All') {
      sessions = sessions.filter(session => session.week === selectedFilter);
    }

    // Apply search query
    if (searchQuery) {
      sessions = sessions.filter(session =>
        session.session.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.theme.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sessions;
  }, [searchQuery, selectedFilter, allSessions]);

  // Options for filter dropdown
  const filterOptions = [
    'All',
    ...courseSchedule.map(week => week.week),
  ];

  // Disable autoPlay when searching or filtering
  const shouldAutoPlay = searchQuery.length === 0 && selectedFilter === 'All';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Conversational English Course</h1>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Student: Slim Gharbi</h2>
          <p className="text-lg text-gray-700">Duration: 12 Lessons | October 14 - November 21, 2025</p>
          <p className="text-md text-gray-600 mt-2">Schedule: Monday - Wednesday - Friday | Mon/Wed/Fri Sessions</p>
          <p className="text-md text-gray-600">🎵 Enhanced with Song-Based Learning & Present Progressive Grammar</p>
        </div>

        {/* Search Bar and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search lessons, objectives, content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 rounded-lg shadow-lg border-2 border-indigo-200 focus:outline-none focus:border-indigo-500"
            />
            <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-indigo-500" />
          </div>
          <div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="p-4 rounded-lg shadow-lg border-2 border-indigo-200 focus:outline-none focus:border-indigo-500 w-full sm:w-auto"
            >
              {filterOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display message if no results */}
        {filteredSessions.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No results found for "{searchQuery}". Try a different search term or filter.
          </div>
        ) : (
          <Carousel
            key={filteredSessions.length}
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={shouldAutoPlay}
            interval={6000}
            stopOnHover={true}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  onClick={onClickHandler}
                  title={label}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors z-10 shadow-lg"
                >
                  <FaChevronLeft />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  onClick={onClickHandler}
                  title={label}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors z-10 shadow-lg"
                >
                  <FaChevronRight />
                </button>
              )
            }
          >
            {filteredSessions.map((session, index) => (
              <motion.div
                key={`${session.week}-${session.session}-${index}`}
                className="p-8 bg-white rounded-xl shadow-2xl mx-4 mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {/* Session Header */}
                <div className="mb-6 border-b-2 border-indigo-100 pb-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                    <h2 className="text-3xl font-bold text-indigo-700">
                      {session.session}
                    </h2>
                    <div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
                      <span className="inline-block bg-teal-100 text-teal-800 text-sm font-semibold px-4 py-1 rounded-full">
                        {session.week}
                      </span>
                      <span className={`inline-block text-sm font-semibold px-4 py-1 rounded-full ${
                        session.status.includes('✅') ? 'bg-green-100 text-green-800' :
                        session.status.includes('🎵') ? 'bg-purple-100 text-purple-800' :
                        session.status.includes('🔄') ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-purple-600 mb-2">
                    {session.theme}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-indigo-500" />
                      <span className="text-sm">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-indigo-500" />
                      <span className="text-sm">{session.time}</span>
                    </div>
                  </div>
                </div>

                {/* Session Content */}
                <div className="space-y-6">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-indigo-700 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      Lesson Objective
                    </h4>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {session.objective}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      Content & Activities
                    </h4>
                    <p className="text-gray-800 leading-relaxed">
                      {session.content}
                    </p>
                  </div>
                </div>

                {/* Session Methodology Note */}
                {index === 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <h5 className="font-semibold text-yellow-800 mb-2">📝 Session Structure (90 minutes)</h5>
                    <ul className="text-sm text-yellow-900 space-y-1">
                      <li>• Warm-up (10 min): Review & conversational practice</li>
                      <li>• Core Learning (50 min): Interactive activities & role-plays</li>
                      <li>• Real-World Application (20 min): Practical conversation scenarios</li>
                      <li>• Wrap-up (10 min): Self-assessment & homework preview</li>
                    </ul>
                  </div>
                )}

                {/* Song-Based Learning Note */}
                {session.session.includes('Song') && (
                  <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
                    <h5 className="font-semibold text-purple-800 mb-2">🎵 Music-Based Learning Benefits</h5>
                    <ul className="text-sm text-purple-900 space-y-1">
                      <li>• Natural rhythm and pronunciation development</li>
                      <li>• Memory retention through music</li>
                      <li>• Authentic stress and intonation patterns</li>
                      <li>• Confidence building through familiar songs</li>
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default EFLCurriculumCarousel;
