import ProductSlot from '../productSlot/ProductSlot';
import styles from './ProductsGrid.module.css';

import { useContext } from 'react';
import { Appstate } from '../../../context/Appstate';

export default function ProductsGrid() {
  const appstate = useContext(Appstate);

  return (
    <div className={styles.container}>
      {appstate.hasCurrentFolder ? (
        appstate.currentFolder.slots.map(({ product }, index) => <ProductSlot key={index} product={product} />)
      ) : (
        <div>Select a folder</div>
      )}
    </div>
  );
}
