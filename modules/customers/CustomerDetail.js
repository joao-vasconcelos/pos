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

  const { data: customers, mutate } = useSWR('/api/customers/*');

  const [customer, setCustomer] = useState();

  const [editMode, setEditMode] = useState(customer_id ? false : true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!editMode) {
      const c = customers.find((entries) => entries._id == (customer_id || customer._id));
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

  async function handleSave() {
    // Remove error from UI
    setIsError(false);
    // Check if the current customer already has an _id
    // If yes, update it. Otherwise it needs to be created.
    if (customer._id) {
      // Try to update the current customer
      try {
        // Send the request to the API
        const response = await fetch('/api/customers/' + customer._id, {
          method: 'PUT',
          body: JSON.stringify(customer),
        });
        // Parse the response to JSON
        const parsedResponse = await response.json();
        // Throw an error if the response is not OK
        if (!response.ok) throw new Error(parsedResponse.message);
        // Find the index of the updated customer in the original list...
        const indexOfUpdatedCustomer = customers.findIndex((entries) => entries._id == customer._id);
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
        setIsError(true);
      }
    } else {
      // Try to create the current customer
      try {
        // Send the request to the API
        const response = await fetch('/api/customers/new', {
          method: 'POST',
          body: JSON.stringify(customer),
        });
        // Parse the response to JSON
        const parsedResponse = await response.json();
        // Throw an error if the response is not OK
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
        console.log(err);
        setIsError(true);
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
    <Pannel title={customer?.first_name || 'Untitled'}>
      {isError && <ErrorNotice>Ocorreu um erro - tente novamente</ErrorNotice>}
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
          label={'Email'}
          value={customer?.email}
          onChange={({ target }) => setCustomer({ ...customer, email: target.value })}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'Região Fiscal'}
          value={customer?.tax_country}
          onChange={({ target }) => setCustomer({ ...customer, tax_country: target.value })}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'NIF'}
          value={customer?.tax_number}
          onChange={({ target }) => setCustomer({ ...customer, tax_number: target.value })}
          editMode={editMode}
        />
        <CustomerDetailInput
          label={'Data de Nascimento'}
          value={customer?.birthday}
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
