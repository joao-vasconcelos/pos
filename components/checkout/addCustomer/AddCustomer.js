import styles from './AddCustomer.module.css';
import IconButton from '../../common/iconButton/IconButton';
import { useContext } from 'react';
import { GlobalContext } from '../../../utils/global-context';
import CustomerSelector from './customerSelector/CustomerSelector';

export default function AddCustomer() {
  const { overlay, currentOrder } = useContext(GlobalContext);

  function handleClick() {
    overlay.setComponent(<CustomerSelector />);
  }

  return (
    <div className={styles.container}>
      <IconButton label={'Add Customer'} icon={'+'} type={'muted'} action={handleClick} />
    </div>
  );
}
