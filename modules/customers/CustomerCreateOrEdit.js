import { styled } from '@stitches/react';

import { useContext, useState, useEffect, useRef } from 'react';
import { Appstate } from '../../context/Appstate';
import API from '../../services/API';

import Pannel from '../../components/Pannel';
import Button from '../../components/Button';
import ButtonBar from '../../components/ButtonBar';

import { useForm, yupResolver } from '@mantine/form';
import { TextInput, LoadingOverlay, Switch } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Schema from '../../schemas/Customer';
import CustomerList from './CustomerList';
import CustomerView from './CustomerView';

/* * */
/* CUSTOMER CREATE */
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

export default function CustomerCreateOrEdit({ customer }) {
  //

  const appstate = useContext(Appstate);

  const hasUpdatedFields = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm({
    schema: yupResolver(Schema),
    initialValues: {
      first_name: '',
      last_name: '',
      tax_region: 'PT',
      tax_number: '',
      contact_email: '',
      send_invoices: true,
      reference: '',
      birthday: '',
    },
  });

  useEffect(() => {
    if (!hasUpdatedFields.current && customer) {
      form.setValues({
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        tax_region: customer.tax_region || 'PT',
        tax_number: customer.tax_number || '',
        contact_email: customer.contact_email || '',
        send_invoices: customer.send_invoices,
        reference: customer.reference || '',
        birthday: customer.birthday ? new Date(customer.birthday) : '',
      });
      hasUpdatedFields.current = true;
    }
  }, [customer, form]);

  function handleCancel() {
    // If editing existing customer
    if (customer) appstate.setOverlay(<CustomerView customer_id={customer._id} />);
    // If creating a new customer
    else appstate.setOverlay(<CustomerList />);
  }

  async function handleSave(values) {
    try {
      setIsError(false);
      setIsLoading(true);
      if (customer) {
        console.log(customer);
        // Update existing customer
        await API({ service: 'customers', operation: 'edit', resourceId: customer._id, method: 'PUT', body: values });
        appstate.setOverlay(<CustomerView customer_id={customer._id} />);
      } else {
        // Create new customer
        const response = await API({ service: 'customers', operation: 'create', method: 'POST', body: values });
        appstate.setOverlay(<CustomerView customer_id={response._id} />);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSave)}>
      <Pannel
        title={
          form.values.first_name || form.values.last_name
            ? `${form.values.first_name} ${form.values.last_name}`
            : 'Novo Cliente'
        }
      >
        <LoadingOverlay visible={isLoading} />
        {isError && <ErrorNotice>{isError}</ErrorNotice>}
        <InputGrid>
          <TextInput placeholder={'Nome'} size={'xl'} {...form.getInputProps('first_name')} />
          <TextInput placeholder={'Apelido'} size={'xl'} {...form.getInputProps('last_name')} />
          <TextInput placeholder={'Nr. Cartão TP'} size={'xl'} {...form.getInputProps('reference')} />
          <DatePicker placeholder={'Data de Nascimento'} size={'xl'} {...form.getInputProps('birthday')} />
          <TextInput placeholder={'Região Fiscal'} maxLength={2} size={'xl'} {...form.getInputProps('tax_region')} />
          <TextInput
            placeholder={'Número de Contribuinte'}
            maxLength={11}
            size={'xl'}
            {...form.getInputProps('tax_number')}
          />
          <TextInput placeholder={'Email de Contacto'} size={'xl'} {...form.getInputProps('contact_email')} />
          <Switch
            label='Enviar Faturas por Email'
            size={'xl'}
            checked={form.values.send_invoices}
            onChange={({ currentTarget }) => form.setFieldValue('send_invoices', currentTarget.checked)}
          />
        </InputGrid>
        <ButtonBar>
          <Button as={'button'} type={'submit'} color={'secondary'}>
            Guardar Alterações
          </Button>
          <Button color={'danger'} onClick={handleCancel}>
            Descartar
          </Button>
        </ButtonBar>
      </Pannel>
    </form>
  );
}
