import cn from 'classnames';
import styles from './UserUnlock.module.css';
import { useContext, useState } from 'react';
import { Appstate } from '../../../context/Appstate';

import Pannel from '../../../components/Pannel';
import { MdBackspace } from 'react-icons/md';

export default function UserUnlock() {
  //

  const appstate = useContext(Appstate);
  const [pwdInput, updatePwdInput] = useState([]);
  const [isError, setIsError] = useState();

  function handleClick({ target }) {
    let pwd = Array.from(pwdInput);
    if (isError) {
      pwd = [];
      setIsError(false);
    }
    pwd.push(target.innerHTML);
    updatePwdInput(pwd);
    if (pwd.length > 3) {
      const user = _.find(appstate.device.users, { pwd: pwd.join('').toString() });
      if (user) {
        appstate.setCurrentUser(user);
        appstate.setOverlay();
        // setTimeout(() => {
        //   appstate.setCurrentUser();
        // }, 300000);
      } else {
        setIsError(true);
      }
    }
  }

  function handleDeleteValue() {
    const pwd = Array.from(pwdInput);
    pwd.pop();
    updatePwdInput(pwd);
  }

  return (
    <Pannel title={'Desbloquear Caixa'}>
      <div className={styles.container}>
        <div
          className={cn({
            [styles.inputBackground]: true,
            [styles.isError]: isError,
          })}
        >
          <div className={styles.inputContainer}>
            <div
              className={cn({
                [styles.inputSlot]: true,
                [styles.filled]: pwdInput[0],
                [styles.unfilled]: !pwdInput[0],
              })}
            />
            <div
              className={cn({
                [styles.inputSlot]: true,
                [styles.filled]: pwdInput[1],
                [styles.unfilled]: !pwdInput[1],
              })}
            />
            <div
              className={cn({
                [styles.inputSlot]: true,
                [styles.filled]: pwdInput[2],
                [styles.unfilled]: !pwdInput[2],
              })}
            />
            <div
              className={cn({
                [styles.inputSlot]: true,
                [styles.filled]: pwdInput[3],
                [styles.unfilled]: !pwdInput[3],
              })}
            />
          </div>
        </div>

        <div className={styles.keyboardContainer}>
          <div className={styles.keyboardKey} onClick={handleClick}>
            7
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            8
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            9
          </div>
          <div className={styles.keyboardKeyDelete} onClick={handleDeleteValue}>
            <MdBackspace />
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            4
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            5
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            6
          </div>
          <div className={styles.keyboardKey} onClick={handleClick} style={{ gridRowEnd: 'span 2' }}>
            0
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            1
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            2
          </div>
          <div className={styles.keyboardKey} onClick={handleClick}>
            3
          </div>
        </div>
      </div>
    </Pannel>
  );
}
