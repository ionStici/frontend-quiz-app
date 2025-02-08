import styles from "@/styles/header.module.scss";
import iconMoonDark from "@/assets/icon-moon-dark.svg";
import iconMoonLight from "@/assets/icon-moon-light.svg";
import iconSunDark from "@/assets/icon-sun-dark.svg";
import iconSunLight from "@/assets/icon-sun-light.svg";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { data } from "@/data/data";
import { basePath } from "@/data/paths";

type Segment = "html" | "css" | "javascript" | "accessibility";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const segment = pathname.toLowerCase().split(basePath)[1].slice(1) as Segment;
  const subject = data[segment];

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        {subject && (
          <Link to={basePath} className={styles.subject}>
            <div style={{ backgroundColor: subject.color }}>
              <img src={subject.icon} alt={`${subject.title} Icon`} width={28} height={28} />
            </div>
            <h1>{subject.title}</h1>
          </Link>
        )}

        <button className={styles.btn} onClick={toggleTheme}>
          <img
            className={styles.icon}
            src={theme === "dark" ? iconSunLight : iconSunDark}
            alt="Sun Icon"
            width={16}
            height={16}
          />
          <div className={`${styles.toggle} ${theme === "dark" ? styles.dark : ""}`}></div>
          <img
            className={styles.icon}
            src={theme === "dark" ? iconMoonLight : iconMoonDark}
            alt="Moon Icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </header>
  );
}
