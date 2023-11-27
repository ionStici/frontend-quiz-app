import React, { useState, createContext } from "react";

const ResultsContext = React.createContext({
  results: null,
  setResults: () => {},
});

export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsContext;
