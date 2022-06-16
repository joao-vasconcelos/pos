import { styled } from '@stitches/react';
import { useContext } from 'react';
import { CurrentOrder } from '../../context/CurrentOrder';
import DiscountCard from './DiscountCard';

/* * */
/* DISCOUNTS */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  overflow: 'scroll',
  margin: '0 $md',
});

/* */
/* LOGIC */

export default function Discounts() {
  //
  const currentOrder = useContext(CurrentOrder);

  return (
    currentOrder.hasDiscounts && (
      <Container>
        {currentOrder.discounts.map((discount, index) => (
          <DiscountCard key={index} discount={discount} />
        ))}
      </Container>
    )
  );
}
