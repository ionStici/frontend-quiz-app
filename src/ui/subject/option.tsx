import styles from "@/styles/subject.module.scss";
import iconCorrect from "@/assets/icon-correct.svg";
import iconIncorrect from "@/assets/icon-incorrect.svg";

type OptionProps = {
  i: number;
  option: string;
  correctAnswer: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
};

export function Option({ i, option, correctAnswer, onClick }: OptionProps) {
  const letters = ["A", "B", "C", "D"];
  const icon = correctAnswer === option ? iconCorrect : iconIncorrect;

  return (
    <li>
      <button className={`${styles.answer_btn}`} onClick={({ target }) => onClick(target)}>
        <span>{letters[i]}</span>
        <span className={styles.option}>{option}</span>
        <img src={icon} alt="" width={32} height={32} />
      </button>
    </li>
  );
}
