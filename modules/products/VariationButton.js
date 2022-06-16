import { styled } from '@stitches/react';

/* * */
/* VARIATION BUTTON */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$md $sm',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray7',
  borderRadius: '$md',
  color: '$gray12',
  backgroundColor: '$gray3',
  cursor: 'pointer',
  variants: {
    selected: {
      true: {
        color: '$gray0',
        backgroundColor: '$primary5',
        borderColor: '$primary7',
        boxShadow: '$md',
      },
    },
  },
});

const Title = styled('div', {
  fontSize: '18px',
  fontWeight: '$medium',
});

const Price = styled('div', {
  fontSize: '18px',
  fontWeight: '$medium',
  paddingLeft: '25px',
});

/* */
/* LOGIC */

export default function VariationButton({ variation, selectedVariation, onSelect }) {
  return (
    <Container selected={selectedVariation?._id == variation._id} onClick={() => onSelect(variation)}>
      <Title>{variation.title}</Title>
      <Price>{variation.price > 0 ? variation.price.toFixed(2) + '€' : 'FREE'}</Price>
    </Container>
  );
}
