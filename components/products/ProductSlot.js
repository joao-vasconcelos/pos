import styles from './ProductSlot.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../utils/global-context';
import addToCurrentOrder from '../../utils/orderManager';

export default function ProductSlot({ product }) {
  //
  // If no product is present
  if (!product) {
    return <div className={styles.emptySlot}></div>;
  }

  // ------------------

  const { currentOrder } = useContext(GlobalContext);

  function handleClick() {
    currentOrder.update(addToCurrentOrder(currentOrder.items, product));
  }

  // If product is set
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.image}></div>
      <div className={styles.label}>{product.title}</div>
    </div>
  );
}
