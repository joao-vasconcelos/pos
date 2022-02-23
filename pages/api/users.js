import database from '../../services/database';
import User from '../../models/User';

export default async function listUsers(req, res) {
  database.connect();
  const users = await User.find({});
  await res.status(200).json(users);
}
