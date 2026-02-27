// src/pages/EFLCurriculumCarousel.tsx
import React, { useState, useMemo } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight, FaCalendar, FaClock } from 'react-icons/fa';
import { fr } from '../locales/fr';

const courseSchedule = [
  {
    week: fr.week_1,
    theme: fr.theme_foundation_self_introduction,
    duration: fr.duration_oct_14_20,
    sessions: [
      {
        session: fr.lesson_1,
        date: fr.monday_oct_14,
        time: fr.time_11_12_30,
        objective: fr.objective_build_rapport_assess_level,
        content: fr.content_lesson_1,
        status: fr.status_completed,
      },
      {
        session: fr.lesson_2,
        date: fr.wednesday_oct_16,
        time: fr.time_11_12_30,
        objective: fr.objective_self_presentation_skills,
        content: fr.content_lesson_2,
        status: fr.status_completed,
      },
      {
        session: fr.lesson_3,
        date: fr.friday_oct_18,
        time: fr.time_11_12_30,
        objective: fr.objective_forming_questions_time_expressions,
        content: fr.content_lesson_3,
        status: fr.status_completed,
      },
      {
        session: fr.lesson_4,
        date: fr.sunday_oct_20,
        time: fr.time_11_12_30,
        objective: fr.objective_shopping_directions,
        content: fr.content_lesson_4,
        status: fr.status_completed,
      },
    ],
  },
  {
    week: fr.week_2,
    theme: fr.theme_speaking_fluency_rhythm,
    duration: fr.duration_oct_23_27,
    sessions: [
      {
        session: fr.song_practice_session,
        date: fr.wednesday_oct_23,
        time: fr.time_11_12_30,
        objective: fr.objective_review_speaking_music,
        content: fr.content_song_practice_session,
        status: fr.status_in_progress,
      },
      {
        session: fr.lesson_4_extended,
        date: fr.sunday_oct_27,
        time: fr.time_11_12_30,
        objective: fr.objective_song_review_present_progressive,
        content: fr.content_lesson_4_extended,
        status: fr.status_todays_session,
      },
    ],
  },
  {
    week: fr.week_3,
    theme: fr.theme_housing_neighborhood_navigation,
    duration: fr.duration_oct_29_31,
    sessions: [
      {
        session: fr.lesson_5,
        date: fr.wednesday_oct_29,
        time: fr.time_11_12_30,
        objective: fr.objective_housing_neighborhood_navigation_part_1,
        content: fr.content_lesson_5,
        status: fr.status_upcoming,
      },
      {
        session: fr.lesson_6,
        date: fr.friday_oct_31,
        time: fr.time_11_12_30,
        objective: fr.objective_housing_practice_consolidation,
        content: fr.content_lesson_6,
        status: fr.status_upcoming,
      },
    ],
  },
  {
    week: fr.week_4,
    theme: fr.theme_transportation_services,
    duration: fr.duration_nov_5_7,
    sessions: [
      {
        session: fr.lesson_7,
        date: fr.wednesday_nov_5,
        time: fr.time_11_12_30,
        objective: fr.objective_transportation_services_part_1,
        content: fr.content_lesson_7,
        status: fr.status_upcoming,
      },
      {
        session: fr.lesson_8,
        date: fr.friday_nov_7,
        time: fr.time_11_12_30,
        objective: fr.objective_transportation_services_practice,
        content: fr.content_lesson_8,
        status: fr.status_upcoming,
      },
    ],
  },
  {
    week: fr.week_5,
    theme: fr.theme_social_professional_connections,
    duration: fr.duration_nov_12_14,
    sessions: [
      {
        session: fr.lesson_9,
        date: fr.wednesday_nov_12,
        time: fr.time_11_12_30,
        objective: fr.objective_social_connections,
        content: fr.content_lesson_9,
        status: fr.status_upcoming,
      },
      {
        session: fr.lesson_10,
        date: fr.friday_nov_14,
        time: fr.time_11_12_30,
        objective: fr.objective_education_work_professional,
        content: fr.content_lesson_10,
        status: fr.status_upcoming,
      },
    ],
  },
  {
    week: fr.week_6,
    theme: fr.theme_advanced_communication_consolidation,
    duration: fr.duration_nov_19_21,
    sessions: [
      {
        session: fr.lesson_11,
        date: fr.wednesday_nov_19,
        time: fr.time_11_12_30,
        objective: fr.objective_communication_strategies_independence,
        content: fr.content_lesson_11,
        status: fr.status_upcoming,
      },
      {
        session: fr.lesson_12_final_consolidation,
        date: fr.friday_nov_21,
        time: fr.time_11_12_30,
        objective: fr.objective_final_consolidation_completion,
        content: fr.content_lesson_12_final_consolidation,
        status: fr.status_upcoming,
      },
    ],
  },
];

const EFLCurriculumCarousel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(fr.all_filter);

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
    fr.all_filter,
    ...courseSchedule.map(week => week.week),
  ];

  // Disable autoPlay when searching or filtering
  const shouldAutoPlay = searchQuery.length === 0 && selectedFilter === 'All';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">{fr.conversational_english_course}</h1>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{fr.student_name}</h2>
          <p className="text-lg text-gray-700">{fr.duration_lessons_dates}</p>
          <p className="text-md text-gray-600 mt-2">{fr.schedule_mon_wed_fri}</p>
          <p className="text-md text-gray-600">{fr.enhanced_song_based_grammar}</p>
        </div>

        {/* Search Bar and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={fr.search_lessons_objectives_content}
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
            {fr.no_results_found_for} "{searchQuery}". {fr.try_different_search_filter}
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
                      {fr.lesson_objective}
                    </h4>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {session.objective}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      {fr.content_activities}
                    </h4>
                    <p className="text-gray-800 leading-relaxed">
                      {session.content}
                    </p>
                  </div>
                </div>

                {/* Session Methodology Note */}
                {index === 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <h5 className="font-semibold text-yellow-800 mb-2">{fr.session_structure_90_minutes}</h5>
                    <ul className="text-sm text-yellow-900 space-y-1">
                      <li>{fr.warm_up_review_conversational}</li>
                      <li>{fr.core_learning_interactive_role_plays}</li>
                      <li>{fr.real_world_application_scenarios}</li>
                      <li>{fr.wrap_up_self_assessment_homework}</li>
                    </ul>
                  </div>
                )}

                {/* Song-Based Learning Note */}
                {session.session.includes('Song') && (
                  <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
                    <h5 className="font-semibold text-purple-800 mb-2">{fr.music_based_learning_benefits}</h5>
                    <ul className="text-sm text-purple-900 space-y-1">
                      <li>{fr.natural_rhythm_pronunciation}</li>
                      <li>{fr.memory_retention_through_music}</li>
                      <li>{fr.authentic_stress_intonation}</li>
                      <li>{fr.confidence_building_familiar_songs}</li>
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
