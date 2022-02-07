import discounts from '../../data/discounts.json';

export default function getDiscounts(req, res) {
  setTimeout(() => {
    res.json(discounts);
  }, 500);
}
