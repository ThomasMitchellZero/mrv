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
  const outTotalMoneyObj = new moneyObj({ salesTaxRate: undefined });

  for (const thisAtom of arrayOfAtoms) {
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
    targetAllItemsObj = {},
    itemNumToAdd = "",
    qtyToAdd = 1,
  }) => {
    // Takes a target object of items in a transaction and returns updated version with this itemNum + qty added to it.

    if (!itemCtx[itemNumToAdd]) {
      return false;
    }

    const draftAllItemsObj = cloneDeep(targetAllItemsObj);
    draftAllItemsObj[itemNumToAdd] ??= new returnAtom({
      atomItemNum: itemNumToAdd,
      atomItemQty: 0,
    });

    draftAllItemsObj[itemNumToAdd].atomItemQty += Number(qtyToAdd);

    return draftAllItemsObj;
  };
  return addItemAtom;
};

const useReturnAtomizer = () => {
  const returnAtomizer = ({ sessionItemsObj = {}, sessionInvosObj = {} }) => {
    // accepts an object of Session Items and an array of Session Invos

    const refInvoItem = new Invoice_SR({});
    const refInvoProd = new InvoProduct({});
    const refSessionItem = new sessionItem({});
    const refSingleDispo = new singleDispo({});

    // Outputs to be modified during Matchmaking.
    const oCloneSessnItems = cloneDeep(sessionItemsObj);
    const oCloneSessnInvos = cloneDeep(sessionInvosObj);

    // Arrays of results for each layer of atomization.
    let aAtomizedByInvoice = [];

    // Gets progressively modified to the results of each completed atomization layer.
    let outFullyAtomizedArr = [];

    // Standing records of UM values.  Should be cleared/decremented but never reset.
    let aUM_InvoicedItemAtoms = Object.values(oCloneSessnInvos).flatMap(
      (thisInvo) => {
        return thisInvo.itemAtomsArr;
      }
    );

    let aUM_ReturnItemAtoms = Object.values(oCloneSessnItems);

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
        // Only operate on items with this itemNum
        if (thisInvoItemAtom.atomItemNum === thisItemAtom.atomItemNum) {
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
  return returnAtomizer;
};

export { useReturnAtomizer, useAddItemAtom };

/*

    LoopThruAtomsXdispos: for (const itemAtom of outFullyAtomizedArr) {
      const thisItemNum = itemAtom.atomItemNum;

      // convenience rt, actual vals stored outside loop.
      const oThisItemDispos = oCloneSessnItems[thisItemNum].disposObj;

      for (const thisDispoKey of Object.keys(oThisItemDispos)) {
        const nMatchedQty = Math.min(
          itemAtom.atomItemQty,
          oThisItemDispos[thisDispoKey].dispoQty
        );

        //Decrement values
        itemAtom.atomItemQty -= nMatchedQty;
        oThisItemDispos[thisDispoKey].dispoQty -= nMatchedQty;

        // Create Output
        const outAtomXdispo = new returnAtom({
          ...itemAtom.vals(),
          atomItemQty: nMatchedQty,
          atomDispoKey: thisDispoKey,
        });
        aAtomizedByDispo.push(outAtomXdispo);

        // Working up to this point, but for some reason it didn't delete the empty dispo?

        // Cleanup
        if (oThisItemDispos[thisDispoKey].dispoQty === 0) {
          delete oThisItemDispos[thisDispoKey];
        }
        if (!itemAtom.atomItemQty) continue LoopThruAtomsXdispos;
      }
      // ---------------------------------------

      // Continue wasn't triggerd, so this atom has some unmatched qty.  Push it.
      itemAtom.atomDispoKey = "unwanted";
      // these items have no match, so add them as Unwanted
      aAtomizedByDispo.push(itemAtom);
    }

    return {
      aAtomizedByItem,
      aAtomizedByInvoice,
      aAtomizedByDispo,
      fullyAtomizeArr: outFullyAtomizedArr,
    };

    outFullyAtomizedArr = cloneDeep(aAtomizedByInvoice);
    
    */
