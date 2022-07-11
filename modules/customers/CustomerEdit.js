import useSWR from 'swr';
import { styled } from '@stitches/react';

import { useContext, useState, useEffect } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';

import Pannel from '../../components/Pannel';
import Button from '../../components/Button';
import ButtonBar from '../../components/ButtonBar';

import { useForm, yupResolver } from '@mantine/form';
import { TextInput, LoadingOverlay, Switch } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Schema from '../../schemas/Customer';

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

  const form = useForm({
    schema: yupResolver(Schema),
    initialValues: {
      first_name: '',
      last_name: '',
      tax_region: '',
      tax_number: '',
      contact_email: '',
      send_invoices: false,
      reference: '',
      birthday: '',
    },
  });

  function handleCancel() {}
  function handleAdd() {}
  async function handleSave(values) {}

  return (
    <Pannel
      title={
        'Customers › ' +
        (form.values.first_name || form.values.last_name
          ? `${form.values.first_name} ${form.values.last_name}`
          : 'Novo Cliente')
      }
    >
      <form onSubmit={form.onSubmit(handleSave)}>
        <InputGrid>
          <TextInput label={'First Name'} placeholder={'Alberta'} {...form.getInputProps('first_name')} />
          <TextInput label={'Last Name'} placeholder={'Soares'} {...form.getInputProps('last_name')} />
          <DatePicker label={'Birthday'} placeholder={'Pick a date'} {...form.getInputProps('birthday')} />
          <TextInput label={'Reference'} placeholder={'PT'} {...form.getInputProps('reference')} />
          <Switch
            label='Send Invoices'
            checked={form.values.send_invoices}
            onChange={({ currentTarget }) => form.setFieldValue('send_invoices', currentTarget.checked)}
          />
          <TextInput label={'Tax Region'} placeholder={'PT'} maxLength={2} {...form.getInputProps('tax_region')} />
          <TextInput
            label={'Tax Number'}
            placeholder={'500 100 200'}
            maxLength={11}
            {...form.getInputProps('tax_number')}
          />
          <TextInput
            label={'Contact Email'}
            placeholder={'email@icloud.com'}
            {...form.getInputProps('contact_email')}
          />
        </InputGrid>
        <ButtonBar>
          <Button as={'button'} type={'submit'} color={'secondary'} onClick={handleSave}>
            Guardar Alterações
          </Button>
          <Button color={'danger'} onClick={handleCancel}>
            Descartar
          </Button>
        </ButtonBar>
      </form>
    </Pannel>
  );
}
