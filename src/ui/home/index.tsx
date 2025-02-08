import data from "@/data/data.json";
import styles from "@/styles/home.module.scss";
import { QuizData } from "@/types/quiz";
import { SubjectLink } from "./subject-link";
import { Helmet } from "react-helmet-async";

export function Home() {
  const { quizzes } = data as QuizData;

  return (
    <div>
      <Helmet title="Frontend Quiz App" />
      <section className={styles.wrapper}>
        <div className={styles.text_box}>
          <h1>
            <span>Welcome to the</span>
            <span>Frontend Quiz!</span>
          </h1>
          <p>Pick a subject to get started!</p>
        </div>

        <div className={styles.links}>
          <ul>
            {quizzes.map((quiz) => (
              <SubjectLink
                key={quiz.title}
                title={quiz.title}
                icon={quiz.icon}
                color={quiz.color}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
