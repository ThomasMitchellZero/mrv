import InvoiceContext from "../../store/invoice-context";
import ProductContext from "../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import {
  ProdClass,
  Invoice_SR,
  sessionItem,
  InvoProduct,
  returnAtom,
  singleDispo,
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
    itemNumToAdd = "",
    qtyToAdd = 42,
  }) => {
    // Takes a target object of items in a transaction and returns updated version with this itemNum + details added to it.

    const draftAllItemsObj = cloneDeep(targetAllItemsObj);
    draftAllItemsObj[itemNumToAdd] ??= new sessionItem({
      itemNum: itemNumToAdd,
    });
    draftAllItemsObj[itemNumToAdd].itemQty += qtyToAdd;

    return draftAllItemsObj;
  };
  return mrvAddItem;
};

const useMRVmatchmaker = () => {
  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);

  const mrvMatchmaker = ({ sessionItemsObj = {}, sessionInvosObj = {} }) => {
    // accepts an object of Session Items and an array of Session Invos

    // Outputs to be modified during Matchmaking.
    const oUnmatchedItems = cloneDeep(sessionItemsObj);
    const oPostMatchInvos = {};
    const matchedItems = {};

    UMitemsLoop: for (const UMitemKey in Object.keys(oUnmatchedItems)) {
      const thisUMitem = oUnmatchedItems[UMitemKey];

      let invosArr = Object.keys(sessionInvosObj);
      // then sort it all.

      postMatchInvoLoop: for (const invoKey in Object.keys(sessionInvosObj)) {
        // Class references so I can get correct property names.  No dependencies.
        const refInvoItem = new Invoice_SR();
        const refInvoProd = new InvoProduct();
        const refSessionItem = new sessionItem();

        //Check that the item is present in the invoice, otherwise go to the next.
        const thisInvoItemRt = oPostMatchInvos[invoKey].products[UMitemKey];
        if (!thisInvoItemRt) continue;

        const UMitemQty = thisUMitem.itemQty;
        const invoItemQty = thisInvoItemRt.quantity;

        const deductQty = Math.min(UMitemQty, invoItemQty);

        thisUMitem.itemQty -= deductQty;

        // 88888888-- End of postMatchInvoLoop --88888888
      }

      // 88888888-- End of UMitemsLoop --88888888
    }
  };
  return mrvMatchmaker;
};

const useReturnAtomizer = () => {
  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);

  const returnAtomizer = ({ sessionItemsObj = {}, sessionInvosObj = {} }) => {
    // accepts an object of Session Items and an array of Session Invos

    const refInvoItem = new Invoice_SR();
    const refInvoProd = new InvoProduct();
    const refSessionItem = new sessionItem();
    const refSingleDispo = new singleDispo();

    // Outputs to be modified during Matchmaking.
    const oUnmatchedItems = cloneDeep(sessionItemsObj);
    const oPostMatchInvos = {};

    // aaaa Atomize the 
    const aSplitByDispo = Object.values(oUnmatchedItems).map((oSessnItem) => {
      let nThisSessnItemQty = oSessnItem.qty;

      const aSessnItemDispos = Object.values(oSessnItem.disposObj);

      const outSplitSessnItems = aSessnItemDispos.map((oSingleDispo) => {
        const nQtyInDispo = oSingleDispo.dispoQty;
        const outSplitItem = new returnAtom({
          atomItemNum: oSessnItem.itemNum,
          atomItemQty: nQtyInDispo,
          atomSingleDispo: oSingleDispo,
        });
        return outSplitItem;
      });

      // Needs to deal with empty dispos obj.  


      return outSplitSessnItems;
    });
  };
  return returnAtomizer;
};

export {
  //Money
  useCentsToDollars,
  useDollarsToCents,
  useMRVAddItem,
};
