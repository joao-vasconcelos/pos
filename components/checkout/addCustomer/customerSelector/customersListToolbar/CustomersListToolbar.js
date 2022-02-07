import styles from './CustomersListToolbar.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../../utils/global-context';

export default function CustomersListToolbar() {
  //

  return (
    <div className={styles.toolbarContainer}>
      <p>Toolbar</p>
    </div>
  );
}
