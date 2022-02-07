import users from '../../data/users.json';

export default function (req, res) {
  setTimeout(() => {
    res.json(users);
  }, 500);
}
