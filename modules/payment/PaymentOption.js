import { styled } from '@stitches/react';
import Button from '../../components/Button';

/* * */
/* PAYMENT OPTION */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled(Button, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$md',
  padding: '30px 20px 20px 20px',
  variants: {
    color: {
      secondary: {
        color: '$gray12', // Not correct, should override
      },
    },
  },
});

const IconWrapper = styled('div', {
  fontSize: '50px',
});

const Label = styled('div', {
  fontSize: '18px',
  fontWeight: '$bold',
  textTransform: 'uppercase',
});

/* */
/* LOGIC */

export default function PaymentOption({ value, icon, label, selectedPaymentOption, onSelect }) {
  //

  let isThisPaymentOptionSelected = false;
  if (selectedPaymentOption == value) isThisPaymentOptionSelected = true;

  return (
    <Container color={isThisPaymentOptionSelected ? 'primary' : 'secondary'} onClick={() => onSelect(value)}>
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
    </Container>
  );
}
