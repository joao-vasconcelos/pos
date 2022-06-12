import cn from 'classnames';

import Button from '../../../components/Button';
import styles from './OrderTotals.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../../services/context';
import Payment from '../../payment/Payment';

export default function OrderTotals() {
  const { currentOrder, overlay } = useContext(GlobalContext);

  function handleFinalize() {
    overlay.setComponent(<Payment />);
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.row}>
          <p className={styles.subtotalLabel}>Subtotal</p>
          <p className={styles.subtotalValue}>{currentOrder.totals ? currentOrder.totals.subtotal.toFixed(2) : '0.00'}€</p>
        </div>
        <div
          className={cn({
            [styles.row]: true,
            [styles.active]: currentOrder.totals && currentOrder.totals.discounts > 0,
          })}
        >
          <p className={styles.discountsLabel}>Valor dos Descontos</p>
          <p className={styles.discountsValue}>{currentOrder.totals ? currentOrder.totals.discounts.toFixed(2) : '0.00'}€</p>
        </div>
      </div>
      <Button disabled={!currentOrder.items.length} onClick={handleFinalize}>
        {currentOrder.items.length ? 'Total = ' + currentOrder.totals.total.toFixed(2) + '€' : 'No Items Yet'}
      </Button>
    </div>
  );
}
