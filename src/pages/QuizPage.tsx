import React, { lazy, Suspense, FC } from 'react';
import { useParams } from 'react-router-dom';
import { fr } from '../locales/fr';

const quizMap = {
  // Unit 1 Quizzes
  'vo_01-01': lazy(() => import('../store/u1/Vocabulary/vo_01-01')),
  'vo_01-02': lazy(() => import('../store/u1/Vocabulary/vo_01-02')),
  'vo_01-03': lazy(() => import('../store/u1/Vocabulary/vo_01-03')),
  'vo_01-04': lazy(() => import('../store/u1/Vocabulary/vo_01-04')),
  'gr_01-01': lazy(() => import('../store/u1/Grammar/gr_01-01')),
  'gr_01-02': lazy(() => import('../store/u1/Grammar/gr_01-02')),
  'gr_01-03': lazy(() => import('../store/u1/Grammar/gr_01-03')),
  'gr_01-04': lazy(() => import('../store/u1/Grammar/gr_01-04')),
  're_01-01': lazy(() => import('../store/u1/Reading/re_01-01')),
  're_01-02': lazy(() => import('../store/u1/Reading/re_01-02')),
  'sp_01-01': lazy(() => import('../store/u1/Speaking/sp_01-01')),
  'li_01-01': lazy(() => import('../store/u1/Listening/li_01-01')),

  // Unit 2 Quizzes - Vocabulary
  'vo_02-01': lazy(() => import('../store/u2/Vocabulary/vo_02-01')),
  'vo_02-02': lazy(() => import('../store/u2/Vocabulary/vo_02-02')),
  'vo_02-03': lazy(() => import('../store/u2/Vocabulary/vo_02-03')),
  'vo_02-04': lazy(() => import('../store/u2/Vocabulary/vo_02-04')),
  'vo_02-05': lazy(() => import('../store/u2/Vocabulary/vo_02-05')),

  // Unit 2 Quizzes - Grammar
  'gr_02-01': lazy(() => import('../store/u2/Grammar/gr_02-01')),
  'gr_02-02': lazy(() => import('../store/u2/Grammar/gr_02-02')),
  'gr_02-03': lazy(() => import('../store/u2/Grammar/gr_02-03')),
  'gr_02-04': lazy(() => import('../store/u2/Grammar/gr_02-04')),
  'gr_02-05': lazy(() => import('../store/u2/Grammar/gr_02-05')),

  // Unit 2 Quizzes - Reading
  're_02-01': lazy(() => import('../store/u2/Reading/re_02-01')),
  're_02-02': lazy(() => import('../store/u2/Reading/re_02-02')),
  're_02-03': lazy(() => import('../store/u2/Reading/re_02-03')),
  're_02-04': lazy(() => import('../store/u2/Reading/re_02-04')),
  're_02-05': lazy(() => import('../store/u2/Reading/re_02-05')),

  // Unit 2 Quizzes - Speaking
  'sp_02-01': lazy(() => import('../store/u2/Speaking/sp_02-01')),
  'sp_02-02': lazy(() => import('../store/u2/Speaking/sp_02-02')),
  'sp_02-04': lazy(() => import('../store/u2/Speaking/sp_02-04')),
  'sp_02-05': lazy(() => import('../store/u2/Speaking/sp_02-05')),

  // Unit 2 Quizzes - Listening
  'li_02-01': lazy(() => import('../store/u2/Listening/li_02-01')),
  'li_02-02': lazy(() => import('../store/u2/Listening/li_02-02')),
  'li_02-03': lazy(() => import('../store/u2/Listening/li_02-03')),
  'li_02-04': lazy(() => import('../store/u2/Listening/li_02-04')),
  'li_02-05': lazy(() => import('../store/u2/Listening/li_02-05')),

  // Unit 3 Quizzes - Vocabulary
  'vo_03-01': lazy(() => import('../store/u3/Vocabulary/vo_03-01')),
  'vo_03-02': lazy(() => import('../store/u3/Vocabulary/vo_03-02')),
  'vo_03-03': lazy(() => import('../store/u3/Vocabulary/vo_03-03')),
  'vo_03-04': lazy(() => import('../store/u3/Vocabulary/vo_03-04')),

  // Unit 3 Quizzes - Grammar
  'gr_03-01': lazy(() => import('../store/u3/Grammar/gr_03-01')),
  'gr_03-02': lazy(() => import('../store/u3/Grammar/gr_03-02')),
  'gr_03-03': lazy(() => import('../store/u3/Grammar/gr_03-03')),
  'gr_03-04': lazy(() => import('../store/u3/Grammar/gr_03-04')),

  // Unit 3 Quizzes - Reading
  're_03-01': lazy(() => import('../store/u3/Reading/re_03-01')),
  're_03-02': lazy(() => import('../store/u3/Reading/re_03-02')),
  're_03-03': lazy(() => import('../store/u3/Reading/re_03-03')),
  're_03-04': lazy(() => import('../store/u3/Reading/re_03-04')),

  // Unit 3 Quizzes - Speaking
  'sp_03-01': lazy(() => import('../store/u3/Speaking/sp_03-01')),
  'sp_03-02': lazy(() => import('../store/u3/Speaking/sp_03-02')),
  'sp_03-03': lazy(() => import('../store/u3/Speaking/sp_03-03')),
  'sp_03-04': lazy(() => import('../store/u3/Speaking/sp_03-04')),

  // Unit 3 Quizzes - Listening
  'li_03-01': lazy(() => import('../store/u3/Listening/li_03-01')),
  'li_03-02': lazy(() => import('../store/u3/Listening/li_03-02')),
  'li_03-03': lazy(() => import('../store/u3/Listening/li_03-03')),
  'li_03-04': lazy(() => import('../store/u3/Listening/li_03-04')),
} as const;

type QuizId = keyof typeof quizMap;

const QuizPage: FC = () => {
  const { quizId } = useParams<{ quizId: QuizId }>();

  if (!quizId || !(quizId in quizMap)) {
    return <div className="text-center p-4">{fr.quiz_not_found}</div>;
  }

  const QuizComponent = quizMap[quizId];

  return (
    <Suspense fallback={<div className="text-center p-4">{fr.loading}</div>}>
      <QuizComponent />
    </Suspense>
  );
};

export default QuizPage;
