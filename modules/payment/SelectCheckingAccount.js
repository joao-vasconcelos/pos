import { styled } from '@stitches/react';

import Pannel from '../../components/Pannel';
import Button from '../../components/Button';
import Animation from '../../components/Animation';

import { useContext, useState } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';
import PaymentStart from './PaymentStart';

import ButtonBar from '../../components/ButtonBar';

/* * */
/* PAYMENT */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const OrderTotal = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '60px',
  color: '$primary5',
  fontWeight: '$bold',
  margin: '0 -$md',
  padding: '$lg',
  paddingTop: '$md',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray7',
});

const ListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$sm',
  margin: '0 -$md $md -$md',
  overflow: 'scroll',
  position: 'relative',
  padding: '$md',
  borderBottomWidth: '$md',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray7',
});

const NoResultsMessage = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  width: '100%',
  height: '100%',
  fontSize: '30px',
  fontWeight: '$regular',
  color: '$gray7',
});

const CheckingAccountRow = styled('div', {
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray7',
  minWidth: '500px',
  borderRadius: '$md',
  color: '$gray11',
  padding: '$md',
  gap: '$xs',
  backgroundColor: '$gray3',
  '&:active': {
    color: '$gray12',
    backgroundColor: '$gray8',
    borderColor: '$gray9',
    boxShadow: '$sm',
  },
  variants: {
    selected: {
      true: {
        color: '$gray0',
        backgroundColor: '$primary5',
        borderColor: '$primary6',
        '&:active': {
          color: '$primary9',
          backgroundColor: '$primary6',
          borderColor: '$primary9',
          boxShadow: '$sm',
        },
      },
    },
  },
});

const CheckingAccountTitle = styled('div', {
  fontSize: '20px',
  fontWeight: '$medium',
});

const CheckingAccountClient = styled('div', {
  fontSize: '12px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
});

/* */
/* LOGIC */

export default function SelectCheckingAccount() {
  //

  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  const [selectedAccount, setSelectedAccount] = useState();

  function handleInitiatePayment() {
    const paymentMethod = currentOrder.payment;
    paymentMethod.checking_account = selectedAccount;
    currentOrder.setPayment(paymentMethod);
    appstate.setOverlay(<PaymentStart />);
  }

  return (
    <Pannel title={'Contas Correntes'}>
      <OrderTotal>{currentOrder.totals.total.toFixed(2) + '€'}</OrderTotal>
      <ListContainer>
        {appstate.hasDevice ? (
          appstate.device.checking_accounts?.length ? (
            appstate.device.checking_accounts.map((account) => (
              <CheckingAccountRow key={account._id} selected={selectedAccount?._id == account._id} onClick={() => setSelectedAccount(account)}>
                <CheckingAccountTitle>{account.title}</CheckingAccountTitle>
                <CheckingAccountClient>{account.client?.name}</CheckingAccountClient>
              </CheckingAccountRow>
            ))
          ) : (
            <NoResultsMessage>Nenhuma Conta Disponível</NoResultsMessage>
          )
        ) : (
          <Animation name={'loading-dots'} />
        )}
      </ListContainer>
      <ButtonBar cols={1}>
        <Button disabled={!selectedAccount} onClick={handleInitiatePayment}>
          Finalizar Pagamento
        </Button>
      </ButtonBar>
    </Pannel>
  );
}
