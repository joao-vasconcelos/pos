import styles from './VariationSelector.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../utils/global-context';

import Pannel from '../../common/pannel/Pannel';
import VariationButton from '../variationButton/VariationButton';
import Button from '../../common/button/Button';

export default function VariationSelector({ product }) {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  const [selectedVariation, setSelectedVariation] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  let qty = selectedQuantity;

  function handleSelect(clickedVariation) {
    setSelectedVariation(clickedVariation);
  }

  function handleQtyDecrease() {
    if (qty < 2) {
      qty = 1;
      setSelectedQuantity(1);
    } else {
      qty--;
      setSelectedQuantity(qty--);
    }
  }

  function handleQtyIncrease() {
    qty++;
    setSelectedQuantity(qty++);
  }

  function handleAdd() {
    currentOrder.add(product, selectedVariation, qty);
    overlay.setComponent();
  }

  return (
    <Pannel title={product.title}>
      <div className={styles.container}>
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

        <div className={styles.qtyContainer}>
          <div className={styles.qtyMinus} onClick={handleQtyDecrease}>
            -
          </div>
          <div className={styles.qtyDisplay}>{qty}</div>
          <div className={styles.qtyPlus} onClick={handleQtyIncrease}>
            +
          </div>
        </div>

        <Button label={'Adicionar'} type={selectedVariation ? 'primary' : 'disabled'} action={handleAdd} />
      </div>
    </Pannel>
  );
}
