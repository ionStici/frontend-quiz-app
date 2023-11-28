import styles from "./../../styles/Subject.module.scss";
import Image from "next/image";

function Option({ i, option, correctAnswer, onActiveAnswer }) {
  const letters = ["A", "B", "C", "D"];
  let icon;
  const correct = "/assets/images/icon-correct.svg";
  const incorrect = "/assets/images/icon-incorrect.svg";
  correctAnswer === option ? (icon = correct) : (icon = incorrect);

  return (
    <li>
      <button className={`${styles.answer_btn}`} onClick={onActiveAnswer}>
        <span>{letters[i]}</span>
        <span className={styles.option}>{option}</span>
        <Image src={icon} alt="" width={32} height={32} />
      </button>
    </li>
  );
}

export default Option;
