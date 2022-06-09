import styles from './AddOnlyNIF.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../services/context';

import Pannel from '../../../common/pannel/container/Pannel';
import Button from '../../../../theme/components/Button';

export default function AddOnlyNIF() {
  //
  const { currentOrder, overlay } = useContext(GlobalContext);

  function handleRemoveNIF(event) {
    event.preventDefault();
    currentOrder.setCustomer();
    overlay.setComponent();
  }

  function handleAddNIF(event) {
    event.preventDefault();

    if (event.target.nifRegion.value.length > 0 && event.target.nifRegion.value < 2) return;
    if (event.target.nifNumber.value.length < 9) return;

    const nifRegion = event.target.nifRegion.value || 'PT';
    const nifNumber = event.target.nifNumber.value;

    currentOrder.setCustomer({
      onlyNif: true,
      tax: { country: nifRegion, number: nifNumber },
    });

    overlay.setComponent();
  }

  return (
    <Pannel title={'Add Only NIF'}>
      <form className={styles.formContainer} onSubmit={handleAddNIF}>
        <div className={styles.inputsContainer}>
          <input
            className={styles.nifRegion}
            name={'nifRegion'}
            type={'text'}
            minLength={2}
            maxLength={2}
            defaultValue={currentOrder.customer ? currentOrder.customer.tax.country : ''}
            placeholder={'PT'}
          />
          <input
            className={styles.nifNumber}
            name={'nifNumber'}
            type={'number'}
            maxLength={9}
            placeholder={'_________'}
            required
            defaultValue={currentOrder.customer ? currentOrder.customer.tax.number : ''}
            onInput={({ target }) => (target.value = target.value.slice(0, target.maxLength))}
          />
        </div>
        {currentOrder.customer ? (
          <div className={styles.buttonsContainer}>
            <Button>Atualizar NIF</Button>
            <Button color={'danger'} onClick={handleRemoveNIF}>
              Remover
            </Button>
          </div>
        ) : (
          <Button>Adicionar NIF</Button>
        )}
      </form>
    </Pannel>
  );
}
