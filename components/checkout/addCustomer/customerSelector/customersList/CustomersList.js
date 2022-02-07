import styles from './CustomersList.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../../utils/global-context';

import CustomersListRow from './customersListRow/CustomersListRow';
import Loading from '../../../../loading/Loading';

export default function CustomersList({ customers }) {
  return (
    <div className={styles.listContainer}>
      {customers ? customers.map((customer, index) => <CustomersListRow key={index} customer={customer} />) : <Loading />}
    </div>
  );
}
