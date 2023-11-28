import styles from "./../../styles/Header.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { data } from "@/data/data.js";

const iconMoonDark = "/assets/images/icon-moon-dark.svg";
const iconMoonLight = "/assets/images/icon-moon-light.svg";

const iconSunDark = "/assets/images/icon-sun-dark.svg";
const iconSunLight = "/assets/images/icon-sun-light.svg";

function Header() {
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  const urlSegment = router.query.subject;
  let subject = {};

  if (urlSegment === "html") subject = data.html;
  if (urlSegment === "css") subject = data.css;
  if (urlSegment === "javascript") subject = data.javascript;
  if (urlSegment === "accessibility") subject = data.accessibility;

  const { title = false, icon, color } = subject;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    setTheme(mediaQuery.matches ? "dark" : "light");
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList = "";
    body.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  function handleThemeSwitch() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        {title && (
          <div className={styles.subject}>
            <div style={{ backgroundColor: color }}>
              <Image src={icon} alt={`${title} Icon`} width={28} height={28} />
            </div>
            <h1>{title}</h1>
          </div>
        )}

        <button className={styles.btn} onClick={handleThemeSwitch}>
          <Image
            className={styles.icon}
            src={theme === "dark" ? iconSunLight : iconSunDark}
            alt="Sun Icon"
            width={16}
            height={16}
          />
          <div
            className={`${styles.toggle} ${
              theme === "dark" ? styles.dark : ""
            }`}
          ></div>
          <Image
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

export default Header;
