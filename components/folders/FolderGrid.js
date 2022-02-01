import useSWR from 'swr';

import Loading from '../loading/Loading';
import FolderButton from './FolderButton';
import styles from './Categories.module.css';

export default function Categories() {
  const { data } = useSWR('/api/data');
  return (
    <div className={styles.container}>{data ? data.categories.map(({ id, title }) => <FolderButton key={id} title={title} />) : <Loading />}</div>
  );
}
