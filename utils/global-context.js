import { useState, createContext } from 'react';

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [count, setCount] = useState(false);
  const [positionOfSelectedFolder, setPositionOfSelectedFolder] = useState(0);

  const contextValue = {
    count: {
      count,
      setCount,
    },
    currentFolder: {
      position: positionOfSelectedFolder,
      set: setPositionOfSelectedFolder,
    },
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
}
