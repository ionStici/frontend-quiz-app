import Image from "next/image";
import styles from "./../styles/Header.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const data = {
  html: {
    title: "HTML",
    icon: "/assets/images/icon-html.svg",
    color: "hsla(22, 100%, 96%, 1)",
  },
  css: {
    title: "CSS",
    icon: "/assets/images/icon-css.svg",
    color: "hsla(151, 87%, 94%, 1)",
  },

  js: {
    title: "JavaScript",
    icon: "/assets/images/icon-js.svg",
    color: "hsla(223, 100%, 96%, 1)",
  },

  acc: {
    title: "Accessibility",
    icon: "/assets/images/icon-accessibility.svg",
    color: "hsla(277, 100%, 95%, 1)",
  },
};

function Header() {
  const [theme, setTheme] = useState("light");

  const router = useRouter();

  let segment;
  segment = router.query.subject;
  segment = segment || router.query.slug;
  if (typeof segment === "object") segment = segment[0];

  let title, icon, color;

  if (segment === "html") {
    title = data.html.title;
    icon = data.html.icon;
    color = data.html.color;
  }
  if (segment === "css") {
    title = data.css.title;
    icon = data.css.icon;
    color = data.css.color;
  }
  if (segment === "javascript") {
    title = data.js.title;
    icon = data.js.icon;
    color = data.js.color;
  }
  if (segment === "accessibility") {
    title = data.acc.title;
    icon = data.acc.icon;
    color = data.acc.color;
  }

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
