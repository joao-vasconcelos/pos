import { styled } from '@stitches/react';
import useSWR from 'swr';
import Pannel from '../../components/Pannel';
import Animation from '../../components/Animation';
import { useContext, useEffect, useCallback, useRef } from 'react';
import { GlobalContext } from '../../services/context';
import transactionManager from '../../utils/transactionManager';
import PaymentResult from './PaymentResult';

/* * */
/* PAY BY CARD */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  margin: '0 -$md',
  padding: '30px',
  paddingTop: '$md',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$md',
  minWidth: '400px',
});

const LoadingWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
  width: '200px',
  overflow: 'hidden',
  marginTop: '$lg',
});

const OrderTotal = styled('div', {
  fontSize: '60px',
  color: '$primary5',
  fontWeight: '$bold',
});

const PaymentMethod = styled('div', {
  fontSize: '15px',
  textTransform: 'uppercase',
  color: '$primary5',
  fontWeight: '$medium',
});

/* */
/* LOGIC */

export default function PayByCard() {
  //

  const alreadySentTransaction = useRef(false);

  const { currentOrder, overlay } = useContext(GlobalContext);
  const { data: device } = useSWR('/api/devices/A73HK2');

  // Run on mount component

  const initiatePayment = useCallback(async () => {
    try {
      await transactionManager.create(currentOrder.items, currentOrder.customer, currentOrder.discounts, { method: 'card' }, device);
      overlay.setComponent(<PaymentResult color={'success'} title={currentOrder.totals.total.toFixed(2) + '€'} subtitle={'Multibanco'} />);
      currentOrder.clear();
    } catch (err) {
      console.log(err);
      overlay.setComponent(<PaymentResult color={'danger'} title={'Erro'} subtitle={'Tente novamente'} />);
    }
  }, [currentOrder, device, overlay]);

  useEffect(() => {
    if (alreadySentTransaction.current === false) {
      alreadySentTransaction.current = true;
      initiatePayment();
    }
  }, [initiatePayment]);

  return (
    <Pannel>
      <Container>
        <OrderTotal>{currentOrder.totals.total.toFixed(2) + '€'}</OrderTotal>
        <PaymentMethod>Multibanco</PaymentMethod>
        <LoadingWrapper>
          <Animation name={'loading-dots'} />
        </LoadingWrapper>
      </Container>
    </Pannel>
  );
}
