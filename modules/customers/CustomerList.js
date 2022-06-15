import useSWR from 'swr';
import { styled } from '@stitches/react';

import { useContext, useState } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';

import { GoPlus, GoSearch } from 'react-icons/go';

import Pannel from '../../components/Pannel';
import Animation from '../../components/Animation';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import ButtonBar from '../../components/ButtonBar';
import AddOnlyNIF from './AssociateOnlyNIF';

import CustomersListRow from './CustomerListRow';
import Icon from '../../components/Icon';

/* * */
/* CUSTOMER LIST */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Toolbar = styled('div', {
  display: 'grid',
  gridTemplateColumns: '10fr 1fr',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  gap: '$md',
  width: '100%',
});

const SearchBar = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%',
});

const SearchBarIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$md',
  borderWidth: '$md',
  borderStyle: 'solid',
  borderColor: '$gray7',
  borderRightWidth: '0',
  fontSize: '30px',
  color: '$gray9',
  aspectRatio: '9/8',
  borderRadius: '$md',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: '$gray3',
});

const SearchBarTextField = styled(TextField, {
  margin: '0',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

const ListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$sm',
  height: '450px',
  overflow: 'scroll',
  position: 'relative',
  margin: '$md -$md',
  padding: '$md',
  borderTopWidth: '$md',
  borderTopStyle: 'solid',
  borderTopColor: '$gray7',
  borderBottomWidth: '$md',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray7',
});

const NoResultsMessage = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  width: '100%',
  height: '100%',
  fontSize: '30px',
  fontWeight: '$regular',
  color: '$gray7',
});

/* */
/* LOGIC */

export default function CustomerList() {
  //
  const { data: customers } = useSWR('/api/customers/*');

  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState();

  function handleSelect(clickedCustomer) {
    if (selectedCustomer && clickedCustomer._id == selectedCustomer._id) {
      setSelectedCustomer();
    } else {
      setSelectedCustomer(clickedCustomer);
    }
  }

  const handleSearchQueryChange = ({ target }) => {
    //
    const query = target.value.toLowerCase();

    setSearchQuery(query);

    if (query) {
      const searchResult = customers.filter((customer) => {
        const firstName = customer.name.first ? customer.name.first.toLowerCase().includes(query) : false;
        const lastName = customer.name.last ? customer.name.last.toLowerCase().includes(query) : false;
        const email = customer.email ? customer.email.toLowerCase().includes(query) : false;
        const tax_id = customer.tax.number ? customer.tax.number.toString().toLowerCase().includes(query) : false;
        const reference = customer.reference ? customer.reference.toLowerCase().includes(query) : false;
        // Return true if any field contains query value
        return firstName || lastName || email || tax_id || reference;
      });
      setFilteredCustomers(searchResult);
      setSelectedCustomer();
    } else {
      setFilteredCustomers(customers);
    }
  };

  function handleAddCustomer() {
    currentOrder.setCustomer(selectedCustomer);
    appstate.setOverlay();
  }

  function handleAddOnlyNIF() {
    appstate.setOverlay(<AddOnlyNIF />);
  }

  /* */
  /* RENDER */

  return (
    <Pannel title={'Procurar Cliente'}>
      <Toolbar>
        <SearchBar>
          <SearchBarIcon>
            <GoSearch />
          </SearchBarIcon>
          <SearchBarTextField
            name={'searchQuery'}
            type={'text'}
            placeholder={'Procurar por Nome, NIF, etc…'}
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </SearchBar>
        <Icon color={'secondary'}>
          <GoPlus />
        </Icon>
      </Toolbar>
      {/*  */}
      <ListContainer>
        {filteredCustomers ? (
          filteredCustomers.length ? (
            filteredCustomers.map((customer) => (
              <CustomersListRow key={customer._id} customer={customer} onSelect={handleSelect} selectedCustomer={selectedCustomer} />
            ))
          ) : (
            <NoResultsMessage>Nenhum Resultado Encontrado</NoResultsMessage>
          )
        ) : (
          <Animation name={'loading-dots'} />
        )}
      </ListContainer>
      <ButtonBar>
        <Button disabled={!selectedCustomer} onClick={handleAddCustomer}>
          Associar Cliente
        </Button>
        <Button color={'secondary'} onClick={handleAddOnlyNIF}>
          Apenas NIF
        </Button>
      </ButtonBar>
    </Pannel>
  );
}
