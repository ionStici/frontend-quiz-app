import styles from "@/styles/subject.module.scss";
import { RefObject } from "react";

type ButtonType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
  btn: RefObject<HTMLButtonElement>;
};

export function Button({ onSubmit, btn }: ButtonType) {
  return (
    <button className={styles.submit_btn} onClick={({ target }) => onSubmit(target)} ref={btn}>
      Submit Answer
    </button>
  );
}
