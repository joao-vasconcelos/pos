import database from '../../../services/database';
import Transaction from '../../../models/Transaction';
import Device from '../../../models/Device';
import CheckingAccount from '../../../models/CheckingAccount';
import moment from 'moment';

export default async function transactions(req, res) {
  //

  // 0. Refuse request if not POST
  if (req.method != 'POST') {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  // 1. Try to connect to the database
  try {
    database.connect();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Database connection error.' });
    return;
  }

  // 2. Parse request body into JSON
  const data = JSON.parse(req.body);

  // 3. Verify validity of Device Code
  try {
    const foundDevices = await Device.find({ _id: data?.device?.device_id });
    if (!foundDevices.length) throw new Error('No valid devices found.');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
    return;
  }

  // 4. Update stock in Apicbase
  // later...

  // 5. Define gateways for the next actions
  let shouldCreateInvoice;
  let shouldSaveToCheckingAccount;

  // 6. Check payment method specificities
  switch (data.payment?.method.value) {
    case 'card' || 'cash':
      shouldCreateInvoice = true;
      shouldSaveToCheckingAccount = false;
      break;

    case 'checking_account':
      shouldCreateInvoice = false;
      shouldSaveToCheckingAccount = true;
      break;

    default:
      console.log('Invalid Payment Method. Dumping req.body:');
      console.log(data);
      res.status(500).json({ message: 'Invalid payment method.' });
      return;
  }

  if (shouldCreateInvoice) {
    // 7. Create an invoice in Vendus
    try {
      // 7.1. Format transaction into an invoice
      const preparedInvoice = prepareInvoice(data);
      // 7.2. Perform the HTTP request
      const response = await fetch('https://www.vendus.pt/ws/v1.2/documents', {
        method: 'POST',
        body: JSON.stringify(preparedInvoice),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(process.env.VENDUS_API_KEY).toString('base64'),
        },
      });
      // 7.3. Parse the response into JSON
      const invoice = await response.json();
      // 7.4. Check status of response
      if (response.status != 201) throw new Error(invoice.errors[0]?.message); // This is how Vendus API sends errors
      // 7.5. If response is valid, update request data with new details
      data.invoice = {
        id: invoice.id,
        type: invoice.type,
        number: invoice.number,
        date: invoice.date,
        system_time: invoice.system_time,
        local_time: invoice.local_time,
        amount_gross: invoice.amount_gross,
        amount_net: invoice.amount_net,
        hash: invoice.hash,
      };
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
      return;
    }
  }

  if (shouldSaveToCheckingAccount) {
    // 8. Save to the provided checking account
  }

  // 9. Try to save a new document with req.body
  try {
    await Transaction(data).save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Transaction creation error.' });
    return;
  }

  // 10. If we're here it's because everything worked.
  res.status(201).json({ message: 'Transaction saved.' });
  return;
}

/* * */
/* This function returns a new invoice object from the provided transaction, */
/* formated according to the Vendus API requirements. */
const prepareInvoice = (transaction) => {
  let invoice = {
    // If true, only fiscally invalid invoices will be created
    mode: 'tests',
    // To which store should this invoice be attributed
    register_id: process.env.VENDUS_REGISTER_ID,
    // The type of document to emit
    type: 'FT',
    // The date of the transaction
    date: moment(transaction.timestamp).format('YYYY[-]MM[-]DD'),
    // Prepare final invoice items details
    items: setInvoiceItems(transaction.items),
    // Setup invoice discounts
    discount_amount: setInvoiceDiscounts(transaction.discounts),
    // Set payment method so a receipt is issued
    payments: [{ id: process.env.VENDUS_PAYMENT_ID }],
  };

  // If transaction has customer NIF, add it to invoice
  if (transaction?.customer?.tax?.number) {
    invoice.client = setInvoiceClient(transaction.customer);
  }

  return invoice;
};

/* * */
/* This function sets the new invoice item details, */
/* according to the provided items array of a transaction. */
const setInvoiceItems = (line_items) => {
  const items = [];
  // Prepare each item according to Vendus API
  for (const line_item of line_items) {
    items.push({
      reference: line_item.variation_id.substring(0, 5),
      title: line_item.product_title + ' - ' + line_item.variation_title,
      qty: line_item.qty,
      gross_price: line_item.price,
      tax_id: line_item.vat_id,
    });
  }
  // Return prepared items array to the caller.
  return items;
};

/* * */
/* This function calculates the total amount of discounts for this invoice, */
/* according to the provided discounts array of a transaction. */
const setInvoiceDiscounts = (discounts) => {
  let discount_amount = 0;
  // Loop through all the discounts and sum the total amount
  for (const discount of discounts) {
    discount_amount += discount.amount;
  }
  // Return the total value of discount
  return discount_amount;
};

/* * */
/* This function sets the new invoice client details, */
/* according to the provided customer value of a transaction. */
/* This includes Fiscal ID, Name and Email, as well as the option */
/* to send digital invoices to the customer if not in test mode. */
const setInvoiceClient = (customer) => {
  //
  console.log(customer);

  const firstName = customer?.name && customer?.name?.first ? customer?.name?.first : '';
  const lastName = customer?.name && customer?.name?.last ? customer?.name?.last : '';

  return {
    name: firstName + ' ' + lastName,
    country: customer?.tax?.country,
    fiscal_id: customer?.tax?.number,
    email: 'joao@chefpoint.pt',
    send_email: 'yes',
    address: '-',
  };
};
