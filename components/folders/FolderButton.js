import cn from 'classnames';
import styles from './CategoryButton.module.css';

export default function FolderGrid({ title = 'untitled', active = false }) {
  return (
    <div
      className={cn({
        [styles.categoryBtn]: true,
        [styles.selected]: active,
      })}
    >
      <p>{title}</p>
    </div>
  );
}
