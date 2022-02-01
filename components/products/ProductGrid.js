import ProductCard from './ProductCard';
import styles from './ProductsGrid.module.css';

import useSWR from 'swr';

export default function ProductsGrid() {
  const { data } = useSWR('/api/data');

  return (
    <div className={styles.container}>
      {data ? data.categories[0].products.map(({ id, title }) => <ProductCard key={id} title={title} />) : 'Loading...'}
    </div>
  );
}
