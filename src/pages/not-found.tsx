import { basePath } from "@/data/paths";
import { Link } from "react-router-dom";
import styles from "@/styles/score.module.scss";

export function NotFound() {
  return (
    <section className={`${styles.section} ${styles.flex_column}`}>
      <h1>404 Not Found</h1>
      <p className={styles.text}>No such page exists</p>
      <Link to={basePath} className={styles.return_home_btn}>
        Return Home
      </Link>
    </section>
  );
}
