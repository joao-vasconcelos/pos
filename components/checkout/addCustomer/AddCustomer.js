import styles from './AddCustomer.module.css';
import IconButton from '../../common/iconButton/IconButton';
import { useContext } from 'react';
import { GlobalContext } from '../../../utils/global-context';
import CustomerSelector from './customerSelector/CustomerSelector';
import AddOnlyNIF from './addOnlyNif/AddOnlyNIF';
import Icon from '../../../utils/Icon';

export default function AddCustomer() {
  const { overlay, currentOrder } = useContext(GlobalContext);

  function handleAddCustomer() {
    overlay.setComponent(<CustomerSelector />);
  }

  function handleChangeNIF() {
    overlay.setComponent(<AddOnlyNIF />);
  }

  function handleChangeCustomer() {
    currentOrder.setCustomer();
  }

  function getCorrectCustomerButton() {
    if (currentOrder.customer) {
      //
      if (currentOrder.customer.onlyNif) {
        return (
          <IconButton
            label={currentOrder.customer.nif.region + currentOrder.customer.nif.number}
            icon={'N'}
            type={'primary'}
            action={handleChangeNIF}
          />
        );
      } else {
        return (
          <IconButton
            label={currentOrder.customer.name.first + ' ' + currentOrder.customer.name.last}
            icon={<Icon name={'personfillcheckmark'} />}
            type={'primary'}
            action={handleChangeCustomer}
          />
        );
      }
    } else {
      return <IconButton label={'Associar Cliente'} icon={<Icon name='personbadgeplus' />} type={'muted'} action={handleAddCustomer} />;
    }
  }

  return <div className={styles.container}>{getCorrectCustomerButton()}</div>;
}
