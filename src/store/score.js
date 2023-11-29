import { useState, createContext } from "react";

const ScoreContext = createContext({
  score: null,
  setScore: () => {},
});

export const ScoreContextProvider = ({ children }) => {
  const [score, setScore] = useState(null);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
