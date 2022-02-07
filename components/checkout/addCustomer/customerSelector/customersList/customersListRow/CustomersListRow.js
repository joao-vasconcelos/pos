import styles from './CustomersListRow.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../../../utils/global-context';

export default function CustomersListRow({ customer }) {
  //

  function handleView() {
    alert('View');
  }

  return (
    <div className={styles.customerRow}>
      <div className={styles.customerDetailsContainer}>
        <div className={styles.name}>
          {customer.name.first} {customer.name.last}
        </div>
        <div className={styles.email}>{customer.email}</div>
      </div>
      <div className={styles.viewCustomerButton} onClick={handleView}>
        VIEW
      </div>
    </div>
  );
}
