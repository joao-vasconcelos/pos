import useSWR from 'swr';

import FolderGrid from '../components/folders/FolderGrid';
import ProductGrid from '../components/products/ProductGrid';
import Checkout from '../components/checkout/Checkout';

import Loading from '../components/loading/Loading';

import styles from '../styles/Home.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../utils/global-context';

export default function PointOfSale() {
  const { data } = useSWR('/api/data');

  const { count } = useContext(GlobalContext);

  function handleClick() {
    count.setCount(count.count + 1);
  }

  return data ? (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <p>{count.count}</p>
        <FolderGrid />
        <ProductGrid />
      </div>
      <div className={styles.rightSide}>
        <button onClick={handleClick}>Submit</button>
        <Checkout />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
