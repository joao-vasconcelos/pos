import useSWR from 'swr';
import styles from './Discounts.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../../../utils/global-context';
import DiscountCard from './discountCard/DiscountCard';

export default function Discounts() {
  const { data } = useSWR('/api/data');

  return (
    <div className={styles.container}>
      {data.discounts.length ? data.discounts.map((discount) => <DiscountCard key={discount.id} discount={discount} />) : 'Current order is empty'}
    </div>
  );
}
