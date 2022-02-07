import users from '../../data/users.json';

export default function getUsers(req, res) {
  setTimeout(() => {
    res.json(users);
  }, 500);
}
