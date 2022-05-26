import ProductSlot from '../productSlot/ProductSlot';
import styles from './ProductsGrid.module.css';

import useSWR from 'swr';

import { useContext } from 'react';
import { GlobalContext } from '../../../../services/context';

export default function ProductsGrid() {
  const { data: device } = useSWR('/api/devices/628ec0e43eed7e89de4e0156');

  const { currentFolder } = useContext(GlobalContext);

  const selectedFolderSlots = _.find(device.layout.folders, { _id: currentFolder._id });

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
