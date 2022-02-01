import projects from '../../data.json';

export default function (req, res) {
  setTimeout(() => {
    res.json(projects);
  }, 500);
}
