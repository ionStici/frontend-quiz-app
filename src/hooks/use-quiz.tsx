/* eslint-disable @typescript-eslint/no-explicit-any */
import { basePath } from "@/data/paths";
import styles from "@/styles/subject.module.scss";
import { Question, Quiz } from "@/types/quiz";
import { RefObject, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScore } from "./use-score";

type UseQuizReturn = {
  number: number;
  current: Question;
  correctAnswer: string;
  handleSubmit: any;
  handleActiveAnswer: any;
};

type UseQuizParams = {
  quiz: Quiz;
  btnsBox: RefObject<HTMLUListElement>;
  submitBtn: RefObject<HTMLButtonElement>;
  message: RefObject<HTMLParagraphElement>;
};

export function useQuiz({ quiz, btnsBox, submitBtn, message }: UseQuizParams): UseQuizReturn {
  const navigate = useNavigate();

  const { setScore } = useScore();
  const { title, questions } = quiz;

  const [current, setCurrent] = useState(questions[0]);
  const [answers, setAnswers] = useState<(null | boolean)[]>(
    Array.from({ length: 10 }, () => null)
  );

  const number = questions.indexOf(current) + 1;
  const { answer: correctAnswer } = current;

  function handleSubmit(target: any) {
    if (!submitBtn.current || !btnsBox.current || !message.current) return;

    if (target.textContent === "Next Question") nextQuestion();

    if (target.textContent === "See Results") {
      const points = answers.reduce((acc, val) => (val ? acc + 1 : acc), 0);
      const scoreData = [title, points];
      setScore(scoreData);
      navigate(basePath + "/score");
      return;
    }

    const ul = btnsBox.current;
    const btns = ul.querySelectorAll("button");

    const correctBtn = [...btns].find(
      (btn) => btn.querySelector(`.${styles.option}`)!.textContent === correctAnswer
    );

    const correctIcon = correctBtn!.querySelector("img");

    const selectedBtn = [...btns].find((btn) => {
      return btn.classList.contains(styles.active);
    });

    if (!selectedBtn) {
      message.current.classList.add(styles.show_message);
      return;
    }

    const selectedIcon = selectedBtn.querySelector("img");

    if (target.textContent === "Next Question") {
      correctIcon!.classList.remove(styles.show_icon);
      selectedIcon!.classList.remove(styles.show_icon);
    } else {
      correctIcon!.classList.add(styles.show_icon);
      selectedIcon!.classList.add(styles.show_icon);
    }

    const userAnswer = selectedBtn.querySelector(`.${styles.option}`)!.textContent;

    if (userAnswer === correctAnswer && target.textContent !== "Next Question") {
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

    if (userAnswer !== correctAnswer && target.textContent !== "Next Question") {
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

  function handleActiveAnswer(target: any) {
    if (!submitBtn.current || !btnsBox.current || !message.current) return;
    if (submitBtn.current.textContent === "Next Question") return;

    const ul = btnsBox.current;
    const btns = ul.querySelectorAll("button");

    btns.forEach((btn) => btn.classList.remove(styles.active));
    target.classList.add(styles.active);

    message.current.classList.remove(styles.show_message);
  }

  function updateBarWidth() {
    const barWidth = (number + 1) * 10;
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

  return {
    number,
    current,
    correctAnswer,
    handleSubmit,
    handleActiveAnswer,
  };
}
