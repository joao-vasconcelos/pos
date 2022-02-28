import styles from '../../../styles/dashboard/DashboardProducts.module.css';
import Sidebar from '../../../components/dashboard/sidebar/container/Sidebar';
import useSWR from 'swr';
import ProductListItem from '../../../components/dashboard/products/productListItem/ProductListItem';
import Loading from '../../../components/common/loading/Loading';

export default function DashboardProductAdd() {
  //

  return (
    <Sidebar title={'New Product'}>
      <div className={styles.productList}>
        <Loading />
      </div>
    </Sidebar>
  );
}
