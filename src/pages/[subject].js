import Head from "next/head";
import Image from "next/image";
import { getQuizzes } from "@/lib/getQuizzes";
import styles from "./../styles/Subject.module.scss";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { useContext } from "react";
import ResultsContext from "./store";

function SubjectPage({ quiz }) {
  const { results, setResults } = useContext(ResultsContext);
  const router = useRouter();

  const { title } = quiz;

  const { questions } = quiz;
  const [current, setCurrent] = useState(questions[0]);

  const number = questions.indexOf(current) + 1;
  const { answer: correctAnswer } = current;

  const [answers, setAnswers] = useState(
    Array.from({ length: 10 }, () => null)
  );
  const btnsBox = useRef(null);
  const submitBtn = useRef(null);
  const message = useRef(null);

  // // // // // // // // // // // // // // // // // // // //

  function handleActiveAnswer({ target }) {
    if (submitBtn.current.textContent === "Next Question") return;

    const ul = btnsBox.current;
    const btns = ul.querySelectorAll("button");

    btns.forEach((btn) => btn.classList.remove(styles.active));
    target.classList.add(styles.active);

    message.current.classList.remove(styles.show_message);
  }

  function handleSubmit({ target }) {
    if (target.textContent === "Next Question") {
      nextQuestion();
    }

    if (target.textContent === "See Results") {
      const points = answers.reduce((acc, val) => {
        return val ? acc + 1 : acc;
      }, 0);

      setResults((prev) => {
        return [...prev, [title, points]];
      });

      router.push(`/${router.query.subject}/results`);
      return;
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

    if (!selectedBtn) {
      message.current.classList.add(styles.show_message);
      return;
    }

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

    if (number === 10) {
      target.textContent = "See Results";
      return;
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

  function updateBarWidth() {
    let barWidth = (number + 1) * 10;
    document.body.style.setProperty("--bar-width", `${barWidth}%`);
  }

  useEffect(() => {
    document.body.style.setProperty("--bar-width", `${10}%`);
  }, []);

  function nextQuestion() {
    if (number === 10) return;

    updateBarWidth();
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
            <button
              className={styles.submit_btn}
              onClick={handleSubmit}
              ref={submitBtn}
            >
              Submit Answer
            </button>
            <p className={styles.message} ref={message}>
              <Image
                src={"assets/images/icon-incorrect.svg"}
                alt=""
                width={32}
                height={32}
              />
              <span>Please select an answer</span>
            </p>
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
