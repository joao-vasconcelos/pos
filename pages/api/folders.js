import _ from 'lodash';
import database from '../../services/database';
import Folder from '../../models/Folder';
import Product from '../../models/Product';

export default async function listFolders(req, res) {
  //
  // Connect to the Database
  database.connect();

  // Fetch all folders from the database
  const folders = await Folder.find().populate('slots.product');

  // Sort folders by their position value
  const sortedFolders = _.sortBy(folders, 'position');

  // Return sorted folders to the client
  await res.status(200).json(sortedFolders);
}
