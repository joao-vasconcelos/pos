import { useContext } from 'react';
import GlobalContext from '../utils/global-context';

import ProductCard from './ProductCard';
import styles from '../styles/ProductsGrid.module.css';

import useSWR from 'swr';

export default function ProductsGrid() {
  // const posData = useContext(GlobalContext);
  const { data } = useSWR('/api/data');

  return (
    <div className={styles.container}>
      {data ? data.categories[0].products.map(({ id, title }) => <ProductCard key={id} title={title} />) : 'Loading...'}
    </div>
  );
}
