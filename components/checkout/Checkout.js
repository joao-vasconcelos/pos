import styles from './Checkout.module.css';
import OrderDetails from './orderDetails/OrderDetails';
import Totals from './totals/Totals';
import UserLock from './userLock/UserLock';

export default function Checkout() {
  return (
    <div className={styles.checkoutPanel}>
      <UserLock />
      <div className={styles.innerContainer}>
        <OrderDetails />
        <Totals />
      </div>
    </div>
  );
}
