import Pannel from '../../../../../modules/Pannel';
import Button from '../../../../../theme/components/Button';

import Player from '../../../../../utils/Player';
import loadingDots from '/public/media/animations/loading-dots.json';

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
          <Player animationData={loadingDots} />
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
