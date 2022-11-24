import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import InvoiceContext from "../../store/invoice-context";
import { useContext, useReducer } from "react";
import matchMaker from "./functions/matching";

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

  const sessionReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        const newKey = action.payload.itemNum;
        const itemInfo = productContext[newKey];
        const sessionInvoices = state.invoices;
        let newQuantity = parseInt(action.payload.quantity);

        //if item already exists in the state, add new qty to existing qty.
        if (state.items[newKey]) {
          newQuantity += state.items[newKey].quantity;
        }

        const newItemList = {
          ...state.items,
          [newKey]: { ...itemInfo, quantity: newQuantity },
        };

        const derivedStates = matchMaker(newItemList, sessionInvoices)
        console.log(derivedStates)

        return { ...state, items: newItemList };

      case "REMOVE_ITEM":
        let itemsList = state.items;

        delete itemsList[action.payload];

        return { ...state, items: itemsList };

      case "ADD_INVOICE":
        const invoiceNum = action.payload;
        const invoiceDetails = invoiceContext[invoiceNum];
        const newInvoices = { ...state.invoices, [invoiceNum]: invoiceDetails };
        //generateMatchEligible(newInvoices);

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
