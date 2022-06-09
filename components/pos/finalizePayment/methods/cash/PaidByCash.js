import Pannel from '../../../../../theme/modules/Pannel';
import Animation from '../../../../../theme/modules/Animation';
import Button from '../../../../../theme/components/Button';

import styles from './PaidByCash.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../../../../services/context';

export default function PaidByCash() {
  const { currentOrder, overlay } = useContext(GlobalContext);

  // Run on initialize component
  (function initiateCashRequest() {
    console.log('initiated');
  })();

  function handleCancelPayment() {
    overlay.setComponent();
  }

  return (
    <Pannel>
      <div className={styles.container}>
        <div className={styles.player}>
          <Animation name={'loading-dots'} />
        </div>
        <div className={styles.orderTotal}>{currentOrder.totals.total.toFixed(2) + '€'}</div>
        <div className={styles.paymentMethod}>Numerário</div>
      </div>
      <Button color={'secondary'} onClick={handleCancelPayment}>
        Cancelar
      </Button>
    </Pannel>
  );
}
