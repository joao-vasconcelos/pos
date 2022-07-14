import { styled } from '@stitches/react';

/* * */
/* SUMMARY BOX */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray6',
  borderRadius: '$sm',
  fontSize: '30px',
  alignItems: 'center',
});

const Title = styled('div', {
  width: '100%',
  textAlign: 'center',
  fontSize: '15px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
  color: '$gray12',
  padding: '$xs $lg',
  borderBottomWidth: '$md',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray6',
  backgroundColor: '$gray2',
});

const Value = styled('div', {
  fontSize: '35px',
  fontWeight: '$bold',
  color: '$primary5',
  padding: '$sm $lg',
  width: '100%',
  textAlign: 'center',
});

/* */
/* LOGIC */

export default function SummaryBox({ title, value }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
}
