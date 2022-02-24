import database from '../../services/database';
import Discount from '../../models/Discount';

export default async function listDiscounts(req, res) {
  database.connect();
  const discounts = await Discount.find({});
  await res.status(200).json(discounts);
}
