import styles from './DiscountCard.module.css';

import { useContext } from 'react';
import { Appstate } from '../../../context/Appstate';
import DiscountInfo from '../discountInfo/DiscountInfo';

export default function DiscountCard({ discount }) {
  //

  const appstate = useContext(Appstate);

  function showInfo() {
    appstate.setOverlay(<DiscountInfo discount={discount} />);
  }

  return (
    <div
      className={styles.container}
      style={{ borderColor: discount.style.border, backgroundColor: discount.style.fill, color: discount.style.text }}
      onClick={showInfo}
    >
      <p className={styles.title}>{discount.title}</p>
      <p className={styles.subtitle}>{discount.subtitle}</p>
    </div>
  );
}
