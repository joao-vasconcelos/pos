import useSWR from 'swr';
import Loading from '../components/Loading';
import Overlay from '../components/Overlay';
import FolderGrid from '../modules/folders/folderGrid/FolderGrid';
import ProductGrid from '../modules/products/productGrid/ProductGrid';
import Checkout from '../modules/checkout/Checkout';

import styles from '../styles/pos/POS.module.css';

export default function PointOfSale() {
  //

  const { data: customers } = useSWR('/api/customers/*');
  const { data: discounts } = useSWR('/api/discounts/*');
  const { data: device } = useSWR('/api/devices/A73HK2');

  return customers && discounts && device ? (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <FolderGrid />
        <ProductGrid />
      </div>
      <div className={styles.rightSide}>
        <Checkout />
      </div>
      <Overlay />
    </div>
  ) : (
    <Loading />
  );
}
