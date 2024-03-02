import InvoiceContext from "../../store/invoice-context";
import ProductContext from "../../store/product-context";
import InvoContext from "../../store/invo-context";

import { useContext } from "react";

import produce from "immer";

import {
  ProdClass,
  Invoice_SR,
  sessionItem,
  InvoProduct,
  returnAtom,
  singleDispo,
  moneyObj,
  baseReturnState,
  returnItemXinvosGroup,
  returnItemCard,
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

const mo_multiply = ({ targetMO, factor = 1 }) => {
  if (targetMO instanceof moneyObj) {
    const outMoneyObj = cloneDeep(targetMO);
    outMoneyObj.unitBaseValue *= factor;
    outMoneyObj.salesTax *= factor;
    return outMoneyObj;
  }
};

const atomsMonetizer = (arrayOfAtoms) => {
  // returns a new moneyObj populated from all atoms in the array
  // salesTaxRate set to undefined because there is no guarantee that all atoms will have the same salesTaxRate.

  let arrayToSum =
    arrayOfAtoms instanceof Object ? Object.values(arrayOfAtoms) : arrayOfAtoms;

  const outTotalMoneyObj = new moneyObj({ salesTaxRate: undefined });

  for (const thisAtom of arrayToSum) {
    const atomQty = thisAtom.atomItemQty;

    const scaledMoneyObj = mo_multiply({
      targetMO: thisAtom.atomMoneyObj,
      factor: atomQty,
    });

    outTotalMoneyObj.unitBaseValue += scaledMoneyObj.unitBaseValue;
    outTotalMoneyObj.salesTax += scaledMoneyObj.salesTax;
  }
  return outTotalMoneyObj;
};

export { useCentsToDollars, useDollarsToCents, mo_multiply, atomsMonetizer };

const useAddItemAtom = () => {
  const itemCtx = useContext(ProductContext);

  const addItemAtom = ({
    targetItemsArr = [],
    itemNumToAdd = "",
    qtyToAdd = 1,
  }) => {
    // Takes a target object of items in a transaction and returns updated version with this itemNum + qty added to it.

    if (!itemCtx[itemNumToAdd]) {
      return false;
    }

    const clonedItemsArr = cloneDeep(targetItemsArr);

    // get the index of itemNumToAdd in the array.

    let targetIndex = clonedItemsArr.findIndex((thisItem) => {
      return thisItem.atomItemNum === itemNumToAdd;
    });

    // if the items is not in the array, add it and set the index to the new item.
    if (targetIndex === -1) {
      clonedItemsArr.push(
        new returnAtom({
          atomItemNum: itemNumToAdd,
          atomItemQty: 0,
        })
      );
      targetIndex = clonedItemsArr.length - 1;
    }

    // add the qtyToAdd to the atomItemQty of the item at the targetIndex.
    clonedItemsArr[targetIndex].atomItemQty += Number(qtyToAdd);

    return clonedItemsArr;
  };
  return addItemAtom;
};

const returnAtomizer = ({ sessionItemsArr = [], sessionInvosObj = {} }) => {
  // accepts an object of Session Items and an array of Session Invos

  const refInvoItem = new Invoice_SR({});
  const refInvoProd = new InvoProduct({});
  const refSessionItem = new sessionItem({});
  const refSingleDispo = new singleDispo({});

  // Arrays of results for each layer of atomization.
  let aAtomizedByInvoice = [];

  // Gets progressively modified to the results of each completed atomization layer.
  let outFullyAtomizedArr = [];

  // Standing records of UM values.  Should be cleared/decremented but never reset.
  let aUM_InvoicedItemAtoms = Object.values(cloneDeep(sessionInvosObj)).flatMap(
    (thisInvo) => {
      return thisInvo.itemAtomsArr;
    }
  );

  let aUM_ReturnItemAtoms = cloneDeep(sessionItemsArr);

  // SHARED FUNCTIONS //////////////////////////////////////////////////
  const atomHasQty = (thisAtom) => {
    return thisAtom.atomItemQty;
  };

  const clearEmptyAtoms = () => {
    //Should only need to filter the UM arrays.  Base values never change and post-atomization arrays should always be clean.
    aUM_InvoicedItemAtoms = aUM_InvoicedItemAtoms.filter(atomHasQty);
    aUM_ReturnItemAtoms = aUM_ReturnItemAtoms.filter(atomHasQty);
    outFullyAtomizedArr = outFullyAtomizedArr.filter(atomHasQty);
  };

  // Turns the UMitems into atoms. //////////////////////////////////////////

  /*
    Outer loop always modifies cloned outFullyAtomizedArr.
    Inner loop always modifies next UM array in sequence.
  */

  outFullyAtomizedArr = cloneDeep(aUM_ReturnItemAtoms);

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////           Atomizaton Layers         //////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Splits atoms by invo, or no invo if empty. ////////////////////////////////////////

  LoopAtoms_Items_X_Invos: for (const thisItemAtom of outFullyAtomizedArr) {
    const refInvoItem = new Invoice_SR({});
    const refInvoProd = new InvoProduct({});

    // TODO - call sorting function here.

    for (const thisInvoItemAtom of aUM_InvoicedItemAtoms) {
      // Only operate on items with this itemNum AND parent key.

      const itemMatches =
        thisInvoItemAtom.atomItemNum === thisItemAtom.atomItemNum &&
        thisInvoItemAtom.parentKey === thisItemAtom.parentKey;

      if (
        thisInvoItemAtom.atomItemNum === thisItemAtom.atomItemNum &&
        thisInvoItemAtom.parentKey === thisItemAtom.parentKey
      ) {
        const nMatchedQty = Math.min(
          thisItemAtom.atomItemQty,
          thisInvoItemAtom.atomItemQty
        );

        // decrement the atomItem and invoItem qtys
        thisItemAtom.atomItemQty -= nMatchedQty;
        thisInvoItemAtom.atomItemQty -= nMatchedQty;

        // Increment Output
        const outAtomXinvo = cloneDeep(thisInvoItemAtom);
        outAtomXinvo.atomItemQty = nMatchedQty;

        aAtomizedByInvoice.push(outAtomXinvo);

        //Cleanup
        clearEmptyAtoms();
        if (!thisItemAtom.atomItemQty) continue LoopAtoms_Items_X_Invos;
      }
    } // ------------- End Of Inner Loop --------------------

    // Continue never triggered, so this atom has some unmatched qty.  Push it.
    aAtomizedByInvoice.push(thisItemAtom);
  }

  outFullyAtomizedArr = cloneDeep(aAtomizedByInvoice);

  return outFullyAtomizedArr;
};

const useReturnAtomizer = () => {
  return returnAtomizer;
};

const autoAddChildAtoms = (clonedDraft) => {
  // Papa?  Is it you?

  const refSessionState = baseReturnState({});
  const refItemAtom = new returnAtom({});

  const returnedItemsArr = clonedDraft.returnItems;
  const sessionInvos = clonedDraft.sessionInvos;
  // array of all atoms in all invoices in the session.
  const itemsSold = Object.values(sessionInvos).flatMap((thisInvo) => {
    return thisInvo.itemAtomsArr;
  });

  for (const thisAtom of itemsSold) {
    // if this atom has a parent and the parent is in the itemsFromInvos but this atom is not, add it.
    const parentItemNum = thisAtom.parentKey;

    // see if the parent is in the returnItems
    const parentReturned =
      returnedItemsArr.filter((thisItem) => {
        return thisItem.atomItemNum === parentItemNum;
      }).length > 0;

    // If this child/parent pair is already in the returnItems, we don't want to overwrite its value.
    const childReturned =
      returnedItemsArr.filter((thisItem) => {
        return (
          thisItem.atomItemNum === thisAtom.atomItemNum &&
          thisItem.parentKey === parentItemNum
        );
      }).length > 0;

    // if this is a child item and it is not already in the returnItems but its parent is, add it.
    if (parentItemNum && parentReturned && !childReturned) {
      clonedDraft.returnItems.push(
        new returnAtom({
          atomItemNum: thisAtom.atomItemNum,
          atomItemQty: 0,
          parentKey: parentItemNum,
        })
      );
    }
  }
  return clonedDraft;
};

const useReturnAutoDeriver = () => {
  const returnAutoDeriver = (draftState) => {
    // purpose is to perform all derivations needed when performing a return.
    // returns a new draft, which must be assigned to the state.

    let outSessionState = cloneDeep(draftState);

    // auto-add child atoms if their parent is in the returnItems
    outSessionState = autoAddChildAtoms(outSessionState);

    // atomize the returnItems
    outSessionState.atomizedReturnItems = returnAtomizer({
      sessionItemsArr: outSessionState.returnItems,
      sessionInvosObj: outSessionState.sessionInvos,
    });

    // calculate the sum of all atoms matched to invoices.
    outSessionState.totalReturnValue = atomsMonetizer(
      outSessionState.atomizedReturnItems
    );

    outSessionState.wholeBigNumber = outSessionState.totalReturnValue.unitTotal;

    return outSessionState;
  };
  return returnAutoDeriver;
};

export { useReturnAtomizer, useAddItemAtom, useReturnAutoDeriver };
