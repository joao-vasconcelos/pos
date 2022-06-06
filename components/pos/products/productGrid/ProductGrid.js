import ProductSlot from '../productSlot/ProductSlot';
import styles from './ProductsGrid.module.css';

import useSWR from 'swr';

import { useContext } from 'react';
import { GlobalContext } from '../../../../services/context';

export default function ProductsGrid() {
  const { data: device } = useSWR('/api/devices/A73HK2');

  const { currentFolder } = useContext(GlobalContext);

  const selectedFolderSlots = _.find(device.layout.folders, { _id: currentFolder._id });

  return (
    <div className={styles.container}>
      {selectedFolderSlots ? (
        selectedFolderSlots.slots.map(({ product }, index) => <ProductSlot key={index} product={product} />)
      ) : (
        <div>Select a folder</div>
      )}
    </div>
  );
}
