import styles from './ProductSlot.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../utils/global-context';
import addItemToCurrentOrder from '../../utils/orderManager';
import VariationSelector from './variationSelector/VariationSelector';

export default function ProductSlot({ product }) {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  // If no product is present
  if (!product) {
    return <div className={styles.emptySlot}></div>;
  }

  // ------------------

  function handleClick() {
    overlay.setComponent(<VariationSelector product={product} />);
    // currentOrder.update(addItemToCurrentOrder(currentOrder.items, product));
  }

  // If product is set
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.image}></div>
      <div className={styles.label}>{product.title}</div>
    </div>
  );
}
