export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type Quiz = {
  title: string;
  icon: string;
  color: string;
  questions: Question[];
};

export type QuizData = { quizzes: Quiz[] };

export type QuizParams = "html" | "css" | "javascript" | "accessibility";
