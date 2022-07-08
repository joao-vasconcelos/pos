/**
 * ADD PRODUCT VARIATION TO CURRENT ORDER
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
    product: product,
    variation: variation,
    qty: qty,
    lineTotal: qty * variation.price,
  };

  // Check if this combination of product and variation already exists in the array
  const indexOfDuplicateItem = currentOrderItems.findIndex((item) => {
    // If the product is already present
    const hasProduct = item.product._id == newOrderItem.product._id;
    // If the variation is already present
    const hasVariation = item.variation._id == newOrderItem.variation._id;
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
 * REMOVE ITEM FROM CURRENT ORDER
 * Remove an item from the currentOrderItems array.
 * @param  {Array}  currentOrderItems The array to be modified
 * @param  {Object} orderItem The object to be removed from the array
 * @return {Array}  The new currentOrderItems array without the item
 */
function removeItemFromCurrentOrder(currentOrderItems, orderItem) {
  // Check if this combination of product and variation already exists in the array
  const indexOfItemToRemove = currentOrderItems.findIndex((item) => {
    // If the product is present
    const hasProduct = item.product._id == orderItem.product._id;
    // If the variation is present
    const hasVariation = item.variation._id == orderItem.variation._id;
    // If both are present
    return hasProduct && hasVariation;
  });
  // Remove at index
  currentOrderItems.splice(indexOfItemToRemove, 1);
  // Return updated array
  return currentOrderItems;
}

/**
 * CALCULATE ORDER TOTALS
 * Calculate the totals for the provided currentOrderItems array.
 * @param  {Array}  currentOrderItems The array of items to be added together
 * @param  {Array}  orderItem The array of discounts to be subtracted from the total sum
 * @return {Object} The several components for the order totals
 */
function calculateOrderTotals(currentOrderItems, currentOrderDiscounts) {
  //
  // Subtotal
  let subtotal = 0;
  currentOrderItems.forEach((item) => {
    subtotal += item.lineTotal;
  });

  // Check discounts
  let discounts = 0;
  currentOrderDiscounts.forEach((discount) => {
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

/**
 * GET VALID DISCOUNTS FOR CURRENT ORDER
 * Find out which discounts are valid based on the currentOrderItems array.
 * @param  {Array} currentOrderItems The array of items
 * @param  {Array} availableDiscounts The discounts available to this device
 * @return {Array} The validDiscounts array
 */
function getValidDiscountsForCurrentOrder(currentOrderItems, availableDiscounts) {
  //
  // Expand the currentOrderItems array to include each item per element.
  // For example, if there are two items with the same 'variation._id',
  // then it will result in an expanded array with two elements, while in the original
  // currentOrderItems array it was just one element with 'qty' equal to two.
  let expandedOrderItems = [];
  currentOrderItems.forEach((line) => {
    for (let index = 0; index < line.qty; index++) {
      expandedOrderItems.push(line);
    }
  });

  // Define an array to save the valid discounts outside of the loops
  let validDiscounts = [];

  // Iterate through each orderItem to evaluate if there is
  // any valid discount. Why is it necessary to go through all the items?
  for (const orderItem of expandedOrderItems) {
    // Inside each order item, evaluate each available discount
    availableDiscounts.forEach((discount) => {
      // If the discount has any rules
      if (discount.rules.length) {
        // Create a copy of the expandedOrderItems array.
        // Everytime a variationId match is found, the matching item is deleted
        // from this copy, so as to not double count the item between discounts.
        let copyOfExpandedOrderItems = [...expandedOrderItems];
        // Initiate an array to store the match results of each rule group
        let matchResultsForEachRuleGroup = [];
        // Iterate through each rule group
        for (const ruleGroup of discount.rules) {
          // Set a flag to save a positive variationId match
          let hasVariationIdMatch = false;
          // Iterate through each variationId from this ruleGroup
          for (const variationId of ruleGroup) {
            // Check if the current variationId matches
            // any of the items currently in the order.
            const indexOfMatchedItem = copyOfExpandedOrderItems.findIndex((item) => {
              return item.variation._id === variationId;
            });
            // If there is a match,
            if (indexOfMatchedItem > -1) {
              // Set the flag to true
              hasVariationIdMatch = true;
              // Remove the matched item from the copy array
              copyOfExpandedOrderItems.splice(indexOfMatchedItem, 1);
              // Get out of this loop, because only 1 match is needed
              // inside each rule group for the discount to take effect.
              break;
            }
          }
          // Save the result of this rule group to the array.
          matchResultsForEachRuleGroup.push(hasVariationIdMatch);
        }

        // The discount is only valid if there is at least one variationId match
        // in each rule group. If every element of the array is true, then the discount
        // is valid; otherwise there is a product still missing.
        let isValidDiscount = matchResultsForEachRuleGroup.every((ruleGroupResult) => {
          // Return true if every element of the array is true. Else return false.
          return ruleGroupResult;
        });

        // If the discount is valid,
        if (isValidDiscount) {
          // Set the expandedOrderItems array to be equal to the copy array.
          // The items consumed in this discount do not become available
          // to the next one because they were deleted from the copy array.
          expandedOrderItems = copyOfExpandedOrderItems;
          // Save this discount to the validDiscounts array
          // so it can be applied to the current order.
          validDiscounts.push(discount);
        }
      }
    });
  }
  // Return the validDiscounts array to the caller
  return validDiscounts;
}

const orderManager = {
  addProductVariationToCurrentOrder,
  removeItemFromCurrentOrder,
  calculateOrderTotals,
  getValidDiscountsForCurrentOrder,
};

export default orderManager;
