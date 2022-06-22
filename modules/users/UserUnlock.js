import { styled } from '@stitches/react';
import { useContext, useState, useEffect } from 'react';
import { Appstate } from '../../context/Appstate';
import Pannel from '../../components/Pannel';
import { MdBackspace } from 'react-icons/md';

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

const KeyboardContainer = styled('div', {
  display: 'grid',
  placeItems: 'stretch',
  placeContent: 'stretch',
  gridTemplateColumns: 'repeat(4, 80px)',
  gridTemplateRows: 'repeat(3, 80px)',
  gap: '$md',
});

const KeyboardKey = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray3',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray6',
  color: '$gray10',
  borderRadius: '$md',
  fontSize: '30px',
  fontWeight: '$bold',
  cursor: 'pointer',
  '&:hover': {
    color: '$gray11',
    backgroundColor: '$gray4',
    borderColor: '$gray7',
  },
  '&:active': {
    color: '$gray0',
    backgroundColor: '$primary5',
    borderColor: '$primary7',
    boxShadow: '$md',
  },
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

  function handleClick({ target }) {
    let pwd = Array.from(pwdInput);
    if (isError) {
      pwd = [];
      setIsError(false);
    }
    pwd.push(target.innerHTML);
    setPwdInput(pwd);
    if (pwd.length > 3) {
      const user = appstate.device?.users.find((usr) => usr.pwd == pwd.join('').toString());
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

        <KeyboardContainer>
          <KeyboardKey onClick={handleClick}>7</KeyboardKey>
          <KeyboardKey onClick={handleClick}>8</KeyboardKey>
          <KeyboardKey onClick={handleClick}>9</KeyboardKey>
          <KeyboardKey onClick={handleDeleteValue}>
            <MdBackspace />
          </KeyboardKey>
          <KeyboardKey onClick={handleClick}>4</KeyboardKey>
          <KeyboardKey onClick={handleClick}>5</KeyboardKey>
          <KeyboardKey onClick={handleClick}>6</KeyboardKey>
          <KeyboardKey onClick={handleClick} css={{ gridRowEnd: 'span 2' }}>
            0
          </KeyboardKey>
          <KeyboardKey onClick={handleClick}>1</KeyboardKey>
          <KeyboardKey onClick={handleClick}>2</KeyboardKey>
          <KeyboardKey onClick={handleClick}>3</KeyboardKey>
        </KeyboardContainer>
      </Container>
    </Pannel>
  );
}
