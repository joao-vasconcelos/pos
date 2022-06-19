import useSWR from 'swr';
import { useEffect, useContext, useState } from 'react';
import { Appstate } from '../context/Appstate';
import { useRouter } from 'next/router';
import { styled } from '@stitches/react';
import Loading from '../components/Loading';
import Overlay from '../components/Overlay';
import FolderGrid from '../modules/folders/FolderGrid';
import ProductGrid from '../modules/products/ProductGrid';
import AssociateCustomer from '../modules/customers/AssociateCustomer';
import OrderDetails from '../modules/order/OrderDetails';
import OrderTotals from '../modules/order/OrderTotals';
import UserButton from '../modules/users/UserButton';
import Discounts from '../modules/discounts/Discounts';
import ErrorOverlay from '../components/ErrorOverlay';

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
  height: '100%',
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

  const router = useRouter();
  const { device_code = 'invalid_code' } = router.query;

  const { data: device } = useSWR('/api/devices/' + device_code);
  const { data: customers } = useSWR('/api/customers/*');

  const appstate = useContext(Appstate);

  const [isError, setIsError] = useState();

  // Set device data in Appstate
  useEffect(() => {
    if (device_code && !device?.isError) {
      setIsError(false);
      appstate.setDevice(device);
    } else setIsError(true);
  }, [appstate, device, device_code]);

  // Fix window height on component mount
  useEffect(() => document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`), []);

  /* */
  /* RENDER */

  return device && customers ? (
    isError ? (
      <ErrorOverlay />
    ) : (
      <Container>
        <ProductsContainer>
          <FolderGrid />
          <ProductGrid />
        </ProductsContainer>
        <CheckoutPannel>
          <UserButton />
          <AssociateCustomer />
          <InnerCheckoutWrapper>
            <OrderDetails />
            <Discounts />
          </InnerCheckoutWrapper>
          <OrderTotals />
        </CheckoutPannel>
        <Overlay />
      </Container>
    )
  ) : (
    <Loading />
  );
}
