import styles from "./../../styles/Subject.module.scss";

function Question({ question, questionNumber }) {
  return (
    <div className={styles.content_box}>
      <p className={styles.text}>Question {questionNumber} of 10</p>
      <p className={styles.question}>{question}</p>
      <div className={styles.bar}></div>
    </div>
  );
}

export default Question;
