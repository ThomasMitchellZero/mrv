// Function for matching returned items with session invoices.

import cloneDeep from "lodash.clonedeep";
import disposSqueezer from "../Sections/Returns/functions/dispoSqueezer";

const CartInvoMatcher = (itemList, invoiceList) => {
  //The 4 derived states we are building.
  const modified_invoices = cloneDeep(invoiceList);
  const unmatched_items = cloneDeep(itemList);
  let matched_items = {};
  let refunds_by_tender = {};

  //loop through the Unmatched items.
  UM_itemsLoop: for (const itemNum of Object.keys(unmatched_items)) {
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
    invoicesLoop: for (const invoiceNum of Object.keys(modified_invoices)) {
      const thisInvoice = modified_invoices[invoiceNum];
      const thisInvoItem = thisInvoice.products[itemNum];

      // If this invoice doesn't contain this item, skip to next invoice.
      if (!thisInvoItem) continue;

      // A MatchBite reflects all units of THIS item matched from THIS invoice.
      let outMatchBite = {
        price: thisInvoItem.price,
        tax: thisInvoItem.tax,
        invoice: invoiceNum,
        disposition: {},
        totalPrice: 0,
        adjustedRefund: 0,
        totalTax: 0,
        totalAdjustments: 0,
      };

      // ΓΓΓΓ  Invoice Loop _ Step 1: Handle Dispos & Calculate Refund  ΓΓΓΓΓΓΓ

      //loop through cart item's dispositions and decrement Invoice item qty as product matches are found.
      disposLoop: for (const loopDispo of Object.keys(
        thisCartItem.disposition
      )) {
        //quantities being compared
        const dispo_qty = thisCartItem.disposition[loopDispo];
        const sold_Qty = thisInvoItem.quantity;

        // ΓΓΓΓ  Dispo Loop _ Step 1: Process Dispo Matches   ΓΓΓΓΓΓΓΓ

        //The matched quantity is the smaller of the Qtys
        const matchedQty = Math.min(dispo_qty, sold_Qty);

        // decrement our inputs by Matched Qty.
        thisInvoItem.quantity -= matchedQty;
        thisCartItem.disposition[loopDispo] -= matchedQty;
        thisCartItem.quantity -= matchedQty;

        // Add this dispo to output MatchBite and increment it by MatchedQty.
        outMatchBite.disposition[loopDispo] = matchedQty;

        // ΓΓΓΓ Dispo Loop_ Step 2: Process Cost Calculation Matches ΓΓΓΓΓΓΓΓ

        // Restock is zero unless specified on item.
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

        //Total paid for all units of this Item in this Invoice
        const dispoTotalPaid = thisInvoItem.price * matchedQty;

        //Don't apply restock fee to damaged items.
        let dispoAdjustment = Math.round(
          damagedCodes[loopDispo] ? 0 : dispoTotalPaid * itemRestockFee
        );

        // Reduce refund for these items by the Adjustment amount.
        const dispoAdjustedPaid = dispoTotalPaid - dispoAdjustment;

        // Increment all values in the object.
        outMatchBite.totalPrice += dispoTotalPaid;
        outMatchBite.adjustedRefund += dispoAdjustedPaid;
        outMatchBite.totalTax += thisInvoItem.tax * matchedQty;
        outMatchBite.totalAdjustments += dispoAdjustment;

        // Delete any zeroed-out properties
        if (thisCartItem.disposition[loopDispo] === 0) {
          // the current disposition
          delete thisCartItem.disposition[loopDispo];
        }

        if (thisInvoItem.quantity === 0) {
          // This item in this invoice
          delete thisInvoice.products[itemNum];
        }

        if (thisCartItem.quantity === 0) {
          // this item in Unmatched
          delete unmatched_items[itemNum];
        }

        // If 0 units of this item remain in this Invoice or Unmatched, stop.
        if (!thisInvoItem || !thisCartItem) break disposLoop;
      } // ∞∞∞∞∞∞∞∞ end of loop through item dispositions. ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

      // ΓΓΓΓ  Invoice Loop _ Step 2: Allocate Refund $ to Tender types ΓΓΓΓΓΓΓ

      const invoPayments = thisInvoice.invoiceDetails.payment;
      let unrefundedTotal = outMatchBite.adjustedRefund;

      // Loop through all payment types and assign unrefunded total.
      tenderTypeLoop: for (const thisTenderType of Object.keys(invoPayments)) {
        // Make sure this Invo tender type isn't being reduced past 0.
        const decrementAmount = Math.min(
          invoPayments[thisTenderType].paid,
          unrefundedTotal
        );
        // update $
        invoPayments[thisTenderType].paid -= decrementAmount;
        unrefundedTotal -= decrementAmount;


        const thisTenderLabel = invoPayments[thisTenderType].tenderLabel;

        // If this label doesn't exist in the refunds_by_tender{}...
        if (!refunds_by_tender[thisTenderLabel]) {
          // create it and set paid to 0
          refunds_by_tender[thisTenderLabel] = { paid: 0 };
        }

        refunds_by_tender[thisTenderLabel].paid += decrementAmount


        // if tender type is zeroed out, remove it from the invoice.
        if (invoPayments[thisTenderType].paid === 0) {
          delete invoPayments[thisTenderType];
        }

        // If all Refund $ are assigned to Tender types, skip to finalizing this MatchBite.
        if (unrefundedTotal === 0) {
          break tenderTypeLoop;
        }
      } // ∞∞∞∞∞∞∞∞ end of loop through payment types ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

      outMatchedItemObj.matchBitesArr.push(outMatchBite);

      // If there are 0 unmatched units of item, move on to next item.
      if (!unmatched_items[itemNum]) break invoicesLoop;
    } // ∞∞∞∞∞∞∞∞ end of loop through invoice keys ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

    // Only add itemObj to Matched if at least one match occurred.
    if (outMatchedItemObj.matchBitesArr.length > 0) {
      //add completed ItemNum and [all its MatchBites] to matched_items{}
      matched_items[itemNum] = outMatchedItemObj;
    }
  } // ∞∞∞∞∞∞∞∞ end of loop through unmatched items ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

  return {
    matched: matched_items,
    unmatched: unmatched_items,
    modified_invoices: modified_invoices,
    refunds_by_tender: refunds_by_tender,
  };
};

export default CartInvoMatcher;

/*




*/
