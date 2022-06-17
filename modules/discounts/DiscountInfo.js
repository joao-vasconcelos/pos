import { styled } from '@stitches/react';
import Pannel from '../../components/Pannel';
import DiscountCard from './DiscountCard';

/* * */
/* DISCOUNT INFO */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Explanation = styled('div', {
  fontSize: '12px',
});

/* */
/* LOGIC */

export default function DiscountInfo({ discount }) {
  return (
    <Pannel title={'Discount Info'}>
      <DiscountCard discount={discount} />
      <Explanation>{discount.description}</Explanation>
    </Pannel>
  );
}
