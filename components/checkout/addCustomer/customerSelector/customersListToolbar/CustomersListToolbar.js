import styles from './CustomersListToolbar.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../../utils/global-context';

export default function CustomersListToolbar() {
  //

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.searchField}></div>
      <div className={styles.addCustomerButton}>+</div>
    </div>
  );
}
