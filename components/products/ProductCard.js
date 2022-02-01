import styles from './ProductCard.module.css';

export default function ProductCard({ title }) {
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <div className={styles.label}>{title}</div>
    </div>
  );
}
