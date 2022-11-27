// Function for matching returned items with session invoices.

import cloneDeep from "lodash.clonedeep";

const matchMaker = (itemList, invoiceList) => {
    const modified_invoices = cloneDeep(invoiceList);
    const unmatched_items = cloneDeep(itemList);
    
    let matched_items = {};
  
    //loop through the Unmatched items.
    Object.keys(unmatched_items).forEach((itemNum) => {
      //loop through the Unmatched invoices ///////////////
  
      Object.keys(modified_invoices).forEach((invoiceNum) => {
        // If itenNum still exists AND a product with this item number was sold on that invoice...
        if (
          unmatched_items[itemNum] &&
          modified_invoices[invoiceNum].products[itemNum]
        ) {
          // address of current item so I can shorthand some DetailsObj properties.
          const itemInInvoice = modified_invoices[invoiceNum].products[itemNum];
  
          //quantities being compared
          const sold_qty = itemInInvoice.quantity;
          const UM_itemQty = unmatched_items[itemNum].quantity;
        
          //The matched quantity is the smaller of the Qtys. This evaluates and returns that.
          const matchedQty = sold_qty > UM_itemQty ? UM_itemQty : sold_qty;
  
          const matchDetailsObj = {
            price: itemInInvoice.price,
            quantity: matchedQty,
            payment: modified_invoices[invoiceNum].invoiceDetails.payment,
            dispositions: {},
          };
  
          // conditional handling compares Qty sold to Qty scanned.
          if (sold_qty > UM_itemQty) {
            modified_invoices[invoiceNum].products[itemNum].quantity -=
              matchedQty;
            delete unmatched_items[itemNum];
          } else if (UM_itemQty > sold_qty) {
            unmatched_items[itemNum].quantity -= matchedQty;
            delete modified_invoices[invoiceNum].products[itemNum];
          } else {
            delete modified_invoices[invoiceNum].products[itemNum];
            delete unmatched_items[itemNum];
          }
  
          // Update matched_items
          let newMatchedArr = [matchDetailsObj];
  
          if (matched_items[itemNum]) {
            newMatchedArr = [...matched_items[itemNum], ...newMatchedArr];
          }
          matched_items = { ...matched_items, [itemNum]: newMatchedArr };
        }
        // end of loop through invoice keys. 
      });
    });
  
    return {
      matched: matched_items,
      unmatched: unmatched_items,
      modified_invoices: modified_invoices,
    };
  };
  
  export default matchMaker;

  /*

  
  */
  
  /*  THIS IS ALL TEST DATA
  
  
  const itemsState = {
    100: { quantity: 6 }, // more in invoice
    200: { quantity: 10 }, // more in scanned, match in second
    300: { quantity: 2 }, // equal in invoice
    900: { quantity: 5}, // scanned > both invoices
    910: { quantity: 1}, // no matches
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
  
  
  */
  