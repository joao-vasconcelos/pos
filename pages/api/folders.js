import folders from '../../data/folders.json';

export default async function getFolders(req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.statusCode = 200;
      res.json(folders);
      resolve();
    }, 3000);
  });
}
