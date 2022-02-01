import styles from './ProductSlot.module.css';

export default function ProductSlot({ product }) {
  //
  // If no product is present
  if (!product) {
    return <div className={styles.emptySlot}></div>;
  }

  // If no product is present
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <div className={styles.label}>{product.title}</div>
    </div>
  );
}
