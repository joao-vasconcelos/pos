/* * */
/* TRANSACTION MANAGER */
/* Explanation needed. */
/* * */

async function create(appstate, order) {
  //

  // 1. Build the Transaction object
  const transaction = {
    timestamp: new Date().toISOString(),
    device: null,
    location: null,
    layout: null,
    customer: null,
    items: [],
    discounts: [],
    payment: null,
    user: null,
  };

  // 1.1. Device
  transaction.device = {
    device_id: appstate.device._id,
    title: appstate.device.title,
  };

  // 1.2. Location
  transaction.location = {
    location_id: appstate.device.location._id,
    title: appstate.device.location.title,
    apicbase: {
      outlet_id: appstate.device.location.apicbase.outlet_id,
    },
  };

  // 1.3. Layout
  transaction.layout = {
    layout_id: appstate.device.layout._id,
    title: appstate.device.layout.title,
  };

  // 1.4. Customer
  if (order.hasCustomer) {
    if (order.customer.isOnlyNif) {
      transaction.customer = {
        tax: {
          country: order.customer.tax.country,
          number: order.customer.tax.number,
        },
      };
    } else {
      transaction.customer = {
        customer_id: order.customer._id,
        name: {
          first: order.customer.name.first,
          last: order.customer.name.last,
        },
        reference: order.customer.reference,
        tax: {
          country: order.customer.tax.country,
          number: order.customer.tax.number,
        },
      };
    }
  }

  // 1.5. Items
  for (const item of order.items) {
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

  // 1.6. Discounts
  for (const discount of order.discounts) {
    transaction.discounts.push({
      title: discount.title,
      subtitle: discount.subtitle,
      amount: discount.amount,
    });
  }

  // 1.7. Payment
  switch (order.payment.method.value) {
    // Payment › Card or Cash
    case 'card' || 'cash':
      transaction.payment = {
        is_paid: true,
        method: {
          value: order.payment.method.value,
          label: order.payment.method.label,
        },
      };
      break;
    // Payment › Checking Account
    case 'checking_account':
      transaction.payment = {
        is_paid: false,
        method: {
          value: order.payment.method.value,
          label: order.payment.method.label,
        },
        checking_account: {
          checking_account_id: order.payment.checking_account._id,
          title: order.payment.checking_account.title,
          client: {
            name: order.payment.checking_account.client.name,
            tax: {
              country: order.payment.checking_account.client.tax.country,
              number: order.payment.checking_account.client.tax.number,
            },
          },
        },
      };
      break;
    // Fail because transaction is malformed
    default:
      throw new Error('Transaction has no valid payment.');
  }

  // 1.8. User
  transaction.user = {
    user_id: appstate.currentUser._id,
    name: appstate.currentUser.name,
  };

  // 2. Now that the Transaction object is built,
  //    send it to the API for processing and storage.
  try {
    console.log(transaction);
    // return;
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
