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



const useReturnAtomizer = () => {
  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);

  const returnAtomizer = ({ sessionItemsObj = {}, sessionInvosObj = {} }) => {
    // accepts an object of Session Items and an array of Session Invos

    const refInvoItem = new Invoice_SR({});
    const refInvoProd = new InvoProduct({});
    const refSessionItem = new sessionItem({});
    const refSingleDispo = new singleDispo({});

    // Outputs to be modified during Matchmaking.
    const oCloneSessnItems = cloneDeep(sessionItemsObj);
    const oCloneSessnInvos = cloneDeep(sessionInvosObj);

    let outFullyAtomizedArr = [];

    // Turns the UMitems into atoms. //////////////////////////////////////////
    const aAtomizedByItem = [];

    for (const oSessnItem of Object.values(oCloneSessnItems)) {
      const outSplitXitem = new returnAtom({
        atomItemNum: oSessnItem.itemNum,
        atomItemQty: oSessnItem.itemQty,
      });
      aAtomizedByItem.push(outSplitXitem);
    }

    outFullyAtomizedArr = cloneDeep(aAtomizedByItem);

    ////////////////////////////////////////////////////////////////////////////////

    ////////////////////////      Filter Layers    /////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////

    /*
    TL;DR:  
      -Clone the atoms filtered in the previous cycle.  

      -Store a clone of the values for the next layer of filtration outside both loops.  
        -These are the master count of matchable units of the filtration layer, so their value should NEVER reset during this call of the Atomizer.  Otherwise their values could be repeat-counted.

      -Loop thru each of those atoms
      -This atom's AtomQty is the master count for the outer loop, so we decrement the iterator atom's Qty directly.
        -Loop thru the item-associated instances of the current filtration layer
          -Deduct matched qty from both the current atom and the current filter condition.
          -Add matched qty to a new Atom and push it.
          -If the current filter condition is spent, delete it.
          -If the outer atom is spent, Continue to the next atom.
        
        -If we got through the inner loop without triggering a Continue, some qty of this atom has failed to match any filter conditions.  
        -That means it doesn't match any of the newly-filtered atoms, so push it.  The Outer Loop rolls on.  
    */

    // Splits atoms by invo, or no invo if empty. ////////////////////////////////////////
    const aAtomizedByInvoice = [];

    LoopThruAtomsXInvos: for (const itemAtom of outFullyAtomizedArr) {
      const refInvoItem = new Invoice_SR({});
      const refInvoProd = new InvoProduct({});

      // make array of invoItems, sorts them by price of current item.
      let aPMinvos = Object.keys(oCloneSessnInvos);
      const aInvosByItemCost = aPMinvos; // actual price sorter TBD

      for (const thisInvoKey of aInvosByItemCost) {
        const thisInvoItemRt =
          oCloneSessnInvos[thisInvoKey].products?.[itemAtom.atomItemNum];

        if (thisInvoItemRt) {
          //check if this invoice HAS the item

          const nInvoItemQty = thisInvoItemRt.quantity;
          const nMatchedQty = Math.min(itemAtom.atomItemQty, nInvoItemQty);

          // decrement the atomItem and invoItem qtys
          itemAtom.atomItemQty -= nMatchedQty;
          thisInvoItemRt.quantity -= nMatchedQty;

          // Increment Output
          const outAtomXinvo = new returnAtom({
            ...itemAtom.vals(),
            atomItemQty: nMatchedQty,
            atomInvoNum: thisInvoKey,
            atomMoneyObj: {},
          });

          aAtomizedByInvoice.push(outAtomXinvo);

          //Cleanup

          if (!nInvoItemQty)
            delete oCloneSessnInvos[thisInvoKey].products?.[
              itemAtom.atomItemNum
            ];
          if (!itemAtom.atomItemQty) continue LoopThruAtomsXInvos;
        }
      } // ------------- End Of Inner Loop --------------------

      // Continue wasn't triggerd, so this atom has some unmatched qty.  Push it.
      aAtomizedByInvoice.push(itemAtom);
    }

    outFullyAtomizedArr = cloneDeep(aAtomizedByInvoice);

    const aAtomizedByDispo = [];

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
