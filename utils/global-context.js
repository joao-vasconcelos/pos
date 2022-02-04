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
  const [availableDiscounts, setAvailableDiscounts] = useState();

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
      discounts: currentOrderDiscounts,
      availableDiscounts: availableDiscounts,
      setAvailableDiscounts,
      totals: currentOrderTotals,
      add: function (product, variation) {
        const updatedOrderItems = orderManager.addProductVariationToCurrentOrder(currentOrderItems, product, variation);
        updateCurrentOrderItems(updatedOrderItems);
        const validDiscounts = orderManager.getValidDiscountsForCurrentOrder(updatedOrderItems, availableDiscounts);
        updateCurrentOrderDiscounts(validDiscounts);
        const updatedOrderTotals = orderManager.calculateOrderTotals(updatedOrderItems, validDiscounts);
        updateCurrentOrderTotals(updatedOrderTotals);
      },
      remove: function (orderItem) {
        const updatedOrderItems = orderManager.removeItemFromCurrentOrder(currentOrderItems, orderItem);
        updateCurrentOrderItems(updatedOrderItems);
        const validDiscounts = orderManager.getValidDiscountsForCurrentOrder(updatedOrderItems, availableDiscounts);
        updateCurrentOrderDiscounts(validDiscounts);
        const updatedOrderTotals = orderManager.calculateOrderTotals(updatedOrderItems, validDiscounts);
        updateCurrentOrderTotals(updatedOrderTotals);
      },
    },

    overlay: {
      component: overlayComponent,
      setComponent: setOverlayComponent,
    },
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
}
