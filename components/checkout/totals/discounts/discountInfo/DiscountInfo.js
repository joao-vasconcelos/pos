import Pannel from '../../../../common/pannel/Pannel';
import DiscountCard from '../discountCard/DiscountCard';
import styles from './DiscountInfo.module.css';

export default function DiscountInfo({ discount }) {
  return (
    <Pannel title={'Discount Info'}>
      <DiscountCard discount={discount} />
      <div className={styles.discountExplanation}>{discount.explanation}</div>
    </Pannel>
  );
}
