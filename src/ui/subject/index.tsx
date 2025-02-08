import { useQuiz } from "@/hooks/use-quiz";
import { Quiz } from "@/types/quiz";
import styles from "@/styles/subject.module.scss";
import { useRef } from "react";
import { Question } from "./question";
import { Option } from "./option";
import { Button } from "./button";
import { Message } from "./message";

export function Subject({ quiz }: { quiz: Quiz }) {
  const btnsBox = useRef<HTMLUListElement>(null);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const message = useRef<HTMLParagraphElement>(null);

  const quizParams = { quiz, btnsBox, submitBtn, message };
  const { number, current, correctAnswer, handleSubmit, handleActiveAnswer } = useQuiz(quizParams);

  return (
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
                  onClick={handleActiveAnswer}
                />
              );
            })}
          </ul>

          <Button onSubmit={handleSubmit} btn={submitBtn} />
          <Message message={message} />
        </div>
      </div>
    </section>
  );
}
