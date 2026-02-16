import { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateEvaluationPDF } from '@/lib/pdfGenerator';
import { fr } from '../locales/fr';

// Define interfaces for the question types
interface McQuestion {
  type: 'mc';
  question: string;
  options: string[];
  answer: string;
  sublevel: string;
  curriculumUnit: number;
  hiddenText?: string;
  text?: string;
}

interface FillQuestion {
  type: 'fill';
  question: string;
  answer: string;
  sublevel: string;
  curriculumUnit: number;
  hiddenText?: string;
  text?: string;
}

// Create a union type for the questions
type Question = McQuestion | FillQuestion;

const sections = ['grammar', 'vocabulary', 'listening', 'reading'];

const questions: { A1: { [key: string]: Question[] } } = {
  A1: {
    grammar: [
      { type: 'mc', question: fr.verb_to_be_question, options: ['am', 'is', 'are'], answer: 'am', sublevel: 'A1-1', curriculumUnit: 1 },
      { type: 'fill', question: fr.verb_to_be_fill_question, answer: 'is', sublevel: 'A1-1', curriculumUnit: 1 },
      { type: 'mc', question: fr.students_question, options: ['is', 'are', 'am'], answer: 'are', sublevel: 'A1-1', curriculumUnit: 3 },
      { type: 'fill', question: fr.play_tennis_fill_question, answer: "doesn't play", sublevel: 'A1-2', curriculumUnit: 5 },
      { type: 'mc', question: fr.live_in_house_question, options: ['Do', 'Does', 'Is'], answer: 'Do', sublevel: 'A1-2', curriculumUnit: 5 },
      { type: 'fill', question: fr.always_go_park_fill_question, answer: 'always go', sublevel: 'A1-3', curriculumUnit: 6 },
    ],
    vocabulary: [
      { type: 'mc', question: fr.read_book_question, options: ['book', 'car', 'house'], answer: 'book', sublevel: 'A1-1', curriculumUnit: 1 },
      { type: 'fill', question: fr.father_is_doctor_fill_question, answer: 'father', sublevel: 'A1-1', curriculumUnit: 4 },
      { type: 'mc', question: fr.tree_is_green_question, options: ['green', 'red', 'blue'], answer: 'green', sublevel: 'A1-2', curriculumUnit: 4 },
      { type: 'fill', question: fr.sun_is_yellow_fill_question, answer: 'yellow', sublevel: 'A1-2', curriculumUnit: 2 },
      { type: 'mc', question: fr.drink_morning_question, options: ['tea', 'lunch', 'dinner'], answer: 'tea', sublevel: 'A1-3', curriculumUnit: 6 },
      { type: 'fill', question: fr.buy_food_shop_fill_question, answer: 'shop', sublevel: 'A1-3', curriculumUnit: 8 },
    ],
    listening: [
      { type: 'mc', question: fr.toms_job_question, options: [fr.toms_job_options_1, fr.toms_job_options_2, fr.toms_job_options_3], answer: 'Teacher', hiddenText: fr.toms_job_hidden_text, sublevel: 'A1-1', curriculumUnit: 3 },
      { type: 'mc', question: fr.where_is_anna_question, options: [fr.where_is_anna_options_1, fr.where_is_anna_options_2, fr.where_is_anna_options_3], answer: 'House', hiddenText: fr.where_is_anna_hidden_text, sublevel: 'A1-1', curriculumUnit: 2 },
      { type: 'mc', question: fr.what_does_maria_like_question, options: [fr.what_does_maria_like_options_1, fr.what_does_maria_like_options_2, fr.what_does_maria_like_options_3], answer: 'Cats', hiddenText: fr.what_does_maria_like_hidden_text, sublevel: 'A1-2', curriculumUnit: 4 },
      { type: 'mc', question: fr.what_is_lisas_school_like_question, options: [fr.what_is_lisas_school_like_options_1, fr.what_is_lisas_school_like_options_2, fr.what_is_lisas_school_like_options_3], answer: 'Big', hiddenText: fr.what_is_lisas_school_like_hidden_text, sublevel: 'A1-3', curriculumUnit: 6 },
      { type: 'mc', question: fr.what_does_john_do_question, options: [fr.what_does_john_do_options_1, fr.what_does_john_do_options_2, fr.what_does_john_do_options_3], answer: 'Plays', hiddenText: fr.what_does_john_do_hidden_text, sublevel: 'A1-3', curriculumUnit: 5 },
    ],
    reading: [
      { type: 'mc', question: fr.where_is_john_from_question, options: [fr.where_is_john_from_options_1, fr.where_is_john_from_options_2, fr.where_is_john_from_options_3], answer: 'Spain', text: fr.where_is_john_from_text, sublevel: 'A1-1', curriculumUnit: 2 },
      { type: 'mc', question: fr.what_does_anna_have_question, options: [fr.what_does_anna_have_options_1, fr.what_does_anna_have_options_2, fr.what_does_anna_have_options_3], answer: 'Cat', text: fr.what_does_anna_have_text, sublevel: 'A1-2', curriculumUnit: 4 },
      { type: 'mc', question: fr.what_does_maria_do_question, options: [fr.what_does_maria_do_options_1, fr.what_does_maria_do_options_2, fr.what_does_maria_do_options_3], answer: 'Plays', text: fr.what_does_maria_do_text, sublevel: 'A1-2', curriculumUnit: 5 },
      { type: 'mc', question: fr.what_is_toms_house_like_question, options: [fr.what_is_toms_house_like_options_1, fr.what_is_toms_house_like_options_2, fr.what_is_toms_house_like_options_3], answer: 'Big', text: fr.what_is_toms_house_like_text, sublevel: 'A1-3', curriculumUnit: 8 },
      { type: 'mc', question: fr.what_does_lisa_like_question, options: [fr.what_does_lisa_like_options_1, fr.what_does_lisa_like_options_2, fr.what_does_lisa_like_options_3], answer: 'Park', text: fr.what_does_lisa_like_text, sublevel: 'A1-3', curriculumUnit: 6 },
    ],
  },
};

const A1PlacementEvaluationPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const currentSection = sections[step] || 'results';
  const sectionLengths = {
    grammar: questions.A1.grammar.length,
    vocabulary: questions.A1.vocabulary.length,
    listening: questions.A1.listening.length,
    reading: questions.A1.reading.length,
  };

  const playTTS = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    const voices = window.speechSynthesis.getVoices();
    const gbVoice = voices.find((voice) => voice.lang === 'en-GB');
    if (gbVoice) utterance.voice = gbVoice;
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (section: string, index: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`A1-${section}-${index}`]: answer,
    }));
  };

  const calculateScore = (section: string) => {
    let totalScore = 0;
    questions.A1[section].forEach((q, i) => {
      const userAnswer = answers[`A1-${section}-${i}`];
      if (userAnswer === q.answer) totalScore += 1;
    });
    setScores((prev) => ({ ...prev, [`A1-${section}`]: totalScore }));
  };

  const handleNext = () => {
    if (step < sections.length) {
      calculateScore(currentSection);
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderQuestion = (section: string, q: Question, index: number) => {
    const key = `A1-${section}-${index}`;
    return (
      <div className="mb-4">
        <p className="text-base font-medium mb-2">{q.question}</p>
        {q.hiddenText && (
          <div className="mb-2">
            <button
              onClick={() => playTTS(q.hiddenText!)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {fr.play_audio}
            </button>
            <span className="sr-only">{q.hiddenText}</span>
          </div>
        )}
        {q.text && <p className="text-sm mb-2">{q.text}</p>}
        {q.type === 'mc' && (
          <div>
            {(q as McQuestion).options.map((opt: string) => (
              <label key={opt} className="block mb-1">
                <input
                  type="radio"
                  name={key}
                  value={opt}
                  checked={answers[key] === opt}
                  onChange={() => handleAnswer(section, index, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        )}
        {q.type === 'fill' && (
          <input
            type="text"
            value={answers[key] || ''}
            onChange={(e) => handleAnswer(section, index, e.target.value)}
            className="border p-2 w-full rounded"
            placeholder={fr.type_your_answer}
          />
        )}
      </div>
    );
  };

  const renderResults = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const level = totalScore >= 16 ? 'A1-3' : totalScore >= 10 ? 'A1-2' : 'A1-1';
    const confirmPath = level === 'A1-2' ? '/confirm-a1-2' : '/confirm-a1-3';
    const feedback = {
      grammar: scores['A1-grammar'] < 4 ? fr.review_present_simple_basic_questions : fr.good_grammar_skills,
      vocabulary: scores['A1-vocabulary'] < 4 ? fr.practice_basic_nouns_adjectives : fr.strong_vocabulary,
      listening: scores['A1-listening'] < 3 ? fr.practice_understanding_short_spoken_sentences : fr.great_listening_skills,
      reading: scores['A1-reading'] < 3 ? fr.practice_reading_short_texts : fr.excellent_reading_comprehension,
    };

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{fr.a1_placement_test_results}</h2>
        <p className="text-base mb-2">{fr.grammar_score} {scores['A1-grammar'] || 0}/{sectionLengths.grammar} - {feedback.grammar}</p>
        <p className="text-base mb-2">{fr.vocabulary_score} {scores['A1-vocabulary'] || 0}/{sectionLengths.vocabulary} - {feedback.vocabulary}</p>
        <p className="text-base mb-2">{fr.listening_score} {scores['A1-listening'] || 0}/{sectionLengths.listening} - {feedback.listening}</p>
        <p className="text-base mb-2">{fr.reading_score} {scores['A1-reading'] || 0}/{sectionLengths.reading} - {feedback.reading}</p>
        <p className="text-base mb-2">{fr.total_score} {totalScore}/22</p>
        <p className="text-base font-medium mb-4">{fr.recommended_level} {level}</p>
        <p className="text-sm text-gray-600 mb-4">
          {level === 'A1-1' && fr.start_with_units_1_2_curriculum}
          {level === 'A1-2' && fr.continue_with_units_3_5_strengthen_beginner}
          {level === 'A1-3' && fr.advance_with_units_6_8_improve_upper_beginner}
        </p>
        <div className="flex justify-center space-x-4">
          {level === 'A1-1' ? (
            <Link
              to="/curriculum"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {fr.start_a1_1_lessons}
            </Link>
          ) : (
            <Link
              to={confirmPath}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {fr.confirm_your_level}
            </Link>
          )}
          <button
            onClick={() => {
              const evaluationData = {
                scores,
                recommendations: level,
                totalScore,
                totalQuestions: 22,
                sectionDetails: {
                  grammar: {
                    score: scores['A1-grammar'] || 0,
                    total: sectionLengths.grammar,
                    feedback: feedback.grammar,
                  },
                  vocabulary: {
                    score: scores['A1-vocabulary'] || 0,
                    total: sectionLengths.vocabulary,
                    feedback: feedback.vocabulary,
                  },
                  listening: {
                    score: scores['A1-listening'] || 0,
                    total: sectionLengths.listening,
                    feedback: feedback.listening,
                  },
                  reading: {
                    score: scores['A1-reading'] || 0,
                    total: sectionLengths.reading,
                    feedback: feedback.reading,
                  },
                },
              };
              generateEvaluationPDF(evaluationData);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download PDF
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">{fr.a1_level_placement_test}</h1>
      <p className="text-center mb-4">{fr.test_helps_find_best_a1_course_level}</p>
      {step < sections.length ? (
        <div>
          <h2 className="text-xl font-medium mb-4">{fr[currentSection as keyof typeof fr]}</h2>
          {questions.A1[currentSection].map((q: Question, i: number) => (
            <div key={i}>{renderQuestion(currentSection, q, i)}</div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={step === 0}
              className={`bg-gray-500 text-white px-4 py-2 rounded ${step === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
            >
              {fr.previous}
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {step === sections.length - 1 ? fr.finish : fr.next}
            </button>
          </div>
        </div>
      ) : (
        renderResults()
      )}
    </div>
  );
};

export default A1PlacementEvaluationPage;