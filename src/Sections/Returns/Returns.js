import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import InvoiceContext from "../../store/invoice-context";
import { useContext, useReducer } from "react";

const Returns = () => {
  const productContext = useContext(ProductContext);
  const invoiceContext = useContext(InvoiceContext);

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
        return {
          ...state,
          invoices: {
            ...state.invoices,
            [invoiceNum]: { ...invoiceDetails },
          },
        };

      case "REMOVE_INVOICE":
        let invoiceList = state.invoices;
        console.log(action.payload);
        delete invoiceList[action.payload];
        return { ...state, invoiceList };

      case "CLEAR_SESSION":
        return { items: [], invoices: [] };

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };


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

  //// Primary reducer for tracking Items and Invoices. ////

  const [session, dispatchSession] = useReducer(sessionReducer, {
    items: {},
    invoices: {},
    testData: testData,
  });



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
