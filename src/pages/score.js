import styles from "./../styles/Score.module.scss";
import ScoreBox from "@/components/score/ScoreBox";
import Text from "@/components/score/Text";
import { useContext } from "react";
import ScoreContext from "@/store/score";
import Link from "next/link";
import Head from "next/head";

function ScorePage() {
  const { score, _ } = useContext(ScoreContext);

  if (!score) {
    return (
      <section className={`${styles.section} ${styles.flex_column}`}>
        <p className={styles.text}>👋</p>
        <p className={styles.text}>Complete an assignment to see your score</p>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>Your Score</title>
      </Head>
      <section className={styles.section}>
        <Text />

        <div>
          <ScoreBox />
          <Link className={styles.link} href="/">
            Play Again
          </Link>
        </div>
      </section>
    </>
  );
}

export default ScorePage;
