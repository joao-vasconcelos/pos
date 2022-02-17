import discounts from '../../data/discounts.json';

export default async function listDiscounts(req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.statusCode = 200;
      res.json(discounts);
      resolve();
    }, 500);
  });
}
