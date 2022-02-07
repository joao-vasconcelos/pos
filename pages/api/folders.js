import folders from '../../data/folders.json';

export default function (req, res) {
  setTimeout(() => {
    res.json(folders);
  }, 500);
}
