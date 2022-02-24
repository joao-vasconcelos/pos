import ProductSlot from '../productSlot/ProductSlot';
import styles from './ProductsGrid.module.css';

import useSWR from 'swr';

import { useContext } from 'react';
import { GlobalContext } from '../../../services/context';

export default function ProductsGrid() {
  const { data: folders } = useSWR('/api/folders');

  const { currentFolder } = useContext(GlobalContext);

  const selectedFolderSlots = _.find(folders, { _id: currentFolder._id });

  return (
    <div className={styles.container}>
      {selectedFolderSlots ? (
        selectedFolderSlots.slots.map(({ position, product }) => <ProductSlot key={position} product={product} />)
      ) : (
        <div>Select a folder</div>
      )}
    </div>
  );
}
