import cn from 'classnames';
import styles from '../styles/CategoryButton.module.css';

export default function Categories({ title = 'untitled', active = false }) {
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
