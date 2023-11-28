import styles from "./../../styles/Score.module.scss";

function Text() {
  return (
    <h1 className={styles.h1}>
      <span>Quiz completed</span>
      <span>You scored...</span>
    </h1>
  );
}

export default Text;
