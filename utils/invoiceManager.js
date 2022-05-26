import _ from 'lodash';

function createInvoice(items, customer, payment) {
  //

  // Prepare the invoice details
  // const invoice = prepareInvoice(transaction);

  // console.log(invoice);
  console.log(items);
  console.log(customer);
}

/* * */
/* This function returns a new invoice object from the provided transaction, */
/* formated according to the Vendus API requirements. */
const prepareInvoice = (transaction) => {
  let invoice = {
    // If true, only fiscally invalid invoices will be created
    mode: 'tests',
    // To which store should this invoice be attributed
    register_id: 55569502,
    // The date of the transaction
    date: moment(transaction.closed_at).format('YYYY[-]MM[-]DD'),
    // Prepare final invoice items details
    items: setInvoiceItems(transaction.line_items),
    // Set payment method so a receipt is issued
    payments: [{ id: config.get('settings.payment-id') }],
  };

  // If transaction has customer NIF, add it to invoice
  if (transaction.customer.fiscal_id) {
    invoice.client = setInvoiceClient(transaction.customer);
  }

  return invoice;
};

const invoiceManager = {
  createInvoice,
};

export default invoiceManager;
