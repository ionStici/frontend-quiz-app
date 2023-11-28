import styles from "./../styles/Subject.module.scss";
import { useState, useRef, useEffect } from "react";
import { getQuizzes } from "@/lib/getQuizzes";
import Head from "next/head";

import Question from "@/components/subject/Question";
import Option from "@/components/subject/Option";
import Button from "@/components/subject/Button";
import Message from "@/components/subject/Message";

import { useRouter } from "next/router";
import { useContext } from "react";
import ScoresContext from "../store/scores";

function SubjectPage({ quiz }) {
  // // // // // // // // // // // // // // // // // // // //

  const { _, setScores } = useContext(ScoresContext);
  const router = useRouter();

  const { title } = quiz;
  const { questions } = quiz;

  const [current, setCurrent] = useState(questions[0]);
  const [answers, setAnswers] = useState(
    Array.from({ length: 10 }, () => null)
  );

  const number = questions.indexOf(current) + 1;
  const { answer: correctAnswer } = current;

  const btnsBox = useRef(null);
  const submitBtn = useRef(null);
  const message = useRef(null);

  // // // // // // // // // // // // // // // // // // // //

  function handleSubmit({ target }) {
    if (target.textContent === "Next Question") {
      nextQuestion();
    }

    if (target.textContent === "See Results") {
      const points = answers.reduce((acc, val) => {
        return val ? acc + 1 : acc;
      }, 0);

      setScores((prev) => {
        return [...prev, [title, points]];
      });

      router.push(`/score`);
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

  // // // // // // // // // // // // // // // // // // // //

  function handleActiveAnswer({ target }) {
    if (submitBtn.current.textContent === "Next Question") return;

    const ul = btnsBox.current;
    const btns = ul.querySelectorAll("button");

    btns.forEach((btn) => btn.classList.remove(styles.active));
    target.classList.add(styles.active);

    message.current.classList.remove(styles.show_message);
  }

  // // // // // // // // // // // // // // // // // // // //

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

      <section>
        <div className={styles.wrapper}>
          <Question questionNumber={number} question={current.question} />

          <div className={styles.quizzes}>
            <ul ref={btnsBox}>
              {current.options.map((option, i) => {
                return (
                  <Option
                    key={i}
                    i={i}
                    option={option}
                    correctAnswer={correctAnswer}
                    onActiveAnswer={handleActiveAnswer}
                  />
                );
              })}
            </ul>

            <Button onSubmit={handleSubmit} btn={submitBtn} />
            <Message message={message} />
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

  return { paths: paths, fallback: false };
}
