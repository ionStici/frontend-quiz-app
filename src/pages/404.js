import styles from "./../styles/Score.module.scss";

function Page404() {
  return (
    <section className={`${styles.section} ${styles.flex_column}`}>
      <h1>⛔️ 404</h1>
      <p className={styles.text}>No such page exists</p>
    </section>
  );
}

export default Page404;
