import useSWR from 'swr';
import { styled } from '@stitches/react';

import { useContext, useState, useEffect } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';

import Pannel from '../../components/Pannel';
import Button from '../../components/Button';
import ButtonBar from '../../components/ButtonBar';

import CustomerDetailInput from './CustomerDetailInput';

/* * */
/* CUSTOMER DETAIL */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const InputGrid = styled('div', {
  display: 'grid',
  placeItems: 'stretch',
  placeContent: 'stretch',
  gridTemplateColumns: '1fr 1fr',
  gap: '$md',
  marginBottom: '$md',
});

const ErrorNotice = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '$md',
  borderWidth: '$md',
  borderStyle: 'solid',
  padding: '$md',
  borderRadius: '$md',
  fontSize: '18px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
  backgroundColor: '$danger5',
  borderColor: '$danger6',
  color: '$gray0',
});

/* */
/* LOGIC */

export default function CustomerDetail({ customer_id }) {
  //

  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  const { data: customers, mutate } = useSWR('/api/customers/');

  const [customer, setCustomer] = useState();

  const [editMode, setEditMode] = useState(customer_id ? false : true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!editMode) {
      const c = customers.find((entries) => entries._id === (customer_id || customer._id));
      setCustomer(c);
    }
  }, [customer, customer_id, customers, editMode]);

  function handleAdd() {
    currentOrder.setCustomer(customer);
    appstate.setOverlay();
  }

  function handleEdit() {
    setEditMode(true);
  }

  function validateInputFields() {
    // Mandatory 'first_name'
    if (!customer?.first_name) throw new Error('O primeiro nome é obrigatório');
    // Validate 'contact_email'
    if (customer?.contact_email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(customer.contact_email)) throw new Error('O email é inválido');
    }
  }

  async function handleSave() {
    // Remove error from UI
    setErrorMessage();
    // Validate the fields before save
    try {
      validateInputFields();
    } catch (err) {
      // And display the error message
      setErrorMessage(err.message);
      return;
    }
    // Check if the current customer already has an _id
    // If yes, update it. Otherwise it needs to be created.
    if (customer._id) {
      // Try to update the current customer
      try {
        // Send the request to the API
        const response = await fetch(`/api/customers/${customer._id}/edit`, {
          method: 'PUT',
          body: JSON.stringify(customer),
        });
        // Parse the response to JSON
        const parsedResponse = await response.json();
        // Throw an error if the response is not OK
        if (!response.ok) throw new Error(parsedResponse.message);
        // Find the index of the updated customer in the original list...
        const indexOfUpdatedCustomer = customers.findIndex((entries) => entries._id === customer._id);
        // ...and replace it with the response from the server...
        customers[indexOfUpdatedCustomer] = customer;
        // ...and mutate the SWR list, until the next update.
        mutate(customers);
        // Update the orderCustomer if it is set
        if (currentOrder.hasCustomer) {
          currentOrder.setCustomer(); // Cycle to force state refresh
          currentOrder.setCustomer(customer);
        }
        // Revert UI back to view-mode
        setEditMode(false);
        //
      } catch (err) {
        console.log(err);
        setErrorMessage('Ocorreu um erro inesperado.');
      }
    } else {
      // Try to create the current customer
      try {
        // Send the request to the API
        const response = await fetch('/api/customers/create', {
          method: 'POST',
          body: JSON.stringify(customer),
        });
        // Parse the response to JSON
        const parsedResponse = await response.json();
        // Throw an error if the response is not OK
        console.log(parsedResponse);
        if (!response.ok) throw new Error(parsedResponse.message);
        // Update the current customer with the response from the API
        setCustomer(parsedResponse);
        // as well as the original SWR list.
        customers.push(parsedResponse);
        mutate(customers);
        // Revert UI back to view-mode
        setEditMode(false);
        //
      } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
      }
    }
  }

  function handleCancel() {
    setEditMode(false);
  }

  function handleRemove() {
    currentOrder.setCustomer();
    appstate.setOverlay();
  }

  return (
    <Pannel title={customer?.first_name || 'Novo Cliente'}>
      {errorMessage && <ErrorNotice>{errorMessage}</ErrorNotice>}
      <InputGrid>
        <CustomerDetailInput
          label={'Nome'}
          value={customer?.first_name}
          onChange={({ target }) => setCustomer({ ...customer, first_name: target.value })}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'Apelido'}
          value={customer?.last_name}
          onChange={({ target }) => setCustomer({ ...customer, last_name: target.value })}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'Região Fiscal'}
          value={customer?.tax_region}
          onChange={({ target }) => {
            const string = target.value
              .substring(0, 2)
              .toUpperCase()
              .match(/^[A-Za-z]+$/); // Only alphabet letters
            setCustomer({ ...customer, tax_region: string ? string[0] : '' });
          }}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'NIF'}
          value={customer?.tax_number}
          onChange={({ target }) => {
            const string = target.value.substring(0, 9).match(/^[0-9]*$/); // Only numbers
            setCustomer({ ...customer, tax_number: string ? string[0] : '' });
          }}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'Email'}
          value={customer?.contact_email}
          type={'email'}
          onChange={({ target }) =>
            setCustomer({
              ...customer,
              contact_email: target.value.toLowerCase() || '',
            })
          }
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'Data de Nascimento'}
          value={customer?.birthday}
          type={'date'}
          onChange={({ target }) => setCustomer({ ...customer, birthday: target.value })}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'Ref Cartão #'}
          value={customer?.reference}
          onChange={({ target }) => setCustomer({ ...customer, reference: target.value })}
          editMode={editMode}
        />
      </InputGrid>
      <ButtonBar>
        {editMode ? (
          <>
            <Button color={'secondary'} onClick={handleSave}>
              Guardar Alterações
            </Button>
            <Button color={'danger'} onClick={handleCancel}>
              Descartar
            </Button>
          </>
        ) : (
          <>
            {currentOrder.customer ? (
              <Button color={'danger'} onClick={handleRemove}>
                Desassociar
              </Button>
            ) : (
              <Button onClick={handleAdd}>Associar este Cliente</Button>
            )}
            <Button color={'secondary'} onClick={handleEdit}>
              Editar
            </Button>
          </>
        )}
      </ButtonBar>
    </Pannel>
  );
}
