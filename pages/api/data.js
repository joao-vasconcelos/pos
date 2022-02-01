import posConfiguration from '../../data.json';

export default function (req, res) {
  setTimeout(() => {
    res.json(posConfiguration);
  }, 500);
}
