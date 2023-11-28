import styles from "./../../styles/Subject.module.scss";
import Image from "next/image";

function Message({ message }) {
  const icon = "/assets/images/icon-incorrect.svg";

  return (
    <p className={styles.message} ref={message}>
      <Image src={icon} alt="" width={32} height={32} />
      <span>Please select an answer</span>
    </p>
  );
}

export default Message;
