import styles from "./../styles/Score.module.scss";
import Link from "next/link";
import ScoreBox from "@/components/score/ScoreBox";
import Text from "@/components/score/Text";

function ScorePage({ quizzes }) {
  return (
    <section className={styles.section}>
      <Text />

      <div>
        <ScoreBox />
        <Link className={styles.link} href="/">
          Play Again
        </Link>
      </div>
    </section>
  );
}

export default ScorePage;
