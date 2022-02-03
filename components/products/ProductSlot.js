import styles from './ProductSlot.module.css';

import Image from 'next/image';

import { useContext } from 'react';
import { GlobalContext } from '../../utils/global-context';
import VariationSelector from './variationSelector/VariationSelector';

import productImage from '/public/media/products/cafe.jpg';

export default function ProductSlot({ product }) {
  //
  const { overlay, currentOrder } = useContext(GlobalContext);

  // If no product is present
  if (!product) {
    return <div className={styles.emptySlot}></div>;
  }

  // ------------------

  function handleClick() {
    if (product.variations.length == 1) {
      // If product only has 1 variation, add it to the order imediatly
      currentOrder.add(product, product.variations[0]);
    } else {
      // Else, show the variations screen
      overlay.setComponent(<VariationSelector product={product} />);
    }
  }

  // If product is set
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.image}>
        <Image src={productImage} placeholder='blur' layout={'fill'} objectFit={'cover'} />
      </div>
      <div className={styles.label}>{product.title}</div>
    </div>
  );
}
