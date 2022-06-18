import database from '../../../services/database';
import Customer from '../../../models/Customer';

export default async function customers(req, res) {
  //

  // 0. Refuse request if not POST
  if (req.method != 'POST') {
    await res.setHeader('Allow', ['POST']);
    await res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  // 1. Try to connect to the database
  try {
    await database.connect();
  } catch (err) {
    console.log(err);
    await res.status(500).json({ message: 'Database connection error.' });
    return;
  }

  // 2. Try to save a new document with req.body
  try {
    const data = JSON.parse(req.body);
    const newCustomer = await Customer(data).save();
    await res.status(201).json(newCustomer);
    return;
  } catch (err) {
    console.log(err);
    await res.status(500).json({ message: 'Customer creation error.' });
    return;
  }
}
