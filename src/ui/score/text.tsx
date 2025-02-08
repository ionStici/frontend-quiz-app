import styles from "@/styles/score.module.scss";

export function Text() {
  return (
    <h1 className={styles.h1}>
      <span>Quiz completed</span>
      <span>You scored...</span>
    </h1>
  );
}
