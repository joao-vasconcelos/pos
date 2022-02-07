import customers from '../../data/customers.json';

export default function getCustomers(req, res) {
  setTimeout(() => {
    res.json(customers);
  }, 500);
}
