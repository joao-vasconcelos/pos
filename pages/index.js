import useSWR from 'swr';

import FolderGrid from '../components/pos/folders/folderGrid/FolderGrid';
import ProductGrid from '../components/pos/products/productGrid/ProductGrid';
import Checkout from '../components/pos/checkout/Checkout';

import Loading from '../components/common/loading/Loading';

import styles from '../styles/pos/POS.module.css';

import Overlay from '../components/common/overlay/Overlay';

export default function PointOfSale() {
  const { data: customers } = useSWR('/api/customers/*');
  const { data: discounts } = useSWR('/api/discounts/*');
  const { data: device } = useSWR('/api/devices/628ec0e43eed7e89de4e0156');

  return customers && discounts && device ? (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <FolderGrid />
        <ProductGrid />
      </div>
      <div className={styles.rightSide}>
        <Checkout />
      </div>
      <Overlay visible={true} component={<Checkout />} />
    </div>
  ) : (
    <Loading />
  );
}
