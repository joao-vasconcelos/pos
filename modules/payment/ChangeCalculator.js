import { styled } from '@stitches/react';
import { useContext, useState, useEffect } from 'react';
import { Appstate } from '../../context/Appstate';
import Pannel from '../../components/Pannel';
import Keypad from '../../components/Keypad';
import Button from '../../components/Button';

/* * */
/* CHANGE CALCULATOR */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$md',
});

const Row = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
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

export default function ChangeCalculator() {
  //

  const appstate = useContext(Appstate);

  const [pwdInput, setPwdInput] = useState('');
  const [isError, setIsError] = useState(false);

  function handleClick(value) {
    const newValue = Array.from(pwdInput);
    newValue.push(value);
    setPwdInput(newValue);
  }

  function handleDeleteValue() {
    const newValue = Array.from(pwdInput);
    newValue.pop();
    setPwdInput(newValue);
  }

  return (
    <Pannel title={'Calcular Troco'}>
      <Container>
        <Row>
          <InputContainer isError={isError}>{pwdInput}</InputContainer>
          <Keypad onClick={handleClick} onDelete={handleDeleteValue} />
        </Row>
        <Button>Finalizar Pagamento</Button>
      </Container>
    </Pannel>
  );
}
