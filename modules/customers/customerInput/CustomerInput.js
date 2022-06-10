import styles from './CustomerInput.module.css';
import cn from 'classnames';

export default function CustomerInput({ label, value = '', onChange, editMode }) {
  //

  function handleChange(e) {
    if (editMode) {
      onChange(e.target.value);
    }
  }

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.read]: !editMode,
        [styles.edit]: editMode,
      })}
    >
      <div className={styles.label}>{label}</div>
      <input className={styles.input} type='text' value={value} onChange={handleChange} />
    </div>
  );
}
