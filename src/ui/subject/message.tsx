import { RefObject } from "react";
import styles from "./../../styles/Subject.module.scss";
import iconIncorrect from "@/assets/icon-incorrect.svg";

type MessageProps = {
  message: RefObject<HTMLParagraphElement>;
};

export function Message({ message }: MessageProps) {
  return (
    <p className={styles.message} ref={message}>
      <img src={iconIncorrect} alt="" width={32} height={32} />
      <span>Please select an answer</span>
    </p>
  );
}
