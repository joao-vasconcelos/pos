import _ from 'lodash';
import database from '../../../services/database';
import Folder from '../../../models/Folder';

export default async function folders(req, res) {
  //
  // Connect to the Database
  database.connect();

  switch (req.method) {
    //
    case 'GET':
      let getResult;
      if (req.query._id == '*') getResult = await getAllFolders();
      else getResult = await getFolderWith(req.query._id);
      await res.status(getResult.status).json(getResult.data);
      break;
    //
    case 'PUT':
      const putResult = await putFolderWith(req.query._id, req.query);
      res.status(putResult.status).json(putResult.data);
      break;
    //
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

/* * */
/* REST: GET */
async function getAllFolders() {
  // Fetch all documents from the database and sort them
  const allFolders = await Folder.find({}).populate('slots.product');
  return { status: 200, data: _.sortBy(allFolders, 'position') };
}

/* * */
/* REST: GET */
async function getFolderWith(_id) {
  // Fetch documents from the database that match the requested '_id'
  const foundFolder = await Folder.find({ _id: _id });

  if (foundFolder.length > 0) {
    // If document with _id exists
    return { status: 200, data: foundFolder[0] };
  } else {
    // If document with _id does not exist
    return { status: 404, data: { message: `Folder with _id: ${_id} not found.` } };
  }
}

/* * */
/* REST: PUT */
async function putFolderWith(_id, query) {
  // Update document that matches the requested '_id'
  const updatedFolder = await Folder.findOneAndUpdate({ _id: _id }, query, {
    new: true, // Return the updated document
    upsert: true, // If no document is found, create it
  });

  if (updatedFolder.length > 0) {
    // Document was updated or created
    return { status: 200, data: updatedFolder };
  } else {
    // An Error Occurred
    return { status: 500, data: { message: 'An Error Occurred.' } };
  }
}
