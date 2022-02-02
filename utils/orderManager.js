import _ from 'lodash';

function addProductVariationToCurrentOrder(currentOrderItems, product, variation, qty = 1) {
  //
  const newItem = {
    id: Math.random,
    productTitle: product.title,
    variationTitle: variation.title,
    qty: qty,
    unitPrice: variation.price,
    lineTotal: qty * variation.price,
  };

  const isDuplicate = _.findIndex(currentOrderItems, (line) => {
    // Check if product and variation exists in the order already
    if (line.productTitle == product.title && line.variationTitle == variation.title) return true;
  });

  if (isDuplicate < 0) {
    // If it is not duplicate, then return the updated orderItems arrays
    return _.concat(currentOrderItems, newItem);
    //
  } else {
    // If it is duplicate, then only update the quantity and line total for the duplicate line
    let duplicateOrder = Array.from(currentOrderItems);
    duplicateOrder[isDuplicate].qty += qty;
    duplicateOrder[isDuplicate].lineTotal += newItem.lineTotal;
    return duplicateOrder;
  }
}

function removeItemFromCurrentOrder(currentOrderItems, item) {
  return _.pull(currentOrderItems, item);
}

function calculateOrderTotals(currentOrderItems, currentOrderDiscounts) {
  //
  // Subtotal
  let subtotal = 0;
  currentOrderItems.forEach((line) => {
    subtotal += line.lineTotal;
  });

  // Check discounts
  console.log('No discounts yet');
  let discounts = 1;

  // Calculate Final Amount
  let total = subtotal - discounts;
  if (total < 0) total = 0;

  return {
    subtotal,
    discounts,
    total,
  };
}

function checkIfDiscountApplies(currentOrderItems, discount) {
  //
  // Subtotal

  let applies = false;

  discount.rules.forEach((setOfProductsItMustContain) => {
    setOfProductsItMustContain.forEach((product) => {
      // check
    });
  });
}

export default {
  addProductVariationToCurrentOrder,
  removeItemFromCurrentOrder,
  calculateOrderTotals,
  checkIfDiscountApplies,
};
