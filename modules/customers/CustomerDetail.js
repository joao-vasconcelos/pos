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
  gap: '15px',
  marginBottom: '15px',
});

/* */
/* LOGIC */

export default function CustomerDetail({ customer }) {
  //

  const { data: customers, mutate } = useSWR('/api/customers/*');

  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  const [editMode, setEditMode] = useState(false);

  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerTaxCountry, setCustomerTaxCountry] = useState('');
  const [customerTaxNumber, setCustomerTaxNumber] = useState('');
  const [customerReference, setCustomerReference] = useState('');
  const [customerBirthday, setCustomerBirthday] = useState('');

  useEffect(() => {
    const c = customers.find((entries) => entries._id == customer._id);
    setCustomerFirstName(c?.name?.first);
    setCustomerLastName(c?.name?.last);
    setCustomerEmail(c?.email);
    setCustomerTaxCountry(c?.tax?.country);
    setCustomerTaxNumber(c?.tax?.number);
    setCustomerReference(c?.reference);
    setCustomerBirthday(c?.birthday);
  }, [customers, customer._id, editMode]);

  function handleAdd() {
    currentOrder.setCustomer(customer);
    appstate.setOverlay();
  }

  function handleEdit() {
    setEditMode(true);
  }

  async function handleSave() {
    // Build the object
    const updatedCustomer = {
      ...customer,
      name: {
        first: customerFirstName,
        last: customerLastName,
      },
      email: customerEmail,
      tax: {
        country: customerTaxCountry,
        number: customerTaxNumber,
      },
      reference: customerReference,
      birthday: customerBirthday,
    };

    await fetch('/api/customers/' + customer._id, {
      method: 'PUT',
      body: JSON.stringify(updatedCustomer),
    })
      .then((res) => {
        if (res.ok) {
          if (currentOrder.hasCustomer) {
            currentOrder.setCustomer();
            currentOrder.setCustomer(updatedCustomer);
          }
          const indexOfUpdatedCustomer = customers.findIndex((entries) => entries._id == customer._id);
          customers[indexOfUpdatedCustomer] = updatedCustomer;
          mutate(customers);
          setEditMode(false);
        } else throw new Error('Something went wrong but positive.');
      })
      .catch((err) => {
        console.log(err);
        throw new Error('Something went wrong.');
      });
  }

  function handleCancel() {
    setEditMode(false);
  }

  function handleRemove() {
    currentOrder.setCustomer();
    appstate.setOverlay();
  }

  return (
    <Pannel title={customer.name.first}>
      <InputGrid>
        <CustomerDetailInput label={'Nome'} value={customerFirstName} onChange={setCustomerFirstName} editMode={editMode} />
        <CustomerDetailInput label={'Apelido'} value={customerLastName} onChange={setCustomerLastName} editMode={editMode} />
        <CustomerDetailInput label={'Email'} value={customerEmail} onChange={setCustomerEmail} editMode={editMode} />
        <CustomerDetailInput label={'Região Fiscal'} value={customerTaxCountry} onChange={setCustomerTaxCountry} editMode={editMode} />
        <CustomerDetailInput label={'NIF'} value={customerTaxNumber} onChange={setCustomerTaxNumber} editMode={editMode} />
        <CustomerDetailInput label={'Data de Nascimento'} value={customerBirthday} onChange={setCustomerBirthday} editMode={editMode} />
        <CustomerDetailInput label={'Ref Cartão #'} value={customerReference} onChange={setCustomerReference} editMode={editMode} />
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
