import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

function HomeComponent({ quizzes }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    setTheme(mediaQuery.matches ? "dark" : "light");

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const iconMoonDark = "./assets/images/icon-moon-dark.svg";
  const iconMoonLight = "./assets/images/icon-moon-light.svg";

  const iconSunDark = "./assets/images/icon-sun-dark.svg";
  const iconSunLight = "./assets/images/icon-sun-light.svg";

  return (
    <>
      <section>
        <Image
          src={theme === "dark" ? iconSunDark : iconSunLight}
          alt="Sun Icon"
          width={16}
          height={16}
        />

        <Image
          src={theme === "dark" ? iconMoonDark : iconMoonLight}
          alt="Moon Icon"
          width={16}
          height={16}
        />
      </section>

      <section>
        <h1>
          <span>Welcome to the</span>
          <span>Frontend Quiz!</span>
        </h1>
        <p>Pick a subject to get started!</p>
      </section>

      <section>
        {quizzes.map((quiz) => {
          return (
            <ul key={quiz.title}>
              <li>
                <Link href="/">
                  <Image
                    src={quiz.icon}
                    alt={quiz.title}
                    width={40}
                    height={40}
                  />
                  <span>{quiz.title}</span>
                </Link>
              </li>
            </ul>
          );
        })}
      </section>
    </>
  );
}

export default HomeComponent;
