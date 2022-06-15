import styles from './OrderDetails.module.css';
import OrderItem from '../orderItem/OrderItem';

import { useContext } from 'react';
import { CurrentOrder } from '../../../context/CurrentOrder';

export default function OrderDetails() {
  const currentOrder = useContext(CurrentOrder);

  return (
    <div className={styles.container}>
      {currentOrder.hasItems ? (
        currentOrder.items.map((item, index) => <OrderItem key={index} item={item} />)
      ) : (
        <p className={styles.emptyOrder}>Pedido Vazio</p>
      )}
    </div>
  );
}
