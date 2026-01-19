
import questionsData from '@/data/questionsData.json';
import { Question } from './types';

export const getQuestions = (): Question[] => {
  return questionsData.questions;
};
