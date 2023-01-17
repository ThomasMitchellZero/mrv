// Function for matching returned items with session invoices.

import cloneDeep from "lodash.clonedeep";
import disposSqueezer from "./dispoSqueezer";
import tenderizer from "./tenderizer";

const ReturnsMatchMaker = (itemList, invoiceList) => {
  //The 5 derived states we are building.
  const modified_invoices = cloneDeep(invoiceList);
  const unmatched_items = cloneDeep(itemList);
  let matched_items = {};
  let refunds_by_tender = {};
  let refund_money = {
    refundTotal: 0,
    taxSum: 0,
    subtotal: 0,
    adjustments: 0,
  };

  UM_itemsLoop: for (const itemNum of Object.keys(unmatched_items)) {
    const thisCartItem = unmatched_items[itemNum];

    // If there is an UnwantedTotal, add it to the item's disposition.
    const { dsQty: dispoTotal } = disposSqueezer(thisCartItem.disposition);
    const unwantedTotal = thisCartItem.quantity - dispoTotal;
    if (unwantedTotal > 0) thisCartItem.disposition.unwanted = unwantedTotal;


    invoicesLoop: for (const invoiceNum of Object.keys(modified_invoices)) {
      const thisInvoice = modified_invoices[invoiceNum];
      const thisInvoItem = thisInvoice.products[itemNum];

      // If this invoice doesn't contain this item, skip to next invoice.
      if (!thisInvoItem) continue;

      // will hold total Adjust Refund, used to populate refunds_by_tender
      let toRefund_thisInvoItem = 0;

      // ΓΓΓΓ  Invoice Loop _ Step 1: Handle Dispos & Calculate Refund  ΓΓΓΓΓΓΓ
      disposLoop: for (const loopDispo of Object.keys(
        thisCartItem.disposition
      )) {
        // Routes to quantities being compared
        const dispo_qty = thisCartItem.disposition[loopDispo];
        const sold_Qty = thisInvoItem.quantity;

        // ΓΓΓΓ Dispo Loop Step 1: Process Dispo Matches  ΓΓΓΓΓΓΓΓ

        //The matched quantity is the smaller of the Qtys
        const matchedQty = Math.min(dispo_qty, sold_Qty);

        // decrement our inputs by Matched Qty.
        thisInvoItem.quantity -= matchedQty;
        thisCartItem.disposition[loopDispo] -= matchedQty;
        thisCartItem.quantity -= matchedQty;

        // ΓΓΓΓ Dispo Loop Step 2: Process Cost Calculation Matches ΓΓΓΓΓΓΓΓ

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

        // Fee = 0 if not specified or item is damaged.
        let itemRestockFee = thisCartItem.restockFee ?? 0;
        if (damagedCodes[loopDispo]) {
          itemRestockFee = 0;
        }

        //Total paid for all units of this Item in this Invoice
        const dispoTotalPaid = thisInvoItem.price * matchedQty;
        const dispoTotalTax = thisInvoItem.tax * matchedQty;
        const dispoAdjustment = Math.round(dispoTotalPaid * itemRestockFee);
        const dispoAdjustedPaid = dispoTotalPaid - dispoAdjustment;
        const perItemRefundPrice = Math.round(
          thisInvoItem.price * (1 - itemRestockFee)
        );

        // update refund_money obj.
        refund_money.refundTotal += dispoAdjustedPaid;
        refund_money.taxSum += dispoTotalTax;
        refund_money.subtotal += dispoTotalPaid - dispoTotalTax;
        refund_money.adjustments += dispoAdjustment;

        // increment Vars stored outside dispos loop.
        toRefund_thisInvoItem += dispoAdjustedPaid;

        // ΓΓΓΓ  Dispos Loop _ Step 3: Populate  matched{} ΓΓΓΓΓΓΓ

        // Primary key = itemNumber and price
        const matchedItemKey = `${itemNum}--${perItemRefundPrice}`;

        // if this key doesn't already exist...
        if (!matched_items[matchedItemKey]) {
          // create it and populate its info.
          matched_items[matchedItemKey] = {
            ...thisCartItem,
            img: null,
            price: perItemRefundPrice,
            quantity: 0,
          };
        }
        // increment the quantity matched.
        matched_items[matchedItemKey].quantity += matchedQty;

        //Cleanup

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

      // route to the payment types for this invoice
      const invoPayments = thisInvoice.invoiceDetails.payment;

      // Loop through all payment types and assign unrefunded total.
      tenderTypeLoop: for (const thisTenderType of Object.keys(invoPayments)) {
        // Make sure this Invo tender type isn't being reduced past 0.
        const decrementAmount = Math.min(
          invoPayments[thisTenderType].paid,
          toRefund_thisInvoItem
        );

        const tenderDetailsObj = tenderizer(
          thisTenderType,
          invoPayments[thisTenderType]
        );

        // update $
        invoPayments[thisTenderType].paid -= decrementAmount;
        toRefund_thisInvoItem -= decrementAmount;

        const thisTenderLabel = invoPayments[thisTenderType].tenderLabel;

        // If this label doesn't exist in the refunds_by_tender{}...
        if (!refunds_by_tender[thisTenderLabel]) {
          // create it and set paid to 0
          refunds_by_tender[thisTenderLabel] = { paid: 0 };
        }

        refunds_by_tender[thisTenderLabel].paid += decrementAmount;

        // if tender type is zeroed out, remove it from the invoice.
        if (invoPayments[thisTenderType].paid === 0) {
          delete invoPayments[thisTenderType];
        }

        // If all Refund $ are assigned to Tender types, stop looping.
        if (toRefund_thisInvoItem === 0) {
          break tenderTypeLoop;
        }
      } // ∞∞∞∞∞∞∞∞ end of loop through payment types ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

      // If there are 0 unmatched units of item, move on to next item.
      if (!unmatched_items[itemNum]) break invoicesLoop;
    } // ∞∞∞∞∞∞∞∞ end of loop through invoice keys ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
  } // ∞∞∞∞∞∞∞∞ end of loop through unmatched items ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞

  return {
    matched: matched_items,
    unmatched: unmatched_items,
    modified_invoices: modified_invoices,
    refunds_by_tender: refunds_by_tender,
    refund_money: refund_money,
  };
};

export default ReturnsMatchMaker;

/*




*/
