import { styled } from '@stitches/react';
import { useContext } from 'react';
import { Appstate } from '../../context/Appstate';
import DiscountInfo from './DiscountInfo';

/* * */
/* DISCOUNT CARD */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '$gray3',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray5',
  borderRadius: '$md',
  marginBottom: '$sm',
  cursor: 'pointer',
});

const Title = styled('p', {
  fontSize: '15px',
  fontWeight: '$bold',
  textTransform: 'uppercase',
  marginBottom: '3px',
});

const Subtitle = styled('p', {
  fontSize: '12px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
  opacity: 0.8,
});

/* */
/* LOGIC */

export default function DiscountCard({ discount }) {
  //

  const appstate = useContext(Appstate);

  function showInfo() {
    appstate.setOverlay(<DiscountInfo discount={discount} />);
  }

  return (
    <Container css={{ borderColor: discount.style.border, backgroundColor: discount.style.fill, color: discount.style.text }} onClick={showInfo}>
      <Title>{discount.title}</Title>
      <Subtitle>{discount.subtitle}</Subtitle>
    </Container>
  );
}
