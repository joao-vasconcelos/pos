import useSWR from 'swr';
import { styled } from '@stitches/react';
import Loading from '../components/Loading';
import Overlay from '../components/Overlay';
import FolderGrid from '../modules/folders/folderGrid/FolderGrid';
import ProductGrid from '../modules/products/productGrid/ProductGrid';
import Checkout from '../modules/checkout/Checkout';

/* * */
/* POINT OF SALE */
/* Explanation needed. */
/* * */

export default function PointOfSale() {
  //

  /* */
  /* STYLES */

  const Container = styled('div', {
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'row',
    gap: '$md',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    height: '100%',
    width: '100%',
    padding: '10px',
    backgroundColor: '$gray0',
    overflow: 'hidden',
  });

  const InnerWrapperA = styled('div', {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  });

  const InnerWrapperB = styled('div', {
    minWidth: '350px',
  });

  /* */
  /* LOGIC */

  const { data: customers } = useSWR('/api/customers/*');
  const { data: discounts } = useSWR('/api/discounts/*');
  const { data: device } = useSWR('/api/devices/A73HK2');

  /* */
  /* RENDER */

  return customers && discounts && device ? (
    <Container>
      <InnerWrapperA>
        <FolderGrid />
        <ProductGrid />
      </InnerWrapperA>
      <InnerWrapperB>
        <Checkout />
      </InnerWrapperB>
      <Overlay />
    </Container>
  ) : (
    <Loading />
  );
}
