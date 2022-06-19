import useSWR from 'swr';
import { styled } from '@stitches/react';
import { useCallback, useEffect, useContext, useState } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';
import Button from '../../components/Button';
import CustomerList from './CustomerList';
import AssociateOnlyNIF from './AssociateOnlyNIF';
import CustomerDetail from './CustomerDetail';
import { FaUserPlus, FaUserCheck, FaUserTimes } from 'react-icons/fa';

/* * */
/* ASSOCIATE CUSTOMER */
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

/* */
/* LOGIC */

export default function AssociateCustomer() {
  //

  const { data: customers } = useSWR('/api/customers/*');
  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);
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
    [customers, currentOrder, cardReader]
  );

  useEffect(() => {
    if (!currentOrder.hasCustomer) document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, currentOrder.hasCustomer]);

  // Handlers

  function handleAddCustomer() {
    appstate.setOverlay(<CustomerList />);
  }

  function handleChangeNIF() {
    appstate.setOverlay(<AssociateOnlyNIF />);
  }

  function handleChangeCustomer() {
    appstate.setOverlay(<CustomerDetail customer_id={currentOrder.customer._id} />);
  }

  /* */
  /* RENDER */

  return (
    <Container>
      {currentOrder.hasCustomer ? (
        currentOrder.customer.isOnlyNif ? (
          <CustomerButton onClick={handleChangeNIF}>
            <Icon>
              <FaUserTimes />
            </Icon>
            <Label>{currentOrder.customer.tax_country + currentOrder.customer.tax_number}</Label>
          </CustomerButton>
        ) : (
          <CustomerButton onClick={handleChangeCustomer}>
            <Icon>
              <FaUserCheck />
            </Icon>
            <Label>{(currentOrder.customer?.first_name || '') + ' ' + (currentOrder.customer?.last_name || '')}</Label>
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
