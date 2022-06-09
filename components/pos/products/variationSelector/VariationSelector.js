import styles from './VariationSelector.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../services/context';

import Pannel from '../../../../theme/modules/Pannel';
import Button from '../../../../theme/components/Button';

import VariationButton from '../variationButton/VariationButton';

export default function VariationSelector({ product, orderItem = null }) {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  const [selectedVariation, setSelectedVariation] = useState(orderItem ? orderItem.variation : null);
  const [selectedQuantity, setSelectedQuantity] = useState(orderItem ? orderItem.qty : 1);

  let qty = selectedQuantity;

  function handleSelect(clickedVariation) {
    setSelectedVariation(clickedVariation);
  }

  function handleQtyDecrease() {
    if (qty < 2) {
      qty = 1;
      setSelectedQuantity(qty);
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

  function handleChange() {
    currentOrder.change(orderItem, selectedVariation, qty);
    overlay.setComponent();
  }

  function handleRemove() {
    currentOrder.remove(orderItem);
    overlay.setComponent();
  }

  return (
    <Pannel title={product.title}>
      <div className={styles.container}>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.variationGrid}>
          {product.variations
            ? product.variations.map((variation) => (
                <VariationButton key={variation._id} variation={variation} selectedVariation={selectedVariation} onSelect={handleSelect} />
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

        {orderItem ? (
          <div className={styles.buttonsContainer}>
            <Button onClick={handleChange}>Atualizar</Button>
            <Button color={'danger'} onClick={handleRemove}>
              Remover
            </Button>
          </div>
        ) : (
          <Button disabled={!selectedVariation} onClick={handleAdd}>
            Adicionar
          </Button>
        )}
      </div>
    </Pannel>
  );
}
