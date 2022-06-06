import Pannel from '../../../../common/pannel/container/Pannel';
import Button from '../../../../common/button/Button';
import useSWR from 'swr';

import Player from '../../../../../utils/Player';
import loadingDots from '/public/media/animations/loading-dots.json';

import styles from './PaidByCard.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../../../../services/context';
import transactionManager from '../../../../../utils/transactionManager';

export default function PaidByCard() {
  const { currentOrder, overlay } = useContext(GlobalContext);
  const { data: device } = useSWR('/api/devices/A73HK2');

  // Run on initialize component
  (function initiateCardRequest() {
    console.log('initiated');
  })();

  function handleCancelPayment() {
    overlay.setComponent();
  }

  async function handleSubmitPayment() {
    try {
      await transactionManager.createTransaction(currentOrder.items, currentOrder.customer, currentOrder.discounts, 'card', device.location);
      currentOrder.clear();
      overlay.setComponent();
    } catch (err) {
      alert('error');
    }
  }

  return (
    <Pannel>
      <div className={styles.container}>
        <div className={styles.player}>
          <Player animationData={loadingDots} />
        </div>
        <div className={styles.orderTotal}>{currentOrder.totals.total.toFixed(2) + '€'}</div>
        <div className={styles.paymentMethod}>Multibanco</div>
      </div>
      <div className={styles.buttons}>
        <Button label={'Pago'} type={'primary'} action={handleSubmitPayment} />
        <Button label={'Cancelar'} type={'muted'} action={handleCancelPayment} />
      </div>
    </Pannel>
  );
}
