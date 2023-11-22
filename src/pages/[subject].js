import Header from "@/components/Header";
import { getQuizzes } from "@/lib/getQuizzes";
import styles from "./../styles/Subject.module.scss";

function SubjectPage({ quiz }) {
  const { questions } = quiz;
  console.log(questions);

  return (
    <>
      <Header title={quiz.title} icon={quiz.icon} color={quiz.color} />

      <section>
        <p>{quiz.title}</p>
      </section>
    </>
  );
}

export default SubjectPage;

export function getStaticProps(context) {
  const { quizzes } = getQuizzes();

  const urlSegment = context.params.subject;

  const quiz = quizzes.find((quiz) => quiz.title.toLowerCase() === urlSegment);

  return { props: { quiz } };
}

export function getStaticPaths() {
  const { quizzes } = getQuizzes();

  const paths = quizzes.map((quiz) => ({
    params: { subject: quiz.title.toLowerCase() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
