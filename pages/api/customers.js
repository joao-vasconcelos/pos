import customers from '../../data/customers.json';

export default async function (req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.statusCode = 200;
      res.json(customers);
      resolve();
    }, 3000);
  });
}
