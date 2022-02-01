import Categories from '../../components/Categories';
import ProductsGrid from '../../components/ProductsGrid';
import Checkout from '../../components/Checkout';
import styles from '../../styles/Home.module.css';

export default function PointOfSale() {
  return (
    <div className={styles.container} onLoad={() => setData(JSON.parse(POSData))}>
      <div className={styles.leftSide}>
        <Categories />
        <ProductsGrid />
      </div>
      <div className={styles.rightSide}>
        <Checkout />
      </div>
    </div>
  );
}
