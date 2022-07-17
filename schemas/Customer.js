/* * * * * */
/* SCHEMA: CUSTOMER */
/* * */

/* * */
/* IMPORTS */
import * as yup from 'yup';

/* * */
/* Schema for YUP ["Customer"] Object */
export default yup.object({
  first_name: yup
    .string()
    .min(2, 'Primeiro Nome deve ter pelo menos ${min} caracteres')
    .max(30, 'Primeiro Nome não deve ter mais do que ${max} caracteres')
    .required('Primeiro Nome é obrigatório'),
  last_name: yup.string().max(30, 'Apelido não deve ter mais do que ${max} caracteres'),
  tax_region: yup
    .string()
    .matches(/^$|^[a-zA-Z]{2}$/, 'Região Fiscal são duas letras (ex: PT, NL)')
    .uppercase(),
  tax_number: yup
    .string()
    .matches(/^$|^[0-9]{9}$/, 'Número de Contribuinte são 9 números (ex: 125 321 978)')
    .transform((value) => value.replace(/\s+/g, '')),
  contact_email: yup.string().email(),
  send_invoices: yup.boolean().default(false),
  reference: yup.string().max(30, 'Nr. do Cartão TP não deve ter mais do que ${max} caracteres'),
  birthday: yup.string().ensure(),
});
