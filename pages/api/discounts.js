import discounts from '../../data/discounts.json';

export default async function (req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.statusCode = 200;
      res.json(discounts);
      resolve();
    }, 3000);
  });
}
