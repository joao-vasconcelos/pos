import { styled } from '@stitches/react';

/* * */
/* CUSTOMER DETAIL INPUT */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  variants: {
    mode: {
      read: {},
      edit: {
        borderWidth: '$md',
        borderStyle: 'solid',
        borderColor: '$gray7',
        borderRadius: '$md',
      },
    },
  },
});

const Label = styled('div', {
  fontSize: '12px',
  textTransform: 'uppercase',
  fontWeight: '$medium',
  variants: {
    mode: {
      read: {
        color: 'var(--gray-strong)',
        padding: '3px 5px',
      },
      edit: {
        color: '$gray10',
        borderBottomWidth: '$md',
        borderBottomStyle: 'solid',
        borderBottomColor: '$gray7',
        padding: '7px',
      },
    },
  },
});

const ReadValue = styled('div', {
  fontSize: '20px',
  fontWeight: 'var(--font-medium)',
  padding: '5px',
  paddingTop: '2px',
});

const EditInput = styled('input', {
  border: 'none',
  outline: 'none',
  fontSize: '18px',
  fontWeight: '$regular',
  padding: '7px',
  paddingTop: '5px',
});

/* */
/* LOGIC */

export default function CustomerDetailInput({ label, value = '', onChange, editMode }) {
  //

  return editMode ? (
    <Container mode={'edit'}>
      <Label mode={'edit'}>{label}</Label>
      <EditInput type='text' value={value} onChange={onChange} />
    </Container>
  ) : (
    <Container mode={'read'}>
      <Label mode={'read'}>{label}</Label>
      <ReadValue>{value}</ReadValue>
    </Container>
  );
}
