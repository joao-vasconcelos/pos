import { styled } from '@stitches/react';
import { useContext } from 'react';
import { Appstate } from '../../context/Appstate';
import ProductSlot from './ProductSlot';

/* * */
/* PRODUCT GRID */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  gap: '$md',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  flex: 2,
  height: '100%',
});

/* */
/* LOGIC */

export default function ProductsGrid() {
  //

  const appstate = useContext(Appstate);

  return (
    <Container>
      {appstate.hasCurrentFolder && appstate.currentFolder.slots.map(({ product }, index) => <ProductSlot key={index} product={product} />)}
    </Container>
  );
}
