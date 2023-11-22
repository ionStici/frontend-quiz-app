import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import { getQuizzes } from "@/lib/getQuizzes";
import styles from "./../styles/Subject.module.scss";
import { useState, useRef } from "react";
import next from "next";

function SubjectPage({ quiz }) {
  const { questions } = quiz;
  const [current, setCurrent] = useState(questions[0]);

  const number = questions.indexOf(current) + 1;
  const { answer: correctAnswer } = current;

  const [answers, setAnswers] = useState(
    Array.from({ length: 10 }, () => null)
  );
  const btnsBox = useRef(null);

  // // // // // // // // // // // // // // // // // // // //

  function handleActiveAnswer({ target }) {
    const ul = btnsBox.current;
    const btns = ul.querySelectorAll("button");

    btns.forEach((btn) => btn.classList.remove(styles.active));
    target.classList.add(styles.active);
  }

  function handleSubmit({ target }) {
    if (target.textContent === "Next Question") {
      nextQuestion();
    }

    const ul = btnsBox.current;
    const btns = ul.querySelectorAll("button");

    const correctBtn = [...btns].find(
      (btn) =>
        btn.querySelector(`.${styles.option}`).textContent === correctAnswer
    );
    const correctIcon = correctBtn.querySelector("img");

    const selectedBtn = [...btns].find((btn) => {
      return btn.classList.contains(styles.active);
    });
    const selectedIcon = selectedBtn.querySelector("img");

    if (target.textContent === "Next Question") {
      correctIcon.classList.remove(styles.show_icon);
      selectedIcon.classList.remove(styles.show_icon);
    } else {
      correctIcon.classList.add(styles.show_icon);
      selectedIcon.classList.add(styles.show_icon);
    }

    const userAnswer = selectedBtn.querySelector(
      `.${styles.option}`
    ).textContent;

    if (
      userAnswer === correctAnswer &&
      target.textContent !== "Next Question"
    ) {
      selectedBtn.classList.add(styles.correct);

      setAnswers((prev) => {
        prev[number - 1] = true;
        return prev;
      });
    } else if (target.textContent === "Next Question") {
      selectedBtn.classList.remove(styles.active);
      selectedBtn.classList.remove(styles.correct);
      selectedBtn.classList.remove(styles.wrong);
    }

    if (
      userAnswer !== correctAnswer &&
      target.textContent !== "Next Question"
    ) {
      selectedBtn.classList.add(styles.wrong);

      setAnswers((prev) => {
        prev[number - 1] = false;
        return prev;
      });
    } else if (target.textContent === "Next Question") {
      selectedBtn.classList.remove(styles.active);
      selectedBtn.classList.remove(styles.correct);
      selectedBtn.classList.remove(styles.wrong);
    }

    if (target.textContent === "Next Question") {
      target.textContent = "Submit Answer";
      return;
    }
    if (target.textContent === "Submit Answer") {
      target.textContent = "Next Question";
      return;
    }
  }

  function nextQuestion() {
    document.body.style.setProperty("--bar-width", `${(number + 1) * 10}%`);
    if (number === 10) return;
    setCurrent(questions[number]);
  }

  // // // // // // // // // // // // // // // // // // // //

  return (
    <>
      <Head>
        <title>{quiz.title} Quizzes</title>
        <meta
          name="description"
          content={`Challenge your knowledge about ${quiz.title}`}
        />
      </Head>
      <Header title={quiz.title} icon={quiz.icon} color={quiz.color} />

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.content_box}>
            <p className={styles.text}>Question {number} of 10</p>
            <p className={styles.question}>{current.question}</p>
            <div className={styles.bar}></div>
          </div>

          <div className={styles.quizzes}>
            <ul ref={btnsBox}>
              {current.options.map((option, i) => {
                const l = ["A", "B", "C", "D"];
                return (
                  <li key={i}>
                    <button
                      className={`${styles.answer_btn} ${
                        false ? styles.active : ""
                      }`}
                      onClick={handleActiveAnswer}
                    >
                      <span>{l[i]}</span>
                      <span className={styles.option}>{option}</span>
                      <Image
                        src={
                          option === correctAnswer
                            ? "assets/images/icon-correct.svg"
                            : "assets/images/icon-incorrect.svg"
                        }
                        alt=""
                        width={32}
                        height={32}
                      />
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
