import { styled } from '@stitches/react';
import { useContext, useState, useEffect } from 'react';
import { Appstate } from '../../context/Appstate';
import Pannel from '../../components/Pannel';
import Keypad from '../../components/Keypad';

/* * */
/* USER UNLOCK */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '100%',
  gap: '$md',
});

const InputContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px',
  backgroundColor: '$gray3',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray6',
  borderRadius: '$md',
  padding: '30px',
  variants: {
    isError: {
      true: {
        color: '$gray0',
        backgroundColor: '$danger5',
        borderColor: '$danger7',
        boxShadow: '$md',
      },
    },
  },
});

const InputSlot = styled('div', {
  width: '30px',
  height: '30px',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderRadius: '$pill',
  variants: {
    empty: {
      true: {
        backgroundColor: 'transparent',
        borderColor: '$primary5',
      },
      false: {
        backgroundColor: '$primary5',
        borderColor: '$primary6',
        boxShadow: '$md',
      },
    },
    isError: {
      true: {
        borderColor: '$danger9',
        backgroundColor: '$danger7',
      },
    },
  },
  compoundVariants: [
    {
      empty: false,
      isError: true,
      css: {
        borderColor: '$danger9',
        backgroundColor: '$danger7',
      },
    },
  ],
});

/* */
/* LOGIC */

export default function UserUnlock() {
  //

  const appstate = useContext(Appstate);

  const [pwdInput, setPwdInput] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Declare events to track user activity and store time in localStorage
    document.addEventListener('touchstart', () => {
      localStorage.setItem('user_actvity', new Date());
    });
    document.addEventListener('mousedown', () => {
      localStorage.setItem('user_actvity', new Date());
    });
    document.addEventListener('mousemove', () => {
      localStorage.setItem('user_actvity', new Date());
    });
  });

  function handleClick(value) {
    let pwd = Array.from(pwdInput);
    if (isError) {
      pwd = [];
      setIsError(false);
    }
    pwd.push(value);
    setPwdInput(pwd);
    if (pwd.length > 3) {
      const user = appstate.device?.users.find((usr) => String(usr.pwd) == pwd.join('').toString());
      if (user) {
        appstate.loginUser(user);
        appstate.setOverlay();
      } else {
        setIsError(true);
      }
    }
  }

  function handleDeleteValue() {
    if (isError) setIsError(false);
    const pwd = Array.from(pwdInput);
    pwd.pop();
    setPwdInput(pwd);
  }

  return (
    <Pannel title={'Desbloquear Caixa'}>
      <Container>
        <InputContainer isError={isError}>
          <InputSlot empty={!pwdInput[0]} isError={isError} />
          <InputSlot empty={!pwdInput[1]} isError={isError} />
          <InputSlot empty={!pwdInput[2]} isError={isError} />
          <InputSlot empty={!pwdInput[3]} isError={isError} />
        </InputContainer>
        <Keypad onClick={handleClick} onDelete={handleDeleteValue} />
      </Container>
    </Pannel>
  );
}
