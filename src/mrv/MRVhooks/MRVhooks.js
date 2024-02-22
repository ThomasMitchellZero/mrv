import InvoiceContext from "../../store/invoice-context";
import ProductContext from "../../store/product-context";
import InvoContext from "../../store/invo-context";

import { useContext } from "react";

import {
  ProdClass,
  Invoice_SR,
  sessionItem,
  InvoProduct,
  returnAtom,
  singleDispo,
  moneyObj,
  mrvItemAtom,
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


const useMonetizer = () => {
  const monetizer = (arrayOfAtoms) => {
    // returns a new moneyObj populated from all atoms in the array

    const outArrTotalMoneyObj = new moneyObj({});

    for (const thisAtom of arrayOfAtoms) {
      const thisAtomMoneyObj = thisAtom.atomMoneyObj;
      const atomQty = thisAtom.atomUnitQty;

      thisAtomMoneyObj.unitBaseValue += thisAtom.unitBaseValue * atomQty;
      thisAtomMoneyObj.valIncrease += thisAtom.valIncrease * atomQty;
      thisAtomMoneyObj.valDecrease += thisAtom.valDecrease * atomQty;
    }
    return outArrTotalMoneyObj;
  };
  return monetizer;
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

    let aUM_ReturnItemAtoms = Object.values(oCloneSessnItems).map(
      (thisItem) => {
        // In future, eliminate this function if item entry happens as atoms.
        const outSplitXitem = new returnAtom({
          atomItemNum: thisItem.itemNum,
          atomItemQty: thisItem.itemQty,
        });

        return outSplitXitem;
      }
    );

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

export { useReturnAtomizer };

export {
  //Money
  useCentsToDollars,
  useDollarsToCents,
  useMRVAddItem,
};

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
