import styles from './DiscountCard.module.css';

import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../../../utils/global-context';

export default function DiscountCard({ discount }) {
  // const { currentOrder } = useContext(GlobalContext);

  // useEffect(() => {
  //   currentOrder.addDiscountToOrder(discount);
  // }, []);

  return (
    <div className={styles.container}>
      <p className={styles.title}>{discount.title}</p>
      <p className={styles.description}>{discount.description}</p>
    </div>
  );
}
