import data from "@/data/data.json";
import { useScore } from "@/hooks/use-score";
import styles from "@/styles/score.module.scss";
import { Quiz, QuizData } from "@/types/quiz";

export function ScoreBox() {
  const { score } = useScore();
  const { quizzes } = data as QuizData;
  const { title, icon, color } = quizzes.find((q) => q.title === score[0]) as Quiz;

  return (
    <div className={styles.box}>
      <h2>
        <div style={{ backgroundColor: color }}>
          <img src={icon} alt="" width={28} height={28} />
        </div>
        <span>{title}</span>
      </h2>

      <p className={styles.score}>{score[1]}</p>
      <p className={styles.text}>out of 10</p>
    </div>
  );
}
