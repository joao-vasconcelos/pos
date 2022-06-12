import useSWR from 'swr';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@stitches/react';
import Loading from '../components/Loading';
import Overlay from '../components/Overlay';
import FolderGrid from '../modules/folders/folderGrid/FolderGrid';
import ProductGrid from '../modules/products/productGrid/ProductGrid';
import AssociateCustomer from '../modules/customers/AssociateCustomer';
import OrderDetails from '../modules/order/orderDetails/OrderDetails';
import Totals from '../modules/order/orderTotals/OrderTotals';
import UserLock from '../modules/users/userButton/UserButton';
import Discounts from '../modules/discounts/container/Discounts';

/* * */
/* POINT OF SALE */
/* Explanation needed. */
/* * */

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
  minHeight: 'var(--window-inner-height)',
  width: '100%',
  padding: '$sm',
  backgroundColor: '$gray0',
});

const ProductsContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
});

const CheckoutPannel = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  minWidth: '350px',
  borderRadius: '$md',
  backgroundColor: '$gray0',
  boxShadow: '$md',
  overflow: 'scroll',
});

const InnerCheckoutWrapper = styled('div', {
  height: '100%',
  flexGrow: 0,
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export default function PointOfSale() {
  //

  const syncHeight = useCallback(() => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  }, []);

  useEffect(() => {
    syncHeight();
    // window.addEventListener('resize', syncHeight);
  }, [syncHeight]);

  /* */
  /* LOGIC */

  const router = useRouter();
  const { device_code } = router.query;

  const { data: device } = useSWR('/api/devices/A73HK2'); // Replace later with device_code
  const { data: customers } = useSWR('/api/customers/*');

  /* */
  /* RENDER */

  return device && customers ? (
    <Container>
      <ProductsContainer>
        <FolderGrid />
        <ProductGrid />
      </ProductsContainer>
      <CheckoutPannel>
        <UserLock />
        <AssociateCustomer />
        <InnerCheckoutWrapper>
          <OrderDetails />
          <Discounts />
        </InnerCheckoutWrapper>
        <Totals />
      </CheckoutPannel>
      <Overlay />
    </Container>
  ) : (
    <Loading />
  );
}
