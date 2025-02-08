import { ReactNode } from "react";
import { ThemeProvider } from "./contexts/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { ScoreProvider } from "./contexts/score-provider";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <ScoreProvider>{children}</ScoreProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
