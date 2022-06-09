import _, { last } from 'lodash';
import database from '../../../services/database';
import Transaction from '../../../models/Transaction';
import moment from 'moment';

export default async function transactions(req, res) {
  //
  // Connect to the Database
  database.connect();

  switch (req.method) {
    //
    case 'POST':
      const postResult = await postTransactionWith(JSON.parse(req.body));
      res.status(postResult.status).json(postResult.data);
      break;
    //
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

/* * */
/* REST: POST */
async function postTransactionWith(query) {
  // Create new document
  const newTransaction = Transaction(query);
  const result = await newTransaction.save();

  if (result) {
    // Document was updated or created

    // 1. Update stock in Apicbase (later)
    //

    // 2. Create invoice in Vendus

    const invoice = prepareInvoice(newTransaction);

    try {
      await fetch('https://www.vendus.pt/ws/v1.2/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(process.env.VENDUS_API_KEY).toString('base64'),
        },
        body: JSON.stringify(invoice),
      })
        .then((res) => {
          if (res.ok) return res.text();
          throw new Error('Something went wrong.');
        })
        .catch((err) => {
          console.log(err);
          throw new Error('Something went wrong.');
        });
    } catch (err) {
      return { status: 500, data: { message: 'An Error Occurred.' } };
    }

    // Send response to the client
    return { status: 200, data: result };
  } else {
    // An Error Occurred
    return { status: 500, data: { message: 'An Error Occurred.' } };
  }
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
  console.log(transaction.customer);
  if (transaction.customer.tax.number) {
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

  const firstName = customer.name && customer.name.first ? customer.name.first : '';
  const lastName = customer.name && customer.name.last ? customer.name.last : '';

  return {
    name: firstName + ' ' + lastName,
    country: customer.tax.country,
    fiscal_id: customer.tax.number,
    email: 'joao@chefpoint.pt',
    send_email: 'yes',
    address: '-',
  };
};
