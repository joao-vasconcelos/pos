import { styled } from '@stitches/react';
import { useContext } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';
import Button from '../../components/Button';
import Payment from '../payment/Payment';

/* * */
/* ORDER TOTALS */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
});

const InnerWrapper = styled('div', {
  borderTopWidth: '$sm',
  borderTopStyle: 'solid',
  borderTopColor: '$gray4',
  padding: '10px 0',
});

const Row = styled('div', {
  padding: '3px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
});

const Subtotal = styled('p', {
  fontWeight: '$bold',
  textTransform: 'uppercase',
  color: '$gray8',
  variants: {
    active: {
      true: {
        color: '$gray12',
      },
    },
  },
});

const SubtotalLabel = styled(Subtotal, {
  fontSize: '12px',
});

const SubtotalValue = styled(Subtotal, {
  fontSize: '15px',
});

const Discounts = styled('p', {
  fontWeight: '$bold',
  textTransform: 'uppercase',
  color: '$gray8',
  variants: {
    active: {
      true: {
        color: '$primary5',
      },
    },
  },
});

const DiscountsLabel = styled(Discounts, {
  fontSize: '12px',
});

const DiscountsValue = styled(Discounts, {
  fontSize: '15px',
});

/* */
/* LOGIC */

export default function OrderTotals() {
  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  function handleFinalize() {
    appstate.setOverlay(<Payment />);
  }

  return (
    <Container>
      <InnerWrapper>
        <Row>
          <SubtotalLabel active={currentOrder.hasItems}>Subtotal</SubtotalLabel>
          <SubtotalValue active={currentOrder.hasItems}>{currentOrder.totals ? currentOrder.totals.subtotal.toFixed(2) : '0.00'}€</SubtotalValue>
        </Row>
        <Row>
          <DiscountsLabel active={currentOrder.totals && currentOrder.totals.discounts > 0}>Valor dos Descontos</DiscountsLabel>
          <DiscountsValue active={currentOrder.totals && currentOrder.totals.discounts > 0}>
            {currentOrder.totals ? currentOrder.totals.discounts.toFixed(2) : '0.00'}€
          </DiscountsValue>
        </Row>
      </InnerWrapper>
      <Button disabled={!currentOrder.hasItems} onClick={handleFinalize}>
        {currentOrder.hasItems ? 'Total = ' + currentOrder.totals.total.toFixed(2) + '€' : 'Pedido Vazio'}
      </Button>
    </Container>
  );
}
