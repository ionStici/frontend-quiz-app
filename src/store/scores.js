import { useState, useEffect, createContext } from "react";

const ScoresContext = createContext({
  scores: null,
  setScores: () => {},
});

const useLocalStorage = (key, defaultValue = []) => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    if (state === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

export const ResultsContextProvider = ({ children }) => {
  const [scores, setScores] = useLocalStorage("scores");

  return (
    <ScoresContext.Provider value={{ scores, setScores }}>
      {children}
    </ScoresContext.Provider>
  );
};

export default ScoresContext;
