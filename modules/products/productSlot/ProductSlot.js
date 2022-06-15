import styles from './ProductSlot.module.css';

import Image from 'next/image';

import { useContext } from 'react';
import { Appstate } from '../../../context/Appstate';
import { CurrentOrder } from '../../../context/CurrentOrder';
import VariationSelector from '../variationSelector/VariationSelector';

import placeholder from '/public/media/products/placeholder.jpg';

export default function ProductSlot({ product }) {
  //
  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  // If no product is present
  if (!product) {
    return <div className={styles.emptySlot}></div>;
  }

  const productImageLoader = ({ src, width, quality }) => {
    return '/media/products/' + src;
  };

  function handleClick() {
    if (product.variations.length == 1) {
      // If product only has 1 variation, add it to the order imediatly
      currentOrder.addItem(product, product.variations[0], 1);
    } else {
      // Else, show the variations screen
      appstate.setOverlay(<VariationSelector product={product} />);
    }
  }

  // If product is set
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.image}>
        <Image
          loader={productImageLoader}
          src={product.image}
          priority={true}
          layout={'fill'}
          objectFit={'cover'}
          alt={product.title}
          // placeholder={'blur'}
          // blurDataURL={'/media/products/placeholder.jpg'}
        />
      </div>
      <div className={styles.label}>{product.short_title ? product.short_title : product.title}</div>
    </div>
  );
}
