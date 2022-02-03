import styles from './DiscountCard.module.css';

export default function DiscountCard({ discount }) {
  return (
    <div
      className={styles.container}
      style={{ borderColor: discount.style.border, backgroundColor: discount.style.fill, color: discount.style.text }}
    >
      <p className={styles.title}>{discount.title}</p>
      <p className={styles.description}>{discount.description}</p>
    </div>
  );
}
