import { createContext, Dispatch, SetStateAction } from "react";

export type ScoreContextType = {
  score: (string | number)[];
  setScore: Dispatch<SetStateAction<(string | number)[]>>;
};

const ScoreContext = createContext<ScoreContextType | null>(null);

export { ScoreContext };
