import useSWR from 'swr';

import FolderGrid from '../components/folders/folderGrid/FolderGrid';
import ProductGrid from '../components/products/productGrid/ProductGrid';
import Checkout from '../components/checkout/Checkout';

import Loading from '../components/common/loading/Loading';

import styles from '../styles/Home.module.css';

import Overlay from '../components/common/overlay/Overlay';

export default function PointOfSale() {
  const { data: customers } = useSWR('/api/customers/list');
  const { data: discounts } = useSWR('/api/discounts');
  const { data: folders } = useSWR('/api/folders');
  const { data: users } = useSWR('/api/users');

  return customers && discounts && folders && users ? (
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
