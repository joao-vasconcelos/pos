import FolderGrid from '../components/folders/FolderGrid';
import ProductGrid from '../components/products/ProductGrid';
import Checkout from '../components/checkout/Checkout';

import styles from '../styles/Home.module.css';

export default function PointOfSale() {
  return (
    <div className={styles.container} onLoad={() => setData(JSON.parse(POSData))}>
      <div className={styles.leftSide}>
        <FolderGrid />
        <ProductGrid />
      </div>
      <div className={styles.rightSide}>
        <Checkout />
      </div>
    </div>
  );
}
