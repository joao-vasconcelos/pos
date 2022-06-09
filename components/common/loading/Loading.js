import styles from './Loading.module.css';

import Animation from '../../../utils/Animation';
import loadingDots from '/public/media/animations/loading-dots.json';

export default function Loading() {
  return (
    <div className={styles.container}>
      <Animation name={'loading-dots'} />
    </div>
  );
}
