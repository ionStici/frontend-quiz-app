import { ReactNode, useCallback, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./theme-context";

const storageKey = "quiz-app-theme-key";
const defaultTheme = "dark";

type ThemeProviderProps = { children: ReactNode };

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) return storedTheme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemTheme ? "dark" : defaultTheme;
  });

  useEffect(() => {
    const root = document.body;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const value = { theme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
