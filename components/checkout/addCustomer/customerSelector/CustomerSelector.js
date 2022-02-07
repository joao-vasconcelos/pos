import styles from './CustomerSelector.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../utils/global-context';

import Pannel from '../../../common/pannel/Pannel';
import Button from '../../../common/button/Button';
import AddOnlyNIF from '../addOnlyNif/AddOnlyNIF';

import CustomersListToolbar from './CustomersListToolbar/CustomersListToolbar';
import CustomersList from './customersList/CustomersList';

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
    overlay.setComponent(<AddOnlyNIF />);
  }

  return (
    <Pannel title={'Search Customer'}>
      <CustomersListToolbar />
      <CustomersList />
      <div className={styles.buttonsContainer}>
        <Button label={'Associar Cliente'} type={'primary'} action={handleAddCustomer} />
        <Button label={'Apenas NIF'} type={'secondary'} action={handleAddOnlyNIF} />
      </div>
    </Pannel>
  );
}
