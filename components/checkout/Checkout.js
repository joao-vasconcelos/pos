import styles from './Checkout.module.css';
import AddCustomer from './addCustomer/AddCustomer';
import OrderDetails from './orderDetails/OrderDetails';
import Totals from './totals/Totals';
import UserLock from './userLock/UserLock';

export default function Checkout() {
  return (
    <div className={styles.checkoutPanel}>
      <UserLock />
      <div className={styles.innerContainer}>
        <AddCustomer />
        <OrderDetails />
        <Totals />
      </div>
    </div>
  );
}
