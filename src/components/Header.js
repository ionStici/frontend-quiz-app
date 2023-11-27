import Image from "next/image";

import styles from "./../styles/Header.module.scss";

import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

function Header({ title, icon, color }) {
  const [theme, setTheme] = useState("light");

  //   const router = useRouter();

  //   let segment;
  //   segment = router.query.subject;
  //   segment = segment || router.query.slug;
  //   if (typeof segment === "object") segment = segment[0];

  //   console.log(segment);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    setTheme(mediaQuery.matches ? "dark" : "light");

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  function handleThemeSwitch() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    const body = document.body;
    body.classList = "";

    body.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  const iconMoonDark = "/assets/images/icon-moon-dark.svg";
  const iconMoonLight = "/assets/images/icon-moon-light.svg";

  const iconSunDark = "/assets/images/icon-sun-dark.svg";
  const iconSunLight = "/assets/images/icon-sun-light.svg";

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
            src={theme === "dark" ? iconSunLight : iconSunDark}
            alt="Sun Icon"
            width={16}
            height={16}
            className={styles.icon}
          />
          <div
            className={`${styles.toggle} ${
              theme === "dark" ? styles.dark : ""
            }`}
          ></div>
          <Image
            src={theme === "dark" ? iconMoonLight : iconMoonDark}
            alt="Moon Icon"
            width={16}
            height={16}
            className={styles.icon}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
