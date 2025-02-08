import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextType = { theme: Theme; toggleTheme: () => void } | null;

const ThemeContext = createContext<ThemeContextType>(null);

export { ThemeContext };
