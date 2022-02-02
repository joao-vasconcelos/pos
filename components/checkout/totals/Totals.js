// import { primaryButton } from '../../../styles/components';
import Button from '../../common/button/Button';
import styles from './Totals.module.css';

export default function Totals() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.row}>
          <p className={styles.orderSubtotalLabel}>Subtotal</p>
          <p className={styles.orderSubtotalValue}>2,75€</p>
        </div>
        <div className={styles.row}>
          <p className={styles.orderDiscountsLabel}>Valor dos Descontos</p>
          <p className={styles.orderDiscountsValue}>- 0,75€</p>
        </div>
      </div>
      <Button label={'Total = 7,79€'} />
    </div>
  );
}
