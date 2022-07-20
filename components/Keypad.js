import { styled } from '@stitches/react';
import { MdBackspace } from 'react-icons/md';

/* * */
/* KEYPAD */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const KeypadContainer = styled('div', {
  display: 'grid',
  placeItems: 'stretch',
  placeContent: 'stretch',
  gridTemplateColumns: 'repeat(4, 80px)',
  gridTemplateRows: 'repeat(3, 80px)',
  gap: '$md',
});

const KeypadKey = styled('div', {
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

export default function Keypad({ onClick, onDelete }) {
  //

  function handleNumberClick({ target }) {
    onClick(target.innerHTML);
  }

  function handleDeleteClick() {
    onDelete();
  }

  return (
    <KeypadContainer>
      <KeypadKey onClick={handleNumberClick}>7</KeypadKey>
      <KeypadKey onClick={handleNumberClick}>8</KeypadKey>
      <KeypadKey onClick={handleNumberClick}>9</KeypadKey>
      <KeypadKey onClick={handleDeleteClick}>
        <MdBackspace />
      </KeypadKey>
      <KeypadKey onClick={handleNumberClick}>4</KeypadKey>
      <KeypadKey onClick={handleNumberClick}>5</KeypadKey>
      <KeypadKey onClick={handleNumberClick}>6</KeypadKey>
      <KeypadKey onClick={handleNumberClick} css={{ gridRowEnd: 'span 2' }}>
        0
      </KeypadKey>
      <KeypadKey onClick={handleNumberClick}>1</KeypadKey>
      <KeypadKey onClick={handleNumberClick}>2</KeypadKey>
      <KeypadKey onClick={handleNumberClick}>3</KeypadKey>
    </KeypadContainer>
  );
}
