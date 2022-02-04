import cn from 'classnames';
import styles from './UserLock.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../utils/global-context';
import UnlockUser from './unlockUser/UnlockUser';

export default function UserLock() {
  const { lockStatus, overlay } = useContext(GlobalContext);

  function handleLockUnlock() {
    if (lockStatus.currentUser) {
      lockStatus.setCurrentUser();
    } else {
      overlay.setComponent(<UnlockUser />);
    }
  }

  return (
    <div onClick={handleLockUnlock}>
      <div
        className={cn({
          [styles.button]: true,
          [styles.locked]: !lockStatus.currentUser,
          [styles.unlocked]: lockStatus.currentUser,
        })}
      >
        {lockStatus.currentUser ? <p className={styles.label}>{lockStatus.currentUser.name}</p> : <p className={styles.label}>Caixa Bloqueada</p>}
      </div>
      {!lockStatus.currentUser ? <div className={styles.lockOverlay}></div> : ''}
    </div>
  );
}
