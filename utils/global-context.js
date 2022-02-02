import { useState, createContext } from 'react';

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [positionOfSelectedFolder, setPositionOfSelectedFolder] = useState(0);
  const [currentOrderItems, updateCurrentOrder] = useState([]);

  const contextValue = {
    currentOrder: {
      items: currentOrderItems,
      update: updateCurrentOrder,
    },
    currentFolder: {
      position: positionOfSelectedFolder,
      set: setPositionOfSelectedFolder,
    },
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
}
