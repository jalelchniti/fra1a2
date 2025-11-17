import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import SpeakingPage from './pages/SpeakingPage';
import ReadingPage from './pages/ReadingPage';
import ListeningPage from './pages/ListeningPage';
import QuizPage from './pages/QuizPage';
import EvaluationPage from './pages/EvaluationPage';
import ConfirmPageA1_2 from './pages/ConfirmPageA1-2';
import ConfirmPageA1_3 from './pages/ConfirmPageA1-3';
import EFLCurriculumCarousel from './pages/EFLCurriculumCarousel';
import PlanPage from './pages/PlanPage';
import MyCompanion from './pages/MyCompanion';
import { AnimatePresence } from 'framer-motion';

// Review Components
const SpeakingWorksheet01 = lazy(() => import('./store/Review/SpeakingWorksheet01'));
const SpeakingWorksheet02 = lazy(() => import('./store/Review/SpeakingWorksheet02'));
const SpeakingWorksheet03 = lazy(() => import('./store/Review/SpeakingWorksheet03'));
const SpeakingWorksheet04 = lazy(() => import('./store/Review/SpeakingWorksheet04'));
const TravelStoriesGame = lazy(() => import('./store/Review/TravelStoriesGame'));
const CarDrivingGame = lazy(() => import('./store/Review/CarDrivingGame'));
const CarComparisonGame = lazy(() => import('./store/Review/CarComparisonGame'));
const ListeningActivityGame = lazy(() => import('./store/Review/ListeningActivityGame'));
const SchoolMemoriesGame = lazy(() => import('./store/Review/SchoolMemoriesGame'));
const SchoolLifeMixGame = lazy(() => import('./store/Review/SchoolLifeMixGame'));

// Teacher Test Component
const Test = lazy(() => import('./store/Test'));

function App() {
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><span className="text-lg font-semibold">Loading...</span></div>}>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/confirm-a1-2" element={<ConfirmPageA1_2 />} />
          <Route path="/confirm-a1-3" element={<ConfirmPageA1_3 />} />
          <Route path="/curriculum" element={<EFLCurriculumCarousel />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/companion" element={<MyCompanion />} />

          {/* Review Routes */}
          <Route path="/review/speaking-worksheet-01" element={<SpeakingWorksheet01 />} />
          <Route path="/review/speaking-worksheet-02" element={<SpeakingWorksheet02 />} />
          <Route path="/review/speaking-worksheet-03" element={<SpeakingWorksheet03 />} />
          <Route path="/review/speaking-worksheet-04" element={<SpeakingWorksheet04 />} />
          <Route path="/review/travel-stories" element={<TravelStoriesGame />} />
          <Route path="/review/car-driving" element={<CarDrivingGame />} />
          <Route path="/review/car-comparison" element={<CarComparisonGame />} />
          <Route path="/review/listening-activity" element={<ListeningActivityGame />} />
          <Route path="/review/school-memories" element={<SchoolMemoriesGame />} />
          <Route path="/review/school-life-mix" element={<SchoolLifeMixGame />} />

          {/* Teacher Test Route - Hidden from navigation, accessible via /test URL only */}
          <Route path="/test" element={<Test />} />
          </Routes>
        </Suspense>
      </Layout>
    </AnimatePresence>
  );
}

export default App;