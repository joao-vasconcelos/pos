import { styled } from '@stitches/react';
import { useContext, useState } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';
import Pannel from '../../components/Pannel';
import Button from '../../components/Button';
import VariationButton from './VariationButton';
import ButtonBar from '../../components/ButtonBar';

/* * */
/* VARIATION SELECTOR */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '300px',
  minWidth: '600px',
  gap: '30px',
});

const ProductDescription = styled('p', {
  margin: 0,
});

const VariationGrid = styled('div', {
  display: 'grid',
  placeItems: 'stretch',
  placeContent: 'stretch',
  gridTemplateColumns: 'repeat(2, minmax(130px, 1fr))',
  gap: '$md',
});

const QtyContainer = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'stretch',
  alignItems: 'stretch',
  overflow: 'hidden',
  backgroundColor: '$gray0',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray7',
  borderRadius: '$md',
  fontWeight: '$bold',
  fontSize: '20px',
});

const QtyButton = styled(Button, {
  width: '80px',
  aspectRatio: '1',
  backgroundColor: '$gray3',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  borderRadius: '0',
});

const QtyDisplay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderLeftWidth: '$md',
  borderLeftStyle: 'solid',
  borderLeftColor: '$gray7',
  borderRightWidth: '$md',
  borderRightStyle: 'solid',
  borderRightColor: '$gray7',
  color: '$gray11',
});

/* */
/* LOGIC */

export default function VariationSelector({ product, orderItem = null }) {
  //
  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  const [selectedVariation, setSelectedVariation] = useState(orderItem ? orderItem.variation : null);
  const [selectedQuantity, setSelectedQuantity] = useState(orderItem ? orderItem.qty : 1);

  let qty = selectedQuantity;

  function handleSelect(clickedVariation) {
    setSelectedVariation(clickedVariation);
  }

  function handleQtyDecrease() {
    if (qty < 2) {
      qty = 1;
      setSelectedQuantity(qty);
    } else {
      qty--;
      setSelectedQuantity(qty--);
    }
  }

  function handleQtyIncrease() {
    qty++;
    setSelectedQuantity(qty++);
  }

  function handleAdd() {
    currentOrder.addItem(product, selectedVariation, qty);
    appstate.setOverlay();
  }

  function handleChange() {
    currentOrder.changeItem(orderItem, selectedVariation, qty);
    appstate.setOverlay();
  }

  function handleRemove() {
    currentOrder.removeItem(orderItem);
    appstate.setOverlay();
  }

  return (
    <Pannel title={product.title}>
      <Container>
        {product.description && <ProductDescription>{product.description}</ProductDescription>}
        <VariationGrid>
          {product.variations
            ? product.variations.map((variation) => (
                <VariationButton key={variation._id} variation={variation} selectedVariation={selectedVariation} onSelect={handleSelect} />
              ))
            : 'no variations'}
        </VariationGrid>

        <QtyContainer>
          <QtyButton color={'secondary'} disabled={qty < 2} onClick={handleQtyDecrease}>
            -
          </QtyButton>
          <QtyDisplay>{qty}</QtyDisplay>
          <QtyButton color={'secondary'} onClick={handleQtyIncrease}>
            +
          </QtyButton>
        </QtyContainer>

        {orderItem ? (
          <ButtonBar>
            <Button onClick={handleChange}>Atualizar</Button>
            <Button color={'danger'} onClick={handleRemove}>
              Remover
            </Button>
          </ButtonBar>
        ) : (
          <Button disabled={!selectedVariation} onClick={handleAdd}>
            Adicionar
          </Button>
        )}
      </Container>
    </Pannel>
  );
}
