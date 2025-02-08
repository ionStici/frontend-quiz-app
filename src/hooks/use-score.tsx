import { ScoreContext } from "@/contexts/score-context";
import { useContext } from "react";

export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) throw new Error("useScore must be used within ScoreProvider");
  return context;
}
