import styles from './CustomersList.module.css';

import Loading from '../../common/loading/Loading';
import CustomersListRow from '../customersListRow/CustomersListRow';

export default function CustomersList({ customers }) {
  return (
    <div className={styles.listContainer}>
      {customers ? customers.map((customer, index) => <CustomersListRow key={index} customer={customer} />) : <Loading />}
    </div>
  );
}
