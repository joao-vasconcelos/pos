import _ from 'lodash';

async function createTransaction(items, customer, discounts, payment, location) {
  //

  console.log(customer);

  const transaction = {
    timestamp: new Date().toISOString(),
    location: location,
    customer: customer,
    items: [],
    discounts: [],
  };

  for (const item of items) {
    transaction.items.push({
      product_id: item.product._id,
      product_image: item.product.image,
      product_title: item.product.title,
      variation_id: item.variation._id,
      variation_title: item.variation.title,
      price: item.variation.price,
      vat_id: 'INT',
      vat_percentage: item.variation.tax,
      qty: item.qty,
      apicbase: {
        recipe_id: '',
      },
    });
  }

  for (const discount of discounts) {
    transaction.discounts.push({
      title: discount.title,
      subtitle: discount.subtitle,
      amount: discount.amount,
    });
  }

  await fetch('/api/transactions/new', {
    method: 'POST',
    body: JSON.stringify(transaction),
  })
    .then((res) => {
      if (res.ok) return res.text();
      throw new Error('Something went wrong.');
    })
    .catch((err) => {
      console.log(err);
      throw new Error('Something went wrong.');
    });

  // Send the transaction to the api
}

const transactionManager = {
  createTransaction,
};

export default transactionManager;
