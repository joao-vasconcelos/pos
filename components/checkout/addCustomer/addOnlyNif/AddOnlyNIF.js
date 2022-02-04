import styles from './AddOnlyNIF.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../utils/global-context';

import Pannel from '../../../common/pannel/Pannel';
import Button from '../../../common/button/Button';

export default function AddOnlyNIF() {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  function handleSelect(clickedVariation) {}

  function handleAddCustomer() {
    alert('added');
    // currentOrder.add(product, selectedVariation);
    // overlay.setComponent();
  }

  return (
    <Pannel title={'Add Only NIF'}>
      <p className={styles.productDescription}>Only NIF Screen</p>
      <Button label={'Adicionar NIF'} type={'primary'} />
    </Pannel>
  );
}
