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

  return data ? (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <FolderGrid />
        <ProductGrid />
      </div>
      <div className={styles.rightSide}>
        <Checkout />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
