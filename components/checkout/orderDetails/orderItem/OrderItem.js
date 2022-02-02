import styles from './OrderItem.module.css';

export default function OrderItem({ item }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <p className={styles.productTitle}>{item.productTitle}</p>
        <p className={styles.rowTotal}>{item.lineTotal}€</p>
      </div>
      <div className={styles.row}>
        <p className={styles.productVariationTitle}>{item.variationTitle}</p>
        <p className={styles.qtyTimesUnitPrice}>
          {item.qty} x {item.unitPrice}€
        </p>
      </div>
    </div>
  );
}
