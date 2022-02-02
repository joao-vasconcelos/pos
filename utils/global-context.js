import { useState, createContext } from 'react';
import orderManager from './orderManager';

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  //
  // Folders
  const [positionOfSelectedFolder, setPositionOfSelectedFolder] = useState(0);

  // Order
  const [currentOrderItems, updateCurrentOrderItems] = useState([]);
  const [currentOrderDiscounts, updateCurrentOrderDiscounts] = useState([]);
  const [currentOrderTotals, updateCurrentOrderTotals] = useState();

  // Overlay
  const [overlayComponent, setOverlayComponent] = useState();

  // CONTEXT
  const contextValue = {
    currentFolder: {
      position: positionOfSelectedFolder,
      set: setPositionOfSelectedFolder,
    },
    currentOrder: {
      items: currentOrderItems,
      totals: currentOrderTotals,
      add: function (product, variation) {
        const updatedOrderItem = orderManager.addProductVariationToCurrentOrder(currentOrderItems, product, variation);
        updateCurrentOrderItems(updatedOrderItem);
        const updatedOrderTotals = orderManager.calculateOrderTotals(updatedOrderItem, currentOrderDiscounts);
        updateCurrentOrderTotals(updatedOrderTotals);
      },
      remove: () => alert('removed'),
      checkIfDiscountApplies: function (discount) {
        orderManager.checkIfDiscountApplies(currentOrderItems, discount);
      },
    },
    overlay: {
      component: overlayComponent,
      setComponent: setOverlayComponent,
    },
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
}
