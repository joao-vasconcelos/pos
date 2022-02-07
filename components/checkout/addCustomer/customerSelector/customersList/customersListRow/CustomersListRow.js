import cn from 'classnames';

import styles from './CustomersListRow.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../../../utils/global-context';

export default function CustomersListRow({ customer, onSelect, selectedCustomer }) {
  //

  let isThisCustomerSelected = false;
  if (selectedCustomer && selectedCustomer.id == customer.id) isThisCustomerSelected = true;

  function handleView() {
    alert('View');
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
          <div className={styles.additionalInfo}>NIF: {customer.tax_id ? customer.tax_id : '-'}</div>
        </div>
      </div>
      <div className={styles.viewCustomerButton} onClick={handleView}>
        VIEW
      </div>
    </div>
  );
}
