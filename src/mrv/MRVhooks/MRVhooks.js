import InvoiceContext from "../../store/invoice-context";
import ProductContext from "../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import {
  ProdClass,
  Invoice_SR,
  sessionItem,
  InvoProduct,
} from "../../globalFunctions/globalJS_classes";

import { cloneDeep, isEmpty } from "lodash";

//// Money Handlers ////

const useCentsToDollars = () => {
  return (priceInCents = 4200) => {
    return Number.parseFloat(priceInCents / 100).toFixed(2);
  };
};

const useDollarsToCents = () => {
  return (priceInDollars) => {
    return Number.parseFloat(priceInDollars.toFixed(2)) * 100;
  };
};

const makeTax = (itemPrice) => {
  return Math.round(itemPrice * 0.09);
};

const newMoneyObj = ({
  costDif = 0,
  taxDif = 0,
  charge = 0,
  refund = 0,
  costAdj = 0,
  fullItemBalance = 0,
}) => {
  return {
    costDif,
    taxDif,
    charge,
    refund,
    costAdj,
    fullItemBalance,
  };
};

const useMRVAddItem = () => {
  const mrvAddItem = ({
    targetAllItemsObj = {},
    itemNum = "",
    qtyToAdd = 42,
  }) => {
    // Takes a target object of items in a transaction and returns updated version with this itemNum + details added to it.

    const draftAllItemsObj = cloneDeep(targetAllItemsObj);
    draftAllItemsObj[itemNum] ??= { itemQty: 0 };
    draftAllItemsObj[itemNum].itemQty += qtyToAdd;

    return draftAllItemsObj;
  };
  return mrvAddItem;
};

const useMRVmatchmaker = () => {
  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);

  const mrvMatchmaker = ({ sessionItemsObj = {}, sessionInvosArr = [] }) => {
    // accepts an object of Session Items and an array of Session Invos

    // Outputs to be modified during Matchmaking.
    const oUnmatchedItems = cloneDeep(sessionItemsObj);
    const oPostMatchInvos = {};
    const matchedItems = {};

    UMitemsLoop: for (const UMitemKey in Object.keys(oUnmatchedItems)) {

      postMatchInvoLoop: for (const invoKey in sessionInvosArr) {
        
        const refInvoItem = new Invoice_SR();
        const refInvoProd = new InvoProduct();

        // if this invoice isn't already in oPMI, add it.
        oPostMatchInvos ??= invoiceContext[invoKey];

        // 88888888-- End of postMatchInvoLoop --88888888
      }

      // 88888888-- End of UMitemsLoop --88888888
    }
  };
  return mrvMatchmaker;
};

export {
  //Money
  useCentsToDollars,
  useDollarsToCents,
  useMRVAddItem,
};
