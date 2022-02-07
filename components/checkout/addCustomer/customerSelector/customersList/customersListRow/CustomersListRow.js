import styles from './CustomersListRow.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../../../utils/global-context';

export default function CustomersListRow({ customer }) {
  //

  return <div className={styles.listContainer}>{customer.name.first}</div>;
}
