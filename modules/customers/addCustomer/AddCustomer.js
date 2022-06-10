import styles from './AddCustomer.module.css';
import AddCustomerButton from '../addCustomerButton/AddCustomerButton';
import { useCallback, useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../../services/context';
import CustomerSelector from '../customerSelector/CustomerSelector';
import AddOnlyNIF from '../addOnlyNif/AddOnlyNIF';
import ViewCustomer from '../viewCustomer/ViewCustomer';
import useSWR from 'swr';

import { FaUserPlus, FaUserCheck, FaUserTimes } from 'react-icons/fa';

export default function AddCustomer() {
  const { overlay, currentOrder } = useContext(GlobalContext);

  const [cardReader, setCardReader] = useState('');

  const { data: customers } = useSWR('/api/customers/*');

  const handleKeyPress = useCallback(
    (event) => {
      console.log(cardReader);
      if (event.key == 'Enter') {
        const matchedCustomer = customers.find((entries) => entries.reference == cardReader);
        if (matchedCustomer) currentOrder.setCustomer(matchedCustomer);
        setCardReader('');
      } else {
        setCardReader(cardReader + event.key);
      }
    },
    [cardReader, currentOrder, customers]
  );

  useEffect(() => {
    // attach the event listener
    if (!currentOrder.hasCustomer) {
      document.addEventListener('keydown', handleKeyPress);
    }
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, currentOrder.hasCustomer]);

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
            icon={<FaUserTimes />}
            type={'primary'}
            action={handleChangeNIF}
          />
        );
      } else {
        return (
          <AddCustomerButton
            label={currentOrder.customer.name.first + ' ' + currentOrder.customer.name.last}
            icon={<FaUserCheck />}
            type={'primary'}
            action={handleChangeCustomer}
          />
        );
      }
    } else {
      return <AddCustomerButton label={'Associar Cliente'} icon={<FaUserPlus />} type={'muted'} action={handleAddCustomer} />;
    }
  }

  return <div className={styles.container}>{getCorrectCustomerButton()}</div>;
}
