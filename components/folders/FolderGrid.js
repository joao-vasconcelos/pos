import useSWR from 'swr';

import Loading from '../loading/Loading';
import FolderButton from './FolderButton';
import styles from './Categories.module.css';

export default function FolderGrid() {
  const { data: folders } = useSWR('/api/folders');

  return (
    <div className={styles.container}>
      {folders ? folders.map(({ position, title }) => <FolderButton key={position} position={position} title={title} />) : <Loading />}
    </div>
  );
}
