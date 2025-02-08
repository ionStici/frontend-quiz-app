import styles from "@/styles/subject.module.scss";

type QuestionProps = { question: string; questionNumber: number };

export function Question({ question, questionNumber }: QuestionProps) {
  return (
    <div className={styles.content_box}>
      <p className={styles.text}>Question {questionNumber} of 10</p>
      <p className={styles.question}>{question}</p>
      <div className={styles.bar}></div>
    </div>
  );
}
