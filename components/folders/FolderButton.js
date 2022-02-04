import cn from 'classnames';
import styles from './CategoryButton.module.css';

import { useContext } from 'react';
import { GlobalContext } from '../../utils/global-context';

export default function FolderButton({ position, title = 'untitled' }) {
  const { currentFolder } = useContext(GlobalContext);

  function handleClick() {
    currentFolder.set(position);
  }

  return (
    <div
      className={cn({
        [styles.categoryBtn]: true,
        [styles.unselected]: position != currentFolder.position,
        [styles.selected]: position == currentFolder.position,
      })}
      onClick={handleClick}
    >
      <p>{title}</p>
    </div>
  );
}
