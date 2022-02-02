import styles from './Overlay.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../utils/global-context';

export default function Overlay() {
  const { overlay } = useContext(GlobalContext);

  return overlay.component ? <div className={styles.overlay}>{overlay.component}</div> : '';
}
