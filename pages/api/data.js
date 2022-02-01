import projects from '../../utils/data.json';

export default function (req, res) {
  setTimeout(() => {
    res.json(projects);
  }, 500);
}
