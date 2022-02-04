import styles from './AddOnlyNIF.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../utils/global-context';

import Pannel from '../../../common/pannel/Pannel';
import Button from '../../../common/button/Button';

export default function AddOnlyNIF() {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  function handleSelect(clickedVariation) {}

  function handleAddNIF(event) {
    event.preventDefault();

    alert(event.target.nif.value);
    // currentOrder.add(product, selectedVariation);
    // overlay.setComponent();
  }

  return (
    <Pannel title={'Add Only NIF'}>
      <form onSubmit={handleAddNIF}>
        <input className={styles.nifInput} id={'nif'} name={'nif'} type={'text'} minLength={9} maxLength={9} required />
        <Button label={'Adicionar NIF'} type={'primary'} />
      </form>
    </Pannel>
  );
}
