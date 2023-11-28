import styles from "./../styles/Score.module.scss";
import Link from "next/link";
import ScoreBox from "@/components/score/ScoreBox";
import Buttons from "@/components/score/Buttons";
import Text from "@/components/score/Text";

function ScorePage({ quizzes }) {
  return (
    <section className={styles.section}>
      <Text />
      <Buttons />

      <div>
        <ScoreBox />
        <Link href="/">Play Again</Link>
      </div>
    </section>
  );
}

export default ScorePage;
