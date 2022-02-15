import styles from './CustomerSelector.module.css';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../utils/global-context';

import Pannel from '../../../common/pannel/Pannel';
import Button from '../../../common/button/Button';
import AddOnlyNIF from '../addOnlyNif/AddOnlyNIF';

import CustomersListRow from './customersList/customersListRow/CustomersListRow';
import Loading from '../../../loading/Loading';
import useSWR from 'swr';
import Icon from '../../../../utils/Icon';

export default function CustomerSelector() {
  //

  const { data: customers } = useSWR('/api/customers/list');

  const { currentOrder, overlay } = useContext(GlobalContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState();

  function handleSelect(clickedCustomer) {
    if (selectedCustomer && clickedCustomer.id == selectedCustomer.id) {
      setSelectedCustomer();
    } else {
      setSelectedCustomer(clickedCustomer);
    }
  }

  function handleSearchQueryChange({ target }) {
    setSearchQuery(target.value);

    if (target.value) {
      const searchResult = _.filter(customers, function (customer) {
        // Firt Name
        const firstName = customer.name.first ? customer.name.first.toLowerCase().includes(target.value) : false;

        // Last Name
        const lastName = customer.name.last ? customer.name.last.toLowerCase().includes(target.value) : false;

        // Email
        const email = customer.email ? customer.email.toLowerCase().includes(target.value) : false;

        // Tax ID
        const tax_id = customer.tax_id ? customer.tax_id.toString().toLowerCase().includes(target.value) : false;

        // Reference
        const reference = customer.reference ? customer.reference.toLowerCase().includes(target.value) : false;

        return firstName || lastName || email || tax_id || reference;
      });
      setFilteredCustomers(searchResult);
      setSelectedCustomer();
    } else {
      setFilteredCustomers(customers);
    }
  }

  function handleAddCustomer() {
    currentOrder.setCustomer(selectedCustomer);
    overlay.setComponent();
  }

  function handleAddOnlyNIF() {
    overlay.setComponent(<AddOnlyNIF />);
  }

  return (
    <Pannel title={'Procurar Cliente'}>
      <div className={styles.toolbarContainer}>
        <div className={styles.searchFieldContainer}>
          <div className={styles.searchFieldIcon}>
            <Icon name={'magnifyingglass'} />
          </div>
          <input
            className={styles.searchFieldInput}
            name={'searchQuery'}
            type={'text'}
            placeholder={'Procurar por Nome, NIF, etc…'}
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
        <div className={styles.addCustomerButton}>
          <Icon name={'plus'} />
        </div>
      </div>
      <div className={styles.listContainer}>
        {filteredCustomers ? (
          filteredCustomers.length ? (
            filteredCustomers.map((customer, index) => (
              <CustomersListRow key={index} customer={customer} onSelect={handleSelect} selectedCustomer={selectedCustomer} />
            ))
          ) : (
            <div className={styles.noResultsMessage}>Nenhum Resultado Encontrado</div>
          )
        ) : (
          <Loading />
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <Button label={'Associar Cliente'} type={selectedCustomer ? 'primary' : 'disabled'} action={handleAddCustomer} />
        <Button label={'Apenas NIF'} type={'secondary'} action={handleAddOnlyNIF} />
      </div>
    </Pannel>
  );
}
