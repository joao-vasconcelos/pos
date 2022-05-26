import Pannel from '../../../../common/pannel/container/Pannel';
import Button from '../../../../common/button/Button';

import Player from '../../../../../utils/Player';
import loadingDots from '/public/media/animations/loading-dots.json';

import styles from './PaidByAccount.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../../../../services/context';

export default function PaidByAccount() {
  const { currentOrder, overlay } = useContext(GlobalContext);

  // Run on initialize component
  (function initiateAccountRequest() {
    console.log('initiated');
  })();

  function handleCancelPayment() {
    overlay.setComponent();
  }

  function handleSubmitPayment() {
    overlay.setComponent();
  }

  return (
    <Pannel>
      <div className={styles.container}>
        <div className={styles.orderTotal}>{currentOrder.totals.total.toFixed(2) + '€'}</div>
        <div className={styles.paymentMethod}>Conta Corrente</div>
      </div>
      <div className={styles.buttons}>
        <Button label={'Confirmar'} type={'primary'} action={handleCancelPayment} />
        <Button label={'Cancelar'} type={'muted'} action={handleCancelPayment} />
      </div>
    </Pannel>
  );
}
