import cn from 'classnames';
import styles from './UserButton.module.css';

import { useContext } from 'react';
import { Appstate } from '../../../context/Appstate';
import UserUnlock from '../userUnlock/UserUnlock';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';

export default function UserButton() {
  const appstate = useContext(Appstate);

  function handleLockUnlock() {
    if (appstate.hasCurrentUser) {
      appstate.setCurrentUser();
    } else {
      appstate.setOverlay(<UserUnlock />);
    }
  }

  return (
    <div onClick={handleLockUnlock}>
      <div
        className={cn({
          [styles.button]: true,
          [styles.locked]: !appstate.hasCurrentUser,
          [styles.unlocked]: appstate.hasCurrentUser,
        })}
      >
        {appstate.hasCurrentUser ? (
          <p className={styles.label}>
            <BsFillUnlockFill />
            {appstate.currentUser.name}
          </p>
        ) : (
          <p className={styles.label}>
            <BsFillLockFill />
            Caixa Bloqueada
          </p>
        )}
      </div>
      {!appstate.currentUser ? <div className={styles.lockOverlay}></div> : ''}
    </div>
  );
}
