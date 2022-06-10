import useSWR from 'swr';
import { useRouter } from 'next/router';
import { styled } from '@stitches/react';
import Loading from '../components/Loading';
import Overlay from '../components/Overlay';
import FolderGrid from '../modules/folders/folderGrid/FolderGrid';
import ProductGrid from '../modules/products/productGrid/ProductGrid';
import AddCustomer from '../modules/customers/addCustomer/AddCustomer';
import OrderDetails from '../modules/order/orderDetails/OrderDetails';
import Totals from '../modules/order/orderTotals/OrderTotals';
import UserLock from '../modules/users/userButton/UserButton';
import Discounts from '../modules/discounts/container/Discounts';

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
        <AddCustomer />
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
