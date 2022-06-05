import styles from './AddCustomer.module.css';
import AddCustomerButton from '../addCustomerButton/AddCustomerButton';
import { useCallback, useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../../../services/context';
import CustomerSelector from '../customerSelector/CustomerSelector';
import AddOnlyNIF from '../addOnlyNif/AddOnlyNIF';
import Icon from '../../../common/icon/Icon';
import ViewCustomer from '../viewCustomer/ViewCustomer';
import useSWR from 'swr';

export default function AddCustomer() {
  const { overlay, currentOrder } = useContext(GlobalContext);

  const [cardReader, setCardReader] = useState('');

  const { data: customers } = useSWR('/api/customers/*');

  const handleKeyPress = useCallback(
    (event) => {
      console.log(`Key pressed: ${event.key}`);
      if (event.key == 'Enter') {
        console.log('Enter Pressed');
        const matchedCustomer = customers.find((entries) => entries.reference == cardReader);
        if (matchedCustomer) currentOrder.setCustomer(matchedCustomer);
        setCardReader('');
      } else {
        console.log('String:', cardReader);
        setCardReader(cardReader + event.key);
      }
    },
    [cardReader, customers]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  function handleAddCustomer() {
    overlay.setComponent(<CustomerSelector />);
  }

  function handleChangeNIF() {
    overlay.setComponent(<AddOnlyNIF />);
  }

  function handleChangeCustomer() {
    overlay.setComponent(<ViewCustomer customer={currentOrder.customer} />);
  }

  function getCorrectCustomerButton() {
    if (currentOrder.customer) {
      //
      if (currentOrder.customer.onlyNif) {
        return (
          <AddCustomerButton
            label={currentOrder.customer.tax.country + currentOrder.customer.tax.number}
            icon={<Icon name={'personfillquestionmark'} />}
            type={'primary'}
            action={handleChangeNIF}
          />
        );
      } else {
        return (
          <AddCustomerButton
            label={currentOrder.customer.name.first + ' ' + currentOrder.customer.name.last}
            icon={<Icon name={'personfillcheckmark'} />}
            type={'primary'}
            action={handleChangeCustomer}
          />
        );
      }
    } else {
      return <AddCustomerButton label={'Associar Cliente'} icon={<Icon name='personbadgeplus' />} type={'muted'} action={handleAddCustomer} />;
    }
  }

  return <div className={styles.container}>{getCorrectCustomerButton()}</div>;
}
