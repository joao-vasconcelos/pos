import styles from '../styles/ProductCard.module.css';

export default function ProductCard() {
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <div className={styles.label}>Product Name</div>
    </div>
  );
}
