import _ from 'lodash';
import database from '../../../services/database';
import Transaction from '../../../models/Transaction';

export default async function transactions(req, res) {
  //
  // Connect to the Database
  database.connect();

  switch (req.method) {
    //
    case 'POST':
      const postResult = await postTransactionWith(req.body);
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
    //

    // Send response to the client
    return { status: 200, data: result };
  } else {
    // An Error Occurred
    return { status: 500, data: { message: 'An Error Occurred.' } };
  }
}
