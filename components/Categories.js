import useSWR from 'swr';

import CategoryButton from './CategoryButton';
import styles from '../styles/Categories.module.css';

export default function Categories() {
  const { data } = useSWR('/api/data');
  return (
    <div className={styles.container}>{data ? data.categories.map(({ id, title }) => <CategoryButton key={id} title={title} />) : 'Loading...'}</div>
  );
}
