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
  Object.keys(unmatched_items).forEach((itemNum) => {

    // before we can start we need to compute the Unwanted total.
    // first, get sum of all dispositions
    const itemDispoObj = unmatched_items[itemNum].disposition
    const dispo_total = Object.values(itemDispoObj).reduce(
      (total, i) => {
        return total + i;
      }
    );

    // anything without a dispo is Unwanted, so we subtract total dispos from total Qty.  Should never be negative but I'm checking to be sure.
    const unwantedTotal = Math.max(unmatched_items[itemNum].quantity - dispo_total, 0);
    itemDispoObj.unwanted = unwantedTotal;

    // this will be the Array of matched objects.
    let newMatchedItemArr = [];

    //loop through the Unmatched invoices ///////////////
    Object.keys(modified_invoices).forEach((invoiceNum) => {
      // If itemNum still exists AND a product with this item number was sold on that invoice...
      if (
        unmatched_items[itemNum] &&
        modified_invoices[invoiceNum].products[itemNum]
      ) {
        // address of current item in Invoice
        const itemInInvoice = modified_invoices[invoiceNum].products[itemNum];

        let newMatchedObj = {
          price: itemInInvoice.price,
          payment: modified_invoices[invoiceNum].invoiceDetails.payment,
          disposition: {},
        };

        //loop through that item's dispositions
        Object.keys(unmatched_items[itemNum].disposition).forEach(
          (loopDispo) => {
            // OK, something weird is happening here.  Once all items have been matched from the invoice, sold_Qty seems to still have its value from the last session.  If anything, I would have expected a crash, because that item should be gone from the invoice.

            // I wonder if it's because the first part its definition is outside the closure?

            // In either case, I probably ought to check that the Invoice and the Item still exist before I evaluate?

            // I want to at least see if I can reproduce the error because if I can, something about my JS knowledge is faulty.

            //quantities being compared
            let dispo_qty = unmatched_items[itemNum].disposition[loopDispo];
            let sold_Qty = itemInInvoice.quantity;

            //The matched quantity is the smaller of the Qtys
            const matchedQty = Math.min(dispo_qty, sold_Qty);

            // Subtract matchedQty from {unmatched_items} and {modifed_invoices}Invoices.

            if (dispo_qty < sold_Qty) {
              delete unmatched_items[itemNum].disposition[loopDispo];
              itemInInvoice.quantity -= matchedQty;
            } else if(dispo_qty > sold_Qty){
              unmatched_items[itemNum].disposition[loopDispo] -= matchedQty;
              delete modified_invoices[invoiceNum].products[itemNum];
            } else{
              delete unmatched_items[itemNum].disposition[loopDispo];
              delete modified_invoices[invoiceNum].products[itemNum];
            }

            //Add the matched value to the future Matched dispositions obj if the match isn't 0.
            if (matchedQty) {
              newMatchedObj.disposition[loopDispo] = matchedQty;
            }

          }
        ); // end of loop through item dispositions.

        // Each obj pushed to the array contains all matched dispos and details of the invoice on which the matches were found.
        newMatchedItemArr.push(newMatchedObj);

        // if there are no remaining umatched units, delete item from Unmatched,
        if (Object.keys(unmatched_items[itemNum].disposition).length === 0) {
          delete unmatched_items[itemNum];
        }
      }
    }); // end of loop through invoice keys.

    // add the completed array of matches for this item to {matched_items}
    matched_items[itemNum] = newMatchedItemArr;
  }); // end of loop through unmatched items.

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
