import folders from '../../data/folders.json';

export default function getFolders(req, res) {
  setTimeout(() => {
    res.json(folders);
  }, 500);
}
