import styles from './CustomerSelector.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../utils/global-context';

import Pannel from '../../../common/pannel/Pannel';
import Button from '../../../common/button/Button';
import AddOnlyNIF from '../addOnlyNif/AddOnlyNIF';

export default function CustomerSelector() {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  function handleSelect(clickedVariation) {}

  function handleAddCustomer() {
    alert('added');
    // currentOrder.add(product, selectedVariation);
    // overlay.setComponent();
  }

  function handleAddOnlyNIF() {
    // currentOrder.add(product, selectedVariation);
    overlay.setComponent(<AddOnlyNIF />);
  }

  return (
    <Pannel title={'Search Customer'}>
      <p className={styles.productDescription}></p>
      <div className={styles.variationGrid}></div>
      <div className={styles.buttonsContainer}>
        <Button label={'Associar Cliente'} type={'primary'} action={handleAddCustomer} />
        <Button label={'Apenas NIF'} type={'secondary'} action={handleAddOnlyNIF} />
      </div>
    </Pannel>
  );
}
