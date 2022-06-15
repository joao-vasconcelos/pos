import _ from 'lodash';
import styles from './Discounts.module.css';

import { useContext } from 'react';
import { CurrentOrder } from '../../../context/CurrentOrder';
import DiscountCard from '../discountCard/DiscountCard';

export default function Discounts() {
  //
  const currentOrder = useContext(CurrentOrder);

  return currentOrder.hasDiscounts ? (
    <div className={styles.container}>
      {currentOrder.discounts.map((discount, index) => (
        <DiscountCard key={index} discount={discount} />
      ))}
    </div>
  ) : null;
}
