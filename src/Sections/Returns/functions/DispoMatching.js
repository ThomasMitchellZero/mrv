// Function for matching returned items with session invoices.

import cloneDeep from "lodash.clonedeep";

const itemsState = {
  100: {
    disposition: {
      doesntWork: 0,
      broken: 2,
      unpackaged: 0,
      warranty: 2,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
      unwanted: 4,
    },
  }, // more in invoice
  200: {
    disposition: {
      doesntWork: 5,
      broken: 5,
      unpackaged: 0,
      warranty: 2,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
      unwanted: 0,
    },
  }, // more in scanned, match in second
  300: {
    disposition: {
      doesntWork: 1,
      broken: 1,
      unpackaged: 0,
      warranty: 0,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
      unwanted: 0,
    },
  }, // equal in invoice
  900: {
    disposition: {
      doesntWork: 0,
      broken: 3,
      unpackaged: 0,
      warranty: 2,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
      unwanted: 0,
    },
  }, // scanned > both invoices
  910: {
    disposition: {
      doesntWork: 1,
      broken: 0,
      unpackaged: 0,
      warranty: 0,
      missingParts: 0,
      cosmetic: 0,
      used: 0,
      unwanted: 0,
    },
  }, // no matches
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
      900: { quantity: 1, price: 13.15 },
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
  const modified_invoices = cloneDeep(invoiceList);
  const unmatched_items = cloneDeep(itemList);
  let matched_items = {};

  //loop through the Unmatched items.
  Object.keys(unmatched_items).forEach((itemNum) => {
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
          payment: modified_invoices.products.payment,
          disposition: {},
        };

        //loop through that item's dispositions
        Object.keys(itemNum.disposition).forEach((loopDispo) => {
          // maybe add a check to see if the item is still in the invoice so I don't keep looping if its' already been zeroed out?

          //quantities being compared
          let dispo_qty = unmatched_items[itemNum].disposition[loopDispo];
          let sold_Qty = itemInInvoice.quantity;

          //The matched quantity is the smaller of the Qtys
          const matchedQty = dispo_qty > sold_Qty ? sold_Qty : dispo_qty;

          // Subtract matchedQty from {unmatched_items} and {modifed_invoices}Invoices.
          if (dispo_qty > sold_Qty) {
            dispo_qty -= matchedQty;
            delete modified_invoices[invoiceNum].products[itemNum];
          } else {
            dispo_qty -= matchedQty;
            sold_Qty -= matchedQty;
          }

          //Add the matched value to the future Matched dispositions obj.
          newMatchedObj.disposition[loopDispo] = matchedQty;

          // if all disposition values are zero, there are no remaining umatched items, so delete this item.
          if (
            // !, because this returns true if any are non-zero.
            !Object.values(unmatched_items[itemNum].disposition).includes(
              (i) => {
                return i !== 0;
              }
            )
          ) {
            delete unmatched_items[itemNum]
          }

        }); // end of loop through item dispositions.
        
        // add the new Obj matched from the invoice to this matched item's arr
        newMatchedItemArr.push(newMatchedObj)
      }
    }); // end of loop through invoice keys.

    // add the completed array of matches for this item to {matched_items}
    matched_items[itemNum] = newMatchedItemArr
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
