import Header from "@/components/Header";
import { getQuizzes } from "@/lib/getQuizzes";
import styles from "./../styles/Subject.module.scss";
import { useState } from "react";

function SubjectPage({ quiz }) {
  const { questions } = quiz;

  const [current, setCurrent] = useState(questions[0]);

  const number = questions.indexOf(current) + 1;

  const { answer: correctAnswer } = current;

  const answers = Array.from({ length: 10 }, () => null);

  function handleActiveAnswer({ target }) {
    const answer = target.querySelector(`.${styles.option}`).textContent;

    console.log(answer === correctAnswer);
  }

  function handleSubmit() {
    if (number === 10) return;
    setCurrent(questions[number]);
  }

  return (
    <>
      <Header title={quiz.title} icon={quiz.icon} color={quiz.color} />

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <p className={styles.text}>Question {number} of 10</p>
          <p className={styles.question}>{current.question}</p>
          <div className={styles.bar}></div>

          <div className={styles.quizzes}>
            <ul>
              {current.options.map((option, i) => {
                const l = ["A", "B", "C", "D"];
                return (
                  <li key={i}>
                    <button
                      className={styles.answer_btn}
                      onClick={handleActiveAnswer}
                    >
                      <span>{l[i]}</span>
                      <span className={styles.option}>{option}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button className={styles.submit_btn} onClick={handleSubmit}>
              Submit Answer
            </button>
          </div>
        </div>
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
