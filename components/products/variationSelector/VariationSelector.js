import styles from './VariationSelector.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../utils/global-context';
import orderManager from '../../../utils/orderManager';

import Pannel from '../../common/pannel/Pannel';
import VariationButton from '../variationButton/VariationButton';
import Button from '../../common/button/Button';

export default function VariationSelector({ product }) {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  const [selectedVariation, setSelectedVariation] = useState();

  function handleSelect(clickedVariation) {
    setSelectedVariation(clickedVariation);
  }

  function handleAdd() {
    currentOrder.add(product, selectedVariation);
    overlay.setComponent();
  }

  return (
    <Pannel title={product.title}>
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.variationGrid}>
        {product.variations
          ? product.variations.map((variation) => (
              <VariationButton
                key={variation.id}
                variation={variation}
                selectedVariation={selectedVariation}
                setSelectedVariation={setSelectedVariation}
                onSelect={handleSelect}
              />
            ))
          : 'no variations'}
      </div>
      <Button label={'Adicionar'} type={selectedVariation ? 'primary' : 'disabled'} action={handleAdd} />
    </Pannel>
  );
}
