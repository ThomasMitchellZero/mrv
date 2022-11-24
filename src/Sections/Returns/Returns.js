import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import InvoiceContext from "../../store/invoice-context";
import { useContext, useReducer } from "react";

const Returns = () => {
  const productContext = useContext(ProductContext);
  const invoiceContext = useContext(InvoiceContext);

  // Generates a long list of numbers to test scrolling.
  const testDataMaker = (length) => {
    let output = [];
    for (let i = 0; i < length; i++) {
      output = [
        ...output,
        {
          id: i,
          content: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          date: "5 August 1983",
        },
      ];
    }
    return output;
  };

  const testData = testDataMaker(55);

  //// RETURNS SESSION REDUCER ////

  const defaultSessionState = {
    items: {},
    invoices: {},
    unmatched: {},
    matchEligible: {},
    matched: {},
    testData: testData,
  };

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const generateUnmatched = (list) => {
    return { ...list };
  };

  const generateMatchEligible = (invoiceList) => {
    // makes a new array of the invoices so we can loop through it.
    const matchArr = Object.entries(invoiceList);
    let matchEligible = {};

    // for each invoice in the new Invoice Array
    matchArr.forEach((invoice) => {
      // make the invoice's products into an iterable array.
      const currentInvoiceProducts = Object.entries(invoice[1].products);

      currentInvoiceProducts.forEach((productArr) => {
        const currentKey = productArr[0];
        const currentVal = productArr[1];

        //if item number already exists in MatchEligible, spread those existing objects into the array with the current value.
        const newProductArr = matchEligible[currentKey]
          ? [...matchEligible[currentKey], currentVal]
          : [currentVal];

        // add the updated key/value pair to the matchEligible object.
        matchEligible = { ...matchEligible, [currentKey]: newProductArr };
      });
    });
    return matchEligible;
  };

const generateUnmatched_invoices = (invoiceList)=>{

}


  /*

  const unmatched = {
    300: {quantity: 2}
  }

///////////////////////

    AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      payment: cash,
    },
    products: {
      100: { quantity: 8, price: 44.15 },
      300: { quantity: 2, price: 24.15 },
      400: { quantity: 10, price: 13.15 },
    },
  },

////////////////////


  const matchEligible = {
    300: [{ quantity: 8, price: 44.05, payment: "cash" }],
    400: [
      { quantity: 6, price: 21.21, payment: "credit" },
      { quantity: 8, price: 23.23, payment: "debit" },
    ],
  };

///////////////////


*/

  const matchMaker = (itemList, invoiceList) => {
    const unmatched_invoices = invoiceList
    const unmatched_items = generateUnmatched(itemList);

    const unmatched_itemArr = Object.entries(unmatched_items);
    const unmatched_invoiceArr = Object.entries(unmatched_invoices)

    //loop through the Unmatched items.
    unmatched_itemArr.forEach((unmatchedItem) => {
      const UM_itemKey = unmatchedItem[0];
      const UM_itemQty = unmatchedItem[1].quantity;

      // loop through the Unmatched invoices
      unmatched_invoiceArr.forEach((unmatchedInvoice)=>{

      })
      if (matchEligible[UM_itemKey]) {

        /*
          [
            { quantity: 6, price: 21.21, payment: "credit" },
            { quantity: 8, price: 23.23, payment: "debit" },
          ],
        */

        // an array pf all transactions for that tiem.
        const ME_Item = Object.values(matchEligible[UM_itemKey]);
          
          // Loop through all the transactions in this item.  Using a for loop because we need the index.
          for(let i=0; i<ME_Item.length; i++){
            
            const ME_itemQty = ME_Item[i].quantity
            
            if(ME_itemQty > UM_itemQty){

            } else if(ME_itemQty < UM_itemQty){

            } else {

            }

            
          }


      }
    });
  };

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const sessionReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        const newKey = action.payload.itemNum;
        const itemInfo = productContext[newKey];
        let newQuantity = parseInt(action.payload.quantity);

        //if item already exists in the state, add new qty to existing qty.
        if (state.items[newKey]) {
          newQuantity += state.items[newKey].quantity;
        }

        const newItemList = {
          ...state.items,
          [newKey]: { ...itemInfo, quantity: newQuantity },
        };

        return { ...state, items: newItemList };

      case "REMOVE_ITEM":
        let itemsList = state.items;

        delete itemsList[action.payload];

        return { ...state, items: itemsList };

      case "ADD_INVOICE":
        const invoiceNum = action.payload;
        const invoiceDetails = invoiceContext[invoiceNum];
        const newInvoices = { ...state.invoices, [invoiceNum]: invoiceDetails };
        generateMatchEligible(newInvoices);

        return {
          ...state,
          invoices: newInvoices,
        };

      case "REMOVE_INVOICE":
        let invoiceList = state.invoices;
        console.log(action.payload);
        delete invoiceList[action.payload];
        return { ...state, invoiceList };

      case "CLEAR_SESSION":
        return defaultSessionState;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  //// RETURNS SESSION STATE ////

  const [session, dispatchSession] = useReducer(
    sessionReducer,
    defaultSessionState
  );

  return (
    <main className={classes.container}>
      <Outlet
        context={{
          session: session,
          dispatchSession: dispatchSession,
        }}
      />
    </main>
  );
};

export default Returns;

/*









*/
