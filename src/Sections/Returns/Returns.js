import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import InvoiceContext from "../../store/invoice-context";
import { useContext, useReducer } from "react";
import ReturnsMatchMaker from "./functions/ReturnsMatchMaker";
import cloneDeep from "lodash.clonedeep";

// test data, delete once everything is working.

import dummyTendersPack from "./Finalize_Refund/dummyTendersPack";
import sortNprocessTenders from "./functions/sortNprocessTenders";

const failureStatus = false;

const defaultSessionState = {
  scenarios: { totalTenderFailure: failureStatus },
  items: {},
  invoices: {},
  unmatched: {},
  modified_invoices: {},
  matched: {},
  refunds_by_tender: {}, //sortNprocessTenders(dummyTendersPack, failureStatus),
  refund_money: {
    refundTotal: 0,
    taxSum: 0,
    subtotal: 0,
    adjustments: 0,
  },
};

const Returns = () => {
  const productContext = useContext(ProductContext);
  const invoiceContext = useContext(InvoiceContext);

  //// RETURNS SESSION REDUCER ////



  const sessionReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM": {
        const newKey = action.payload.itemNum;
        const itemInfo = { ...productContext[newKey] };
        const sessionInvoices = { ...state.invoices };
        // if payload.quantity is undefined, return 0.  Dispositions will not include a quantity b/c qty isn't changing.
        let newQuantity = parseInt(action.payload.quantity ?? 0);
        // if item already exists, add old value to new value.
        newQuantity += state.items[newKey]?.quantity || 0;

        // if there is a new disposition we need to completely replace the old disposition.
        const setDisposition =
          // Payload disposition if there is one
          action.payload.newDisposition ??
          // else existing disposition if there is one
          state.items[newKey]?.disposition ??
          // else an empty object.
          {};

        const newItemList = {
          ...state.items,
          [newKey]: {
            ...itemInfo,
            quantity: newQuantity,
            disposition: setDisposition,
          },
        };

        const derivedStates = ReturnsMatchMaker(newItemList, sessionInvoices);

        return {
          ...state,
          items: newItemList,
          ...derivedStates,
        };
      }

      case "REMOVE_ITEM": {
        const sessionInvoices = { ...state.invoices };
        let newItemList = { ...state.items };

        delete newItemList[action.payload];

        const derivedStates = ReturnsMatchMaker(newItemList, sessionInvoices);

        return {
          ...state,
          items: newItemList,
          ...derivedStates,
        };
      }

      case "ADD_INVOICE": {
        const sessionItems = { ...state.items };

        const invoicArr = action.payload;
        const newInvoiceList = { ...state.invoices };

        //loop through the incoming array
        for (const i of invoicArr) {
          //add this key and its properties from invoiceContext
          newInvoiceList[i] = invoiceContext[i];
        }

        const derivedStates = ReturnsMatchMaker(sessionItems, newInvoiceList);

        return {
          ...state,
          invoices: newInvoiceList,
          ...derivedStates,
        };
      }

      case "REMOVE_INVOICE": {
        const sessionItems = { ...state.items };
        let newInvoiceList = { ...state.invoices };
        delete newInvoiceList[action.payload];

        const derivedStates = ReturnsMatchMaker(sessionItems, newInvoiceList);

        return {
          ...state,
          invoices: newInvoiceList,
          ...derivedStates,
        };
      }

      case "UPDATE_TENDERS": {
        const outTendersArr = action.payload.newtendersArr;
        // this is NOT currently using the State failure status.
        const newTenderPack = sortNprocessTenders(outTendersArr);
        return {
          ...state,
          refunds_by_tender: newTenderPack,
        };
      }

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
