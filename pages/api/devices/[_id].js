import database from '../../../services/database';
import Device from '../../../models/Device';

export default async function devices(req, res) {
  //
  // Connect to the Database
  database.connect();

  switch (req.method) {
    //
    case 'GET':
      const getResult = await getDeviceWith(req.query._id);
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
async function getDeviceWith(_id) {
  // Fetch documents from the database that match the requested '_id'
  const foundDevices = await Device.find({ _id: _id })
    .populate({ path: 'location' })
    .populate({ path: 'users' })
    .populate({
      path: 'layout',
      populate: { path: 'folders.slots.product' },
    });

  if (foundDevices.length > 0) {
    // If document with _id exists
    return { status: 200, data: foundDevices[0] };
  } else {
    // If document with _id does not exist
    return { status: 404, data: { message: `Device with _id: ${_id} not found.` } };
  }
}
