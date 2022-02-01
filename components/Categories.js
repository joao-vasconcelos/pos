import { useContext } from 'react';
import GlobalContext from '../utils/global-context';

import useSWR from 'swr';

import CategoryButton from './CategoryButton';
import styles from '../styles/Categories.module.css';

export default function Categories() {
  const { data } = useSWR('/api/data');
  console.log('hey', data);
  // const posData = useContext(GlobalContext);
  return (
    <div className={styles.container}>{data ? data.categories.map(({ id, title }) => <CategoryButton key={id} title={title} />) : 'Loading...'}</div>
  );
}
