import _ from 'lodash';

/* * */
/* TRANSACTION MANAGER */
/* Explanation needed. */
/* * */

async function create(items, customer, discounts, payment, device) {
  //

  // 1. Build the Transaction object

  // 1.1. Some items can be read right away.
  const transaction = {
    timestamp: new Date().toISOString(),
    device: device,
    customer: customer,
    items: [],
    discounts: [],
  };

  // 1.1. For items, loop through each one
  //      and format it according to the model.
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

  // 1.3. For discounts, also loop through them
  //      and format each according to the model.
  for (const discount of discounts) {
    transaction.discounts.push({
      title: discount.title,
      subtitle: discount.subtitle,
      amount: discount.amount,
    });
  }

  // 2. Now that the Transaction object is built,
  //    send it to the API for processing and storage.
  try {
    const res = await fetch('/api/transactions/new', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
    const parsedResponse = await res.json();
    console.log(parsedResponse);
    if (!res.ok) throw new Error(parsedResponse.message);
    else return parsedResponse;
  } catch (err) {
    console.log('here start');
    console.log(err);
    console.log('here end');
    throw new Error(err);
  }

  //
}

const transactionManager = {
  create,
};

export default transactionManager;
