import styles from './OrderDetails.module.css';
import OrderItem from './orderItem/OrderItem';

import { useContext } from 'react';
import { GlobalContext } from '../../../utils/global-context';

export default function OrderDetails() {
  const { currentOrder } = useContext(GlobalContext);

  return (
    <div className={styles.container}>
      {currentOrder.items.length ? currentOrder.items.map((item) => <OrderItem key={item.id} item={item} />) : 'Current order is empty'}
    </div>
  );
}
