import cn from 'classnames';
import styles from './Button.module.css';

export default function Button({ label = 'Button', type = 'primary', action }) {
  return (
    <div
      className={cn({
        [styles.button]: true,
        [styles.primary]: type == 'primary',
        [styles.muted]: type == 'muted',
      })}
      onClick={action}
    >
      {label}
    </div>
  );
}
