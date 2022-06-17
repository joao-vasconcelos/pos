import database from '../../../services/database';
import Device from '../../../models/Device';
import Location from '../../../models/Location';
import User from '../../../models/User';
import Layout from '../../../models/Layout';
import Product from '../../../models/Product';
import Discount from '../../../models/Discount';
import CheckingAccount from '../../../models/CheckingAccount';

export default async function devices(req, res) {
  //
  // Connect to the Database
  database.connect();

  switch (req.method) {
    //
    case 'GET':
      const getResult = await getDeviceWith(req.query.code);
      await res.status(getResult.status).json(getResult.data);
      break;
    //
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

/* * */
/* REST: GET */
async function getDeviceWith(code) {
  // Fetch documents from the database that match the requested 'code'
  const foundDevices = await Device.find({ code: code })
    .populate({ path: 'location' })
    .populate({ path: 'users' })
    .populate({ path: 'layout', populate: { path: 'folders.slots.product' } })
    .populate({ path: 'discounts' })
    .populate({ path: 'checking_accounts' });

  if (foundDevices.length > 0) {
    // If document with code exists
    return { status: 200, data: foundDevices[0] };
  } else {
    // If document with code does not exist
    return { status: 404, data: { message: `Device with code: ${code} not found.` } };
  }
}
