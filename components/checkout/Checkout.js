import styles from './Checkout.module.css';
import AddCustomer from './addCustomer/AddCustomer';
import OrderDetails from './orderDetails/OrderDetails';
import Totals from './totals/Totals';
import UserLock from './userLock/UserLock';
import Discounts from './totals/discounts/Discounts';

export default function Checkout() {
  return (
    <div className={styles.checkoutPanel}>
      <UserLock />
      <AddCustomer />
      <div className={styles.innerContainer}>
        <OrderDetails />
        <Discounts />
      </div>
      <Totals />
    </div>
  );
}
