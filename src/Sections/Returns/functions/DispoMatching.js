// Function for matching returned items with session invoices.

//import cloneDeep from "lodash.clonedeep";

const itemsState = {
  100: {
    // more in invoice
    quantity: 4,
    disposition: {
      doesntWork: 0,
      broken: 2,
      unpackaged: 0,
      warranty: 2,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
    },
  },
  200: {
    // more in scanned, match in second
    quantity: 12,
    disposition: {
      doesntWork: 5,
      broken: 5,
      unpackaged: 0,
      warranty: 2,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
    },
  },
  300: {
    // equal in invoice
    quantity: 2,
    disposition: {
      doesntWork: 1,
      broken: 0,
      unpackaged: 0,
      warranty: 0,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
    },
  },
  900: {
    // scanned > both invoices
    quantity: 5,
    disposition: {
      doesntWork: 0,
      broken: 0,
      unpackaged: 0,
      warranty: 2,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
    },
  },

  910: {
    // no matches
    quantity: 5,
    disposition: {
      doesntWork: 1,
      broken: 0,
      unpackaged: 0,
      warranty: 0,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
    },
  },
};

const invoiceState = {
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      payment: "cash",
    },
    products: {
      100: { quantity: 8, price: 44.15 },
      300: { quantity: 2, price: 24.15 },
      500: { quantity: 10, price: 13.15 },
      900: { quantity: 1, price: 876.15 },
    },
  },

  BBB: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 22),
      payment: "check",
    },
    products: {
      200: { quantity: 8, price: 44.15 },
      900: { quantity: 1, price: 987.15 },
    },
  },
};

/*

    Matched looks like:
    
    name:[
      {
        price: $12.00
        dispositions: {...}
        tender: "cash"
      },
      {
        price: $14.00
        dispositions: {...}
        tender: "credit"
      }
    ]
    
    */

const matchMaker = (itemList, invoiceList) => {
  //The three derived states we will create
  //const modified_invoices = cloneDeep(invoiceList);
  //const unmatched_items = cloneDeep(itemList);

  const modified_invoices = invoiceList;
  const unmatched_items = itemList;
  let matched_items = {};

  //loop through the Unmatched items.
  for (const itemNum of Object.keys(unmatched_items)) {
    // first, get sum of all disposition values for the current item.
    const itemDispoObj = unmatched_items[itemNum].disposition;
    const dispo_total = Object.values(itemDispoObj).reduce((total, i) => {
      // if 0 items have this disposition...
      if (!unmatched_items[itemNum].disposition[i]) {
        // delete it from unmatched Items
        delete unmatched_items[itemNum].disposition[i];
      }
      return total + i;
    });

    // anything without a dispo is Unwanted, so we subtract total dispos from total Qty.  
    const unwantedTotal = unmatched_items[itemNum].quantity - dispo_total;

    itemDispoObj.unwanted = unwantedTotal;

    // this will be the Array of matched objects.
    let newMatchedItemArr = [];

    //loop through the Unmatched invoices ///////////////
    for (const invoiceNum of Object.keys(modified_invoices)) {
      // If there are 0 unmatched units of item, move on to next item.
      if (!unmatched_items[itemNum]) break;
      // If this invoice doesn't contain this item, skip to next invoice.
      if (!modified_invoices[invoiceNum].products[itemNum]) continue;

      let newMatchedObj = {
        price: modified_invoices[invoiceNum].products[itemNum].price,
        payment: modified_invoices[invoiceNum].invoiceDetails.payment,
        disposition: {},
      };

      //loop through that item's dispositions
      for (const loopDispo of Object.keys(
        unmatched_items[itemNum].disposition
      )) {
        // check that item hasn't previously been deleted from invoice.
        if (!modified_invoices[invoiceNum].products[itemNum]) break;

        //quantities being compared
        const dispo_qty = unmatched_items[itemNum].disposition[loopDispo];
        const sold_Qty =
          modified_invoices[invoiceNum].products[itemNum].quantity;

        //The matched quantity is the smaller of the Qtys
        const matchedQty = Math.min(dispo_qty, sold_Qty);

        // Remove matchedQty from the invoice and the current dispo.
        if (dispo_qty < sold_Qty) {
          // All items of this disposition are matched, so delete it.
          delete unmatched_items[itemNum].disposition[loopDispo];
          modified_invoices[invoiceNum].products[itemNum].quantity -=
            matchedQty;
        } else if (dispo_qty > sold_Qty) {
          // All units of item in this invoice have been matched, so delete it.
          unmatched_items[itemNum].disposition[loopDispo] -= matchedQty;
          delete modified_invoices[invoiceNum].products[itemNum];
        } else {
          // Qtys are equal, so delete both.
          delete unmatched_items[itemNum].disposition[loopDispo];
          delete modified_invoices[invoiceNum].products[itemNum];
        }

        if (matchedQty > 0) {
          // add dispo:matchedQty to the newMatchedObj's dispositions
          newMatchedObj.disposition[loopDispo] = matchedQty;
          // decrement the TotalUnmatched
          unmatched_items[itemNum].quantity -= matchedQty;
        }
      } // end of loop through item dispositions.

      // Each obj pushed to the array contains all matched dispos and details of the invoice on which the matches were found.
      newMatchedItemArr.push(newMatchedObj);

      // if there are no remaining umatched units, delete item from Unmatched,
      if (unmatched_items[itemNum].quantity === 0) {
        delete unmatched_items[itemNum];
      }
    } // end of loop through invoice keys.

    // add the completed array of matches for this item to {matched_items}
    matched_items[itemNum] = newMatchedItemArr;
  } // end of loop through unmatched items.

  return {
    matched: matched_items,
    unmatched: unmatched_items,
    modified_invoices: modified_invoices,
  };
};

matchMaker(itemsState, invoiceState);

/*


  
*/

/*  THIS IS ALL TEST DATA
  
  

  
  */
