import styles from "./../../styles/Subject.module.scss";

function Button({ onSubmit, btn }) {
  return (
    <button className={styles.submit_btn} onClick={onSubmit} ref={btn}>
      Submit Answer
    </button>
  );
}

export default Button;
