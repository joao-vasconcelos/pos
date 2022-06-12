import useSWR from 'swr';
import { styled } from '@stitches/react';
import { useCallback, useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../services/context';
import Button from '../../components/Button';
import CustomerList from './CustomerList';
import AddOnlyNIF from './AddOnlyNIF';
import ViewCustomer from './viewCustomer/ViewCustomer';
import { FaUserPlus, FaUserCheck, FaUserTimes } from 'react-icons/fa';

/* * */
/* ADD CUSTOMER */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  margin: '$sm',
});

const CustomerButton = styled(Button, {
  width: '100%',
  height: '50px',
  padding: 0,
});

const Icon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '25px',
  height: '100%',
  aspectRatio: '9/8',
  borderRightWidth: '$md',
  borderRightStyle: 'solid',
  borderRightColor: 'inherit',
});

const Label = styled('p', {
  width: '100%',
  fontSize: '18px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
});

export default function AddCustomer() {
  //

  /* */
  /* LOGIC */

  const { data: customers } = useSWR('/api/customers/*');
  const { overlay, currentOrder } = useContext(GlobalContext);
  const [cardReader, setCardReader] = useState('');

  // Card Reader

  const handleKeyPress = useCallback(
    (event) => {
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
    if (!currentOrder.hasCustomer) document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, currentOrder.hasCustomer]);

  // Handlers

  function handleAddCustomer() {
    overlay.setComponent(<CustomerList />);
  }

  function handleChangeNIF() {
    overlay.setComponent(<AddOnlyNIF />);
  }

  function handleChangeCustomer() {
    overlay.setComponent(<ViewCustomer customer={currentOrder.customer} />);
  }

  /* */
  /* RENDER */

  return (
    <Container>
      {currentOrder.customer ? (
        currentOrder.customer.onlyNif ? (
          <CustomerButton onClick={handleChangeNIF}>
            <Icon>
              <FaUserTimes />
            </Icon>
            <Label>{currentOrder.customer.tax.country + currentOrder.customer.tax.number}</Label>
          </CustomerButton>
        ) : (
          <CustomerButton onClick={handleChangeCustomer}>
            <Icon>
              <FaUserCheck />
            </Icon>
            <Label>{currentOrder.customer.name.first + ' ' + currentOrder.customer.name.last}</Label>
          </CustomerButton>
        )
      ) : (
        <CustomerButton color={'secondary'} onClick={handleAddCustomer}>
          <Icon>
            <FaUserPlus />
          </Icon>
          <Label>Associar Cliente</Label>
        </CustomerButton>
      )}
    </Container>
  );
}
