import SwipeToDelete from '../../common/swipeToDelete/SwipeToDelete';
import styles from './OrderItem.module.css';
import { useContext } from 'react';
import { GlobalContext } from '../../../services/context';
// import VariationSelector from '../../../products/variationSelector/VariationSelector';

export default function OrderItem({ item }) {
  const { currentOrder, overlay } = useContext(GlobalContext);

  function handleDelete() {
    currentOrder.remove(item);
  }

  // function handleClick() {
  //   console.log(item);
  //   overlay.setComponent(<VariationSelector product={item} />);
  // }

  return (
    <SwipeToDelete
      onDelete={handleDelete}
      deleteColor='rgba(252, 58, 48, 1.00)' // default
      transitionDuration={200}
      deleteText='X'
      disabled={false}
      rtl={false}
    >
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.row}>
            <p className={styles.productTitle}>{item.productTitle}</p>
            <p className={styles.rowTotal}>{item.lineTotal.toFixed(2)}€</p>
          </div>
          <div className={styles.row}>
            <p className={styles.productVariationTitle}>{item.variationTitle}</p>
            <p className={styles.qtyTimesUnitPrice}>
              {item.qty} x {item.unitPrice.toFixed(2)}€
            </p>
          </div>
        </div>
      </div>
    </SwipeToDelete>
  );
}
