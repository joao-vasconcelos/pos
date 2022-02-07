import discounts from '../../data/discounts.json';

export default function (req, res) {
  setTimeout(() => {
    res.json(discounts);
  }, 500);
}
