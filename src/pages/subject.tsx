import data from "@/data/data.json";
import { basePath, params } from "@/data/paths";
import { Quiz, QuizData, QuizParams } from "@/types/quiz";
import { Subject } from "@/ui/subject";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

export function SubjectPage() {
  const { subject } = useParams();
  const { quizzes } = data as QuizData;
  const quiz = quizzes.find((q) => q.title.toLowerCase() === subject?.toLowerCase()) as Quiz;

  if (!quiz || !subject || !params.includes(subject.toLowerCase() as QuizParams)) {
    return <Navigate to={basePath} />;
  }

  return (
    <>
      <Helmet>
        <title>{quiz?.title} Quizzes</title>
        <meta name="description" content={`Challenge your knowledge about ${quiz?.title}`} />
      </Helmet>
      <Subject quiz={quiz} />
    </>
  );
}
