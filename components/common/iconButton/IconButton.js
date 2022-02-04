import cn from 'classnames';
import styles from './IconButton.module.css';

export default function Button({ type = 'primary', label = 'Button', icon, action }) {
  return (
    <div
      className={cn({
        [styles.button]: true,
        [styles.primary]: type == 'primary',
        [styles.muted]: type == 'muted',
        [styles.disabled]: type == 'disabled',
      })}
      onClick={type == 'disabled' ? null : action}
    >
      <div className={styles.icon}>{icon}</div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
