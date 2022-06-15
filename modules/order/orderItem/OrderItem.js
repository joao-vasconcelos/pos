import styles from './OrderItem.module.css';
import { useContext } from 'react';
import { Appstate } from '../../../context/Appstate';
import VariationSelector from '../../products/variationSelector/VariationSelector';

export default function OrderItem({ item }) {
  const appstate = useContext(Appstate);

  function handleShow() {
    appstate.setOverlay(<VariationSelector product={item.product} orderItem={item} />);
  }

  return (
    <div className={styles.container} onClick={handleShow}>
      <div className={styles.innerContainer}>
        <div className={styles.row}>
          <p className={styles.productTitle}>{item.product.title}</p>
          <p className={styles.rowTotal}>{item.lineTotal.toFixed(2)}€</p>
        </div>
        <div className={styles.row}>
          <p className={styles.productVariationTitle}>{item.variation.title}</p>
          <p className={styles.qtyTimesUnitPrice}>
            {item.qty} x {item.variation.price.toFixed(2)}€
          </p>
        </div>
      </div>
    </div>
  );
}
