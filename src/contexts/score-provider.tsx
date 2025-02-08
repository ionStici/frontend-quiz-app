import { ReactNode, useState } from "react";
import { ScoreContext, ScoreContextType } from "./score-context";

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState<(string | number)[]>([]);

  const value: ScoreContextType = { score, setScore };

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
};
