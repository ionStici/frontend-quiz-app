import styles from "@/styles/score.module.scss";
import { basePath } from "@/data/paths";
import { useScore } from "@/hooks/use-score";
import { Link, Navigate } from "react-router-dom";
import { Text } from "./text";
import { ScoreBox } from "./score-box";

export function Score() {
  const { score } = useScore();
  if (!score[0]) return <Navigate to={basePath} />;

  return (
    <section className={styles.section}>
      <Text />
      <div>
        <ScoreBox />
        <Link className={styles.link} to={basePath}>
          Play Again
        </Link>
      </div>
    </section>
  );
}
