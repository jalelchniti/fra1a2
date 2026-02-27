import { fr } from '../locales/fr';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

const questions: { A1_2: { [key: string]: Question[] } } = {
  A1_2: {
    grammar: [
      { type: 'mc', question: fr.a1_2_grammar_q1, options: [fr.a1_2_grammar_q1_option1, fr.a1_2_grammar_q1_option2, fr.a1_2_grammar_q1_option3], answer: fr.a1_2_grammar_q1_answer, sublevel: 'A1-2', curriculumUnit: 3 },
      { type: 'fill', question: fr.a1_2_grammar_q2, answer: fr.a1_2_grammar_q2_answer, sublevel: 'A1-2', curriculumUnit: 5 },
      { type: 'mc', question: fr.a1_2_grammar_q3, options: [fr.a1_2_grammar_q3_option1, fr.a1_2_grammar_q3_option2, fr.a1_2_grammar_q3_option3], answer: fr.a1_2_grammar_q3_answer, sublevel: 'A1-2', curriculumUnit: 5 },
    ],
    vocabulary: [
      { type: 'mc', question: fr.a1_2_vocabulary_q1, options: [fr.a1_2_vocabulary_q1_option1, fr.a1_2_vocabulary_q1_option2, fr.a1_2_vocabulary_q1_option3], answer: fr.a1_2_vocabulary_q1_answer, sublevel: 'A1-2', curriculumUnit: 4 },
      { type: 'fill', question: fr.a1_2_vocabulary_q2, answer: fr.a1_2_vocabulary_q2_answer, sublevel: 'A1-2', curriculumUnit: 4 },
      { type: 'mc', question: fr.a1_2_vocabulary_q3, options: [fr.a1_2_vocabulary_q3_option1, fr.a1_2_vocabulary_q3_option2, fr.a1_2_vocabulary_q3_option3], answer: fr.a1_2_vocabulary_q3_answer, sublevel: 'A1-2', curriculumUnit: 3 },
    ],
    listening: [
      { type: 'mc', question: fr.a1_2_listening_q1, options: [fr.a1_2_listening_q1_option1, fr.a1_2_listening_q1_option2, fr.a1_2_listening_q1_option3], answer: fr.a1_2_listening_q1_answer, hiddenText: fr.a1_2_listening_q1_hidden_text, sublevel: 'A1-2', curriculumUnit: 5 },
      { type: 'mc', question: fr.a1_2_listening_q2, options: [fr.a1_2_listening_q2_option1, fr.a1_2_listening_q2_option2, fr.a1_2_listening_q2_option3], answer: fr.a1_2_listening_q2_answer, hiddenText: fr.a1_2_listening_q2_hidden_text, sublevel: 'A1-2', curriculumUnit: 3 },
      { type: 'mc', question: fr.a1_2_listening_q3, options: [fr.a1_2_listening_q3_option1, fr.a1_2_listening_q3_option2, fr.a1_2_listening_q3_option3], answer: fr.a1_2_listening_q3_answer, hiddenText: fr.a1_2_listening_q3_hidden_text, sublevel: 'A1-2', curriculumUnit: 4 },
    ],
    reading: [
      { type: 'mc', question: fr.a1_2_reading_q1, options: [fr.a1_2_reading_q1_option1, fr.a1_2_reading_q1_option2, fr.a1_2_reading_q1_option3], answer: fr.a1_2_reading_q1_answer, text: fr.a1_2_reading_q1_text, sublevel: 'A1-2', curriculumUnit: 4 },
      { type: 'mc', question: fr.a1_2_reading_q2, options: [fr.a1_2_reading_q2_option1, fr.a1_2_reading_q2_option2, fr.a1_2_reading_q2_option3], answer: fr.a1_2_reading_q2_answer, text: fr.a1_2_reading_q2_text, sublevel: 'A1-2', curriculumUnit: 5 },
      { type: 'mc', question: fr.a1_2_reading_q3, options: [fr.a1_2_reading_q3_option1, fr.a1_2_reading_q3_option2, fr.a1_2_reading_q3_option3], answer: fr.a1_2_reading_q3_answer, text: fr.a1_2_reading_q3_text, sublevel: 'A1-2', curriculumUnit: 5 },
    ],
  },
};

const ConfirmA1_2Page = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const currentSection = sections[step] || 'results';
  const sectionLengths = {
    grammar: questions.A1_2.grammar.length,
    vocabulary: questions.A1_2.vocabulary.length,
    listening: questions.A1_2.listening.length,
    reading: questions.A1_2.reading.length,
  };

  const playTTS = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find((voice) => voice.lang === 'fr-FR') || voices.find((voice) => voice.lang.startsWith('fr'));
    if (frVoice) utterance.voice = frVoice;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (section: string, index: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`A1_2-${section}-${index}`]: answer,
    }));
  };

  const calculateScore = (section: string) => {
    let totalScore = 0;
    questions.A1_2[section].forEach((q, i) => {
      const userAnswer = answers[`A1_2-${section}-${i}`];
      if (userAnswer === q.answer) totalScore += 1;
    });
    setScores((prev) => ({ ...prev, [`A1_2-${section}`]: totalScore }));
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
    const key = `A1_2-${section}-${index}`;
    return (
      <div className="mb-4">
        <p className="text-base font-medium mb-2">{q.question}</p>
        {q.hiddenText && (
          <div className="mb-2">
            <button
              onClick={() => playTTS(q.hiddenText!)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {fr.a1_2_play_audio}
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
            placeholder={fr.a1_2_type_your_answer}
          />
        )}
      </div>
    );
  };

  const renderResults = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const passed = totalScore >= 8;
    const level = passed ? 'A1-2' : 'A1-1';
    const feedback = {
      grammar: scores['A1_2-grammar'] < 2 ? fr.a1_2_grammar_feedback_bad : fr.a1_2_grammar_feedback_good,
      vocabulary: scores['A1_2-vocabulary'] < 2 ? fr.a1_2_vocabulary_feedback_bad : fr.a1_2_vocabulary_feedback_good,
      listening: scores['A1_2-listening'] < 2 ? fr.a1_2_listening_feedback_bad : fr.a1_2_listening_feedback_good,
      reading: scores['A1_2-reading'] < 2 ? fr.a1_2_reading_feedback_bad : fr.a1_2_reading_feedback_good,
    };

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{fr.a1_2_confirmation_test_results}</h2>
        <p className="text-base mb-2">{fr.grammar_score} {scores['A1_2-grammar'] || 0}/{sectionLengths.grammar} - {feedback.grammar}</p>
        <p className="text-base mb-2">{fr.vocabulary_score} {scores['A1_2-vocabulary'] || 0}/{sectionLengths.vocabulary} - {feedback.vocabulary}</p>
        <p className="text-base mb-2">{fr.listening_score} {scores['A1_2-listening'] || 0}/{sectionLengths.listening} - {feedback.listening}</p>
        <p className="text-base mb-2">{fr.reading_score} {scores['A1_2-reading'] || 0}/{sectionLengths.reading} - {feedback.reading}</p>
        <p className="text-base mb-2">{fr.a1_2_total_score} {totalScore}/12</p>
        <p className="text-base font-medium mb-4">{fr.a1_2_confirmed_level} {level}</p>
        <p className="text-sm text-gray-600 mb-4">
          {passed ? fr.a1_2_start_units_3_5 : fr.a1_2_start_units_1_2}
        </p>
        <Link
          to={passed ? '/curriculum' : '/curriculum'}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {fr.a1_2_start_lessons} {level} {fr.lessons}
        </Link>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">{fr.a1_2_confirmation_test}</h1>
      <p className="text-center mb-4">{fr.a1_2_test_confirms_level}</p>
      {step < sections.length ? (
        <div>
          <h2 className="text-xl font-medium mb-4">{fr[currentSection as keyof typeof fr]}</h2>
          {questions.A1_2[currentSection].map((q: Question, i: number) => (
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
              {step === sections.length - 1 ? fr.a1_2_finish : fr.next}
            </button>
          </div>
        </div>
      ) : (
        renderResults()
      )}
    </div>
  );
};

export default ConfirmA1_2Page;