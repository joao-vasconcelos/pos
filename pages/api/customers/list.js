import database from '../../../services/database';
import Customer from '../../../models/Customer';

export default async function listCustomers(req, res) {
  database.connect();
  const customers = await Customer.find({});
  await res.status(200).json(customers);
}
