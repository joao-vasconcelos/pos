import _ from 'lodash';

// function removeItemFromCurrentOrder(currentOrderItems, item) {
//   const indexOfItem = currentOrderItems.indexOf(item);
//   return currentOrderItems.splice(indexOfItem, 1);
// }

/**
 * Add a product variation object to the provided orderItems array.
 * @param  {Array}  currentOrderItems The array to be modified
 * @param  {Object} product The product where the variation to be added belongs
 * @param  {Object} variation The variation to be added to the array
 * @return {Array}  The new currentOrderItems array with the new variation
 */
function addProductVariationToCurrentOrder(currentOrderItems, product, variation, qty) {
  //
  // Combine the product and variation into the orderItem format
  const newOrderItem = {
    // Product info
    product_id: product._id,
    product_title: product.title,
    // Variation info
    variation_id: variation._id,
    variation_title: variation.title,
    variation_price: variation.price,
    // Order item info
    qty: qty,
    lineTotal: qty * variation.price,
    // Might be removed
    /**/ product: product,
    /**/ variation: variation,
  };

  // Check if this combination of product and variation already exists in the array
  const indexOfDuplicateItem = currentOrderItems.findIndex((item) => {
    // If the product is already present
    const hasProduct = item.product_id == newOrderItem.product_id;
    // If the variation is already present
    const hasVariation = item.variation_id == newOrderItem.variation_id;
    // If both are present
    return hasProduct && hasVariation;
  });

  // If the product is not a duplicate, then index will be -1
  if (indexOfDuplicateItem < 0) {
    // If it is not duplicate, then push the newOrderItem to the array and return it
    currentOrderItems.push(newOrderItem);
    return currentOrderItems;
    //
  } else {
    // If it is duplicate, then only update the quantity and lineTotal for the duplicate line
    const copyOfCurrentOrderItems = [...currentOrderItems];
    copyOfCurrentOrderItems[indexOfDuplicateItem].qty += newOrderItem.qty;
    copyOfCurrentOrderItems[indexOfDuplicateItem].lineTotal += newOrderItem.lineTotal;
    return copyOfCurrentOrderItems;
  }
}

/**
 * !!!! THIS SHOULD BE REVISED LAST !!!!
 * Add a product variation object to the provided orderItems array.
 * @param  {Array}  currentOrderItems The orderItems array to be modified
 * @param  {Object} product The product where the variation to be added belongs
 * @param  {Object} variation The variation to be added to the array
 * @return {Array}  The new orderItems array with the new variation
 */
function updateProductVariationOfCurrentOrder(currentOrderItems, orderItemToChange, newVariation, newQty) {
  //

  const orderItemInArray = _.findIndex(currentOrderItems, (item) => {
    // Check if product and variation exists in the order already
    if (item.product._id == orderItemToChange.product._id && item.variation._id == orderItemToChange.variation._id) return true;
  });

  let updatedOrder = Array.from(currentOrderItems);
  updatedOrder[orderItemInArray].variation = newVariation;
  updatedOrder[orderItemInArray].qty = newQty;
  updatedOrder[orderItemInArray].lineTotal = newQty * newVariation.price;

  // AFTER CHANGING THE VARIATION OF A PRODUCT, IT MIGHT BE DUPLICATED IN THE ORDER ALREADY.
  // THIS FUNCTION IS TO COMBINE BOTH ORDER ITEMS INTO JUST ONE (SUM OF QUANTITY AND LINE TOTAL)
  // const duplicateItemInCurrentOrder = _.filter(
  //   _.uniq(
  //     _.map(currentOrderItems, function (item) {
  //       if (
  //         _.filter(currentOrderItems, (item) => {
  //           // Check if product and variation exists in the order already
  //           if (item.product._id == orderItemToChange.product._id && item.variation._id == orderItemToChange.variation._id) return true;
  //         }).length > 1
  //       ) {
  //         return item;
  //       }

  //       return false;
  //     })
  //   ),
  //   function (value) {
  //     return value;
  //   }
  // );

  // console.log(duplicateItemInCurrentOrder);

  // if (duplicateItemInCurrentOrder.length) {
  //   duplicateItemInCurrentOrder.forEach((duplicate) => {});
  // }

  return updatedOrder;
}

/**
 * Remove an item from the currentOrderItems array.
 * @param  {Array}  currentOrderItems The array to be modified
 * @param  {Object} orderItem The object to be removed from the array
 * @return {Array}  The new currentOrderItems array without the item
 */
function removeItemFromCurrentOrder(currentOrderItems, orderItem) {
  // Check if this combination of product and variation already exists in the array
  const indexOfItemToRemove = currentOrderItems.findIndex((item) => {
    // If the product is present
    const hasProduct = item.product_id == orderItem.product_id;
    // If the variation is present
    const hasVariation = item.variation_id == orderItem.variation_id;
    // If both are present
    return hasProduct && hasVariation;
  });
  // Remove at index
  currentOrderItems.splice(indexOfItemToRemove, 1);
  // Return updated array
  return currentOrderItems;
}

/**
 * Calculate the totals for the provided currentOrderItems array.
 * @param  {Array}  currentOrderItems The array of items to be added together
 * @param  {Array}  orderItem The array of discounts to be subtracted from the total sum
 * @return {Object} The several components for the order totals
 */
function calculateOrderTotals(currentOrderItems, currentOrderDiscounts) {
  //
  // Subtotal
  let subtotal = 0;
  currentOrderItems.forEach((line) => {
    subtotal += line.lineTotal;
  });

  // Check discounts
  let discounts = 0;
  // console.log(currentOrderDiscounts);
  currentOrderDiscounts.forEach((discount) => {
    // console.log(discount.amount);
    discounts += discount.amount;
  });

  // Calculate Final Amount
  let total = subtotal - discounts;
  if (total < 0) total = 0;

  return {
    subtotal,
    discounts,
    total,
  };
}

function getValidDiscountsForCurrentOrder(currentOrderItems, discounts) {
  //

  let expandedOrderItems = [];
  currentOrderItems.forEach((line) => {
    for (let index = 0; index < line.qty; index++) {
      expandedOrderItems.push(line);
    }
  });

  let validDiscounts = [];

  let loop = expandedOrderItems.length + 1;

  while (loop) {
    discounts.forEach((discount) => {
      if (discount.rules.length) {
        //
        let testResultsForEachANDRule = [];

        discount.rules.forEach((setOfProductVariationsThisOrderMustContain) => {
          let testResultsForEachORRule = [];
          setOfProductVariationsThisOrderMustContain.forEach((variationId) => {
            //
            // Check if the current variationId matches any of the order items
            const result = _.find(expandedOrderItems, (item) => {
              // console.log('item.variation._id', item.variation._id);
              // console.log('variationId', variationId);
              return item.variation._id == variationId;
            });

            testResultsForEachORRule.push(result);
          });
          testResultsForEachANDRule.push(testResultsForEachORRule);
        });

        // Return true if every element of array is true
        let discountApplies = testResultsForEachANDRule.every((ANDrule) => {
          return ANDrule.some((ORrule) => {
            return ORrule;
          });
        });

        if (discountApplies) {
          testResultsForEachANDRule.forEach((ANDrule) => {
            // Compact remove all falsy value from the array, so we get only the elements that matched order items
            // Only remove one of the order elements. If an OR rule has 3 ids, we just want to remove one of them,
            // even though the 3 might all be present in the order
            const index = _.indexOf(expandedOrderItems, _.compact(ANDrule)[0]);
            if (index > -1) expandedOrderItems.splice(index, 1); // 2nd parameter means remove one item only
          });
          validDiscounts.push(discount);
        }
        //
      }
    });

    loop--;
  }

  return validDiscounts;
}

const orderManager = {
  addProductVariationToCurrentOrder,
  updateProductVariationOfCurrentOrder,
  removeItemFromCurrentOrder,
  calculateOrderTotals,
  getValidDiscountsForCurrentOrder,
};

export default orderManager;
