import styles from "./../../styles/Score.module.scss";
import ScoreContext from "@/store/score";
import { useContext } from "react";
import { data } from "@/data/data.js";

function ScoreBox() {
  const { score, _ } = useContext(ScoreContext);
  let title, icon, color;

  for (const property in data) {
    if (property === score[0].toLowerCase()) {
      title = data[property].title;
      icon = data[property].icon;
      color = data[property].color;
    }
  }

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

export default ScoreBox;
