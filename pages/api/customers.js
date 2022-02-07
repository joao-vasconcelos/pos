import customers from '../../data/customers.json';

export default function (req, res) {
  setTimeout(() => {
    res.json(customers);
  }, 500);
}
