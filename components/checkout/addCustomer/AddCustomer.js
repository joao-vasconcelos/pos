import SwipeToDelete from '../../common/swipeToDelete/SwipeToDelete';
import styles from './AddCustomer.module.css';
import IconButton from '../../common/iconButton/IconButton';
import { useContext } from 'react';
import { GlobalContext } from '../../../utils/global-context';
import CustomerSelector from './customerSelector/CustomerSelector';
import AddOnlyNIF from './addOnlyNif/AddOnlyNIF';

export default function AddCustomer() {
  const { overlay, currentOrder } = useContext(GlobalContext);

  function handleAddCustomer() {
    overlay.setComponent(<CustomerSelector />);
  }

  function handleChangeNIF() {
    overlay.setComponent(<AddOnlyNIF />);
  }

  function handleDelete() {
    currentOrder.setCustomer();
  }

  return (
    <div className={styles.container}>
      {currentOrder.customer && currentOrder.customer.onlyNif ? (
        <IconButton
          label={currentOrder.customer.nif.region + currentOrder.customer.nif.number}
          icon={'N'}
          type={'primary'}
          action={handleChangeNIF}
        />
      ) : (
        <IconButton label={'Add Customer'} icon={'+'} type={'muted'} action={handleAddCustomer} />
      )}
    </div>
  );
}
