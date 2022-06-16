import { styled } from '@stitches/react';
import { useContext } from 'react';
import { Appstate } from '../../context/Appstate';
import VariationSelector from '../products/variationSelector/VariationSelector';

/* * */
/* ORDER ITEM */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  backgroundColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$gray2',
  },
  '&:active': {
    backgroundColor: '$gray5',
  },
});

const InnerWrapper = styled('div', {
  padding: '10px 3px',
  margin: '0 12px',
  borderBottomWidth: '$sm',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray7',
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '3px',
});

const ProductTitle = styled('p', {
  fontSize: '15px',
  color: '$gray12',
  fontWeight: '$medium',
});

const RowTotal = styled('p', {
  fontSize: '17px',
  color: '$gray12',
  fontWeight: '$bold',
});

const VariationInfo = styled('p', {
  fontSize: '12px',
  color: '$gray10',
  fontWeight: '$regular',
});

/* */
/* LOGIC */

export default function OrderItem({ item }) {
  //

  const appstate = useContext(Appstate);

  function handleClick() {
    appstate.setOverlay(<VariationSelector product={item.product} orderItem={item} />);
  }

  return (
    <Container onClick={handleClick}>
      <InnerWrapper>
        <Row>
          <ProductTitle>{item.product.title}</ProductTitle>
          <RowTotal>{item.lineTotal.toFixed(2)}€</RowTotal>
        </Row>
        <Row>
          <VariationInfo>{item.variation.title}</VariationInfo>
          <VariationInfo>
            {item.qty} x {item.variation.price.toFixed(2)}€
          </VariationInfo>
        </Row>
      </InnerWrapper>
    </Container>
  );
}
