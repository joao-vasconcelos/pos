import styles from '../../../styles/dashboard/DashboardProducts.module.css';
import Sidebar from '../../../components/dashboard/sidebar/container/Sidebar';
import useSWR from 'swr';
import Loading from '../../../components/common/loading/Loading';
import { useRouter } from 'next/router';
import VariationListItem from '../../../components/dashboard/products/variationListItem/VariationListItem';

export default function DashboardProductView() {
  //
  const router = useRouter();
  const { _id } = router.query;

  const { data: product } = useSWR('/api/products/' + _id);

  return (
    <Sidebar title={product ? product.title : '•••'}>
      <div className={styles.variations}>
        {product ? product.variations.map((variation) => <VariationListItem key={variation._id} variation={variation} />) : <Loading />}
      </div>
    </Sidebar>
  );
}
