import database from '../../../services/database';
import Transaction from '../../../models/Transaction';

/* * */
/* GET ALL TRANSACTIONS */
/* Explanation needed. */
/* * */

export default async function listTransactions(req, res) {
  //

  // 0. Refuse request if not GET
  if (req.method != 'GET') {
    await res.setHeader('Allow', ['GET']);
    return await res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // 1. Try to connect to the database
  try {
    await database.connect();
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Database connection error.' });
  }

  // 2. Try to fetch all transactions from the database
  try {
    const allTransactions = await Transaction.find({ 'location._id': req.query.location_id });
    return await res.status(200).send(allTransactions);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot fetch transactions.' });
  }
}
