import { styled } from '@stitches/react';
import { useContext } from 'react';
import { CurrentOrder } from '../../context/CurrentOrder';
import OrderItem from './orderItem/OrderItem';

/* * */
/* ORDER DETAILS */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  overflow: 'scroll',
  marginBottom: '$md',
});

const EmptyOrder = styled('div', {
  textAlign: 'center',
  fontSize: '12px',
  textTransform: 'uppercase',
  color: '$gray9',
  marginTop: '$md',
});

/* */
/* LOGIC */

export default function OrderDetails() {
  const currentOrder = useContext(CurrentOrder);

  return (
    <Container>
      {currentOrder.hasItems ? currentOrder.items.map((item, index) => <OrderItem key={index} item={item} />) : <EmptyOrder>Pedido Vazio</EmptyOrder>}
    </Container>
  );
}
