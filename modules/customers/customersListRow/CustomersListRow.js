import cn from 'classnames';
import styles from './CustomersListRow.module.css';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../services/context';
import ViewCustomer from '../viewCustomer/ViewCustomer';
import { GoClippy } from 'react-icons/go';

export default function CustomersListRow({ customer, onSelect, selectedCustomer }) {
  //

  const { currentOrder, overlay } = useContext(GlobalContext);

  let isThisCustomerSelected = false;
  if (selectedCustomer && selectedCustomer._id == customer._id) isThisCustomerSelected = true;

  function handleView() {
    overlay.setComponent(<ViewCustomer customer={customer} />);
  }

  return (
    <div
      className={cn({
        [styles.customerRow]: true,
        [styles.selected]: isThisCustomerSelected,
      })}
    >
      <div className={styles.customerDetailsContainer} onClick={() => onSelect(customer)}>
        <div className={styles.name}>
          {customer.name.first} {customer.name.last}
        </div>
        <div className={styles.additionalInfoContainer}>
          <div className={styles.additionalInfo}>{customer.email ? customer.email : '-'}</div>
          <div className={styles.additionalInfo}>NIF: {customer.tax.number ? customer.tax.number : '-'}</div>
        </div>
      </div>
      <div className={styles.viewCustomerButton} onClick={handleView}>
        <GoClippy />
      </div>
    </div>
  );
}
