const ReturnTotaler = (matchedItemsObj) => {

  const sampleMatchBite = {
    price: 0,
    tax: 0,
    invoice: 0,
    disposition: {},
    totalPrice: 0,
    totalTax: 0,
    totalAdjustments: 0,
  };

  let returnValuesObj = {
    refundTotal: 0,
    taxSum: 0,
    subtotal: 0,
    adjustments: 0,
  };

  for (const product of Object.values(matchedItemsObj)) {
    for (const bite of product.matchBitesArr){
        returnValuesObj.refundTotal += bite.totalPrice;
        returnValuesObj.taxSum += bite.totalTax;
        returnValuesObj.adjustments += bite.totalAdjustments;
        returnValuesObj.subtotal +=
          bite.totalPrice - (bite.totalAdjustments + bite.totalTax);
      }
  }

  return returnValuesObj;

};

export default ReturnTotaler;

/*




*/
