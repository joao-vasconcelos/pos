import Pannel from '../../../../../theme/modules/Pannel';
import Button from '../../../../../theme/components/Button';

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
        <Button onClick={handleCancelPayment}>Confirmar</Button>
        <Button color={'secondary'} onClick={handleCancelPayment}>
          Cancelar
        </Button>
      </div>
    </Pannel>
  );
}
