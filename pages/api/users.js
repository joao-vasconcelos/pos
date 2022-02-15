import users from '../../data/users.json';

export default async function listUsers(req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.statusCode = 200;
      res.json(users);
      resolve();
    }, 3000);
  });
}
