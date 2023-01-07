// Function for matching returned items with session invoices.

import cloneDeep from "lodash.clonedeep";
import disposSqueezer from "./dispoSqueezer";

const CartInvoMatcher = (itemList, invoiceList) => {
  //The three derives states we are building.
  const modified_invoices = cloneDeep(invoiceList);
  const unmatched_items = cloneDeep(itemList);
  let matched_items = {};

  //loop through the Unmatched items.
  for (const itemNum of Object.keys(unmatched_items)) {
    const thisCartItem = unmatched_items[itemNum];

    // If there is an UnwantedTotal, add it to the item's disposition.
    const { dsQty: dispoTotal } = disposSqueezer(thisCartItem.disposition);
    const unwantedTotal = thisCartItem.quantity - dispoTotal;
    if (unwantedTotal > 0) thisCartItem.disposition.unwanted = unwantedTotal;

    // Each Matched item will contain an array of matchBites.  Each matchBite will contain dispos, price info, and the Invoice it matched from.
    let outMatchedItemObj = {
      specCategories: { ...thisCartItem.specialCategories },
      matchBitesArr: [],
    };

    //loop through the Unmatched invoices ///////////////
    for (const invoiceNum of Object.keys(modified_invoices)) {
      const thisInvoice = modified_invoices[invoiceNum];
      const thisInvoItem = thisInvoice.products[itemNum];

      // If there are 0 unmatched units of item, move on to next item.
      if (!thisCartItem) break;
      // If this invoice doesn't contain this item, skip to next invoice.
      if (!thisInvoItem) continue;

      let thisMatchBite = {
        price: thisInvoItem.price,
        tax: thisInvoItem.tax,
        invoice: invoiceNum,
        disposition: {},
        refundPerPayment: {},
        totalPrice: 0,
        totalReturn: 0,
        totalTax: 0,
        totalAdjustments: 0,
      };

      //loop through cart item's dispositions and subtract from Invoice item qty as product matches are found.
      for (const loopDispo of Object.keys(thisCartItem.disposition)) {
        // check that item hasn't previously been deleted from invoice.
        if (!modified_invoices[invoiceNum].products[itemNum]) break;

        //quantities being compared
        const dispo_qty = thisCartItem.disposition[loopDispo];
        const sold_Qty = thisInvoItem.quantity;

        //The matched quantity is the smaller of the Qtys
        const matchedQty = Math.min(dispo_qty, sold_Qty);

        // subtract matchedQty from this InvoiceItem and the current dispo qty
        thisInvoItem.quantity -= matchedQty;
        thisCartItem.disposition[loopDispo] -= matchedQty;

        // if either property is empty, delete it.
        if (thisInvoItem.quantity === 0) {
          delete thisInvoice.products[itemNum];
        }
        if (thisCartItem.disposition[loopDispo] === 0) {
          delete thisCartItem.disposition[loopDispo];
        }

        // add dispo:matchedQty to the thisMatchBite's disposition obj
        thisMatchBite.disposition[loopDispo] = matchedQty;
        // decrement the TotalUnmatched
        thisCartItem.quantity -= matchedQty;

        //// COST CALCULATIONS ////

        // Restock is always zero unless otherwise specified.
        const itemRestockFee = thisCartItem.restockFee ?? 0;

        // Restock fee is waived for these dispositions.
        const damagedCodes = {
          doesntWork: true,
          broken: true,
          unpackaged: true,
          used: true,
          missingParts: true,
          cosmetic: true,
          warranty: true,
        };

        //calculate total costs
        const dispoTotalPaid = thisInvoItem.price * matchedQty;

        //Don't apply restock fee to damaged items.
        let dispoAdjustment = Math.round(
          damagedCodes[loopDispo] ? 0 : dispoTotalPaid * itemRestockFee
        );

        const dispoAdjustedPaid = dispoTotalPaid - dispoAdjustment;

        // Increment all values in the object.
        thisMatchBite.totalPrice += dispoTotalPaid;
        thisMatchBite.totalReturn += dispoAdjustedPaid;
        thisMatchBite.totalTax += thisInvoItem.tax * matchedQty;
        thisMatchBite.totalAdjustments += dispoAdjustment;

        // if there are no remaining umatched units...
        if (thisCartItem.quantity === 0) {
          // delete item from Unmatched
          delete unmatched_items[itemNum];
          // stop looping through the dispos, no more items to match.
          break;
        }
      } // ∞∞∞∞∞∞∞∞ end of loop through item dispositions. ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

      

      outMatchedItemObj.matchBitesArr.push(thisMatchBite);
    } // ∞∞∞∞∞∞∞∞ end of loop through invoice keys ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

    // add the completed itemNum:[outMatchedItemObj] to {matched_items}
    if (outMatchedItemObj.matchBitesArr.length > 0) {
      matched_items[itemNum] = outMatchedItemObj;
    }
  } // ∞∞∞∞∞∞∞∞ end of loop through unmatched items ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

  return {
    matched: matched_items,
    unmatched: unmatched_items,
    modified_invoices: modified_invoices,
  };
};

export default CartInvoMatcher;

/*

//// MODIFY PAYMENTS IN INVOICE ////

        // loop through all this invoice's payment types.
        const invoPayments = thisInvoice.invoiceDetails.payment;
        
        for (const thisPaymentType of Object.keys(invoPayments)) {
          // Make sure this Invo payment type isn't being reduced past 0.
          const decrementAmount = Math.min(
            thisPaymentType.paid,
            //Adjusted amt, since that's what's actually being refunded.
            totalAdjustedReturn
          );
          // Decrement this payment type
          invoPayments[thisPaymentType].paid -= decrementAmount;

          // get existing value of this payment type in the MatchBite.
          const oldPaymentVal =
            thisMatchBite.refundPerPayment[thisPaymentType] ?? 0;
          // add new value to it.
          thisMatchBite.refundPerPayment[thisPaymentType] =
            oldPaymentVal + decrementAmount;

          // if this payment is zeroed out, remove it from the invoice.
          if (invoPayments[thisPaymentType].paid === 0){
            delete invoPayments[thisPaymentType]
          }
        } // ∞∞∞∞∞∞∞∞ end of loop through payment types ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞  


*/
