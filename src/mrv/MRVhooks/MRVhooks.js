import InvoiceContext from "../../store/invoice-context";
import ProductContext from "../../store/product-context";
import InvoContext from "../../store/invo-context";
import { useOutletContext, useNavigate } from "react-router";

import { useContext, useRef, useEffect } from "react";

import {
  Invoice_SR,
  sessionItem,
  InvoProduct,
  returnAtom,
  singleDispo,
  moneyObj,
  baseReturnState,
  navNode,
  SingleDispo,
  ItemDisposObj,
} from "../../globalFunctions/globalJS_classes";

import { cloneDeep, isEmpty } from "lodash";

//// Money Handlers ////

const centsToDollars = (priceInCents = 4200) => {
  return Number.parseFloat(priceInCents / 100).toFixed(2);
};

const useCentsToDollars = () => {
  return centsToDollars;
};

const dollarsToCents = (priceInDollars) => {
  return Number.parseFloat(priceInDollars.toFixed(2)) * 100;
};

const useDollarsToCents = () => {
  return dollarsToCents;
};

const greenify = (numberVal) => {
  const isNeg = numberVal < 0 && typeof numberVal === "number";

  return isNeg ? "color__green__text" : "";
};

const mo_multiply = ({ targetMO, factor = 1 }) => {
  if (targetMO instanceof moneyObj) {
    const outMoneyObj = cloneDeep(targetMO);
    outMoneyObj.unitBaseValue *= factor;
    outMoneyObj.salesTax *= factor;
    return outMoneyObj;
  }
};

const moneyObjDelta = ({
  refundMo = new moneyObj({}),
  chargeMo = new moneyObj({}),
}) => {
  const outMoneyObj = new moneyObj({});

  outMoneyObj.unitBaseValue = chargeMo.unitBaseValue - refundMo.unitBaseValue;
  outMoneyObj.salesTax = chargeMo.salesTax - refundMo.salesTax;

  return outMoneyObj;
};

const atomsMonetizer = (arrayOfAtoms) => {
  // returns a new moneyObj populated from all atoms in the array
  // salesTaxRate set to undefined because there is no guarantee that all atoms will have the same salesTaxRate.
  const refAtom = new returnAtom({});

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

const centStringifier = ({
  valueInCents,
  zeroAs0 = false,
  invertVal = false,
}) => {
  // this hook might be bullshit.

  // returns a dollar string from a cent value.  We should ONLY be using $ values in the display. All calculations should be done in cents.
  const outValInCents = invertVal ? -valueInCents : valueInCents;
  let outMoneyStr =
    outValInCents || zeroAs0 ? `$${centsToDollars(outValInCents)}` : "- -";
  return outMoneyStr;
};

export {
  centsToDollars,
  dollarsToCents,
  useCentsToDollars,
  useDollarsToCents,
  greenify,
  mo_multiply,
  atomsMonetizer,
  moneyObjDelta,
  centStringifier,
};

const populateDisposArr = ({ sessionSt = baseReturnState({}) }) => {
  // returns an array of SingleDispo objects from an array of return items.
  const refItemDisposObj = new ItemDisposObj({});
  const refSingleDispo = new SingleDispo({});
  const refItemAtom = new returnAtom({});
  const refDefaultState = baseReturnState({});

  const RtrnItemsList = cloneDeep(sessionSt.returnItems);

  console.log("RtrnItemsList", RtrnItemsList);

  const defaultDispos = {
    noWorky: new SingleDispo({
      dispoQty: 0,
      keyStr: "noWorky",
      strLabel: "Doesn't Work",
    }),
    missingParts: new SingleDispo({
      dispoQty: 0,
      keyStr: "missingParts",
      strLabel: "Missing Parts",
    }),
    broken: new SingleDispo({
      dispoQty: 0,
      keyStr: "broken",
      strLabel: "Broken",
    }),
    cosmetic: new SingleDispo({
      dispoQty: 0,
      keyStr: "cosmetic",
      strLabel: "Cosmetic",
    }),
    scratchDent: new SingleDispo({
      dispoQty: 0,
      keyStr: "scratchDent",
      strLabel: "Scratched / Dented",
    }),
  };

  const aDisposArr = RtrnItemsList.map((iAtom) => {
    const outDispoObj = new ItemDisposObj({
      dispoItemNum: iAtom.atomItemNum,
      itemQty: iAtom.atomItemQty,
      allDisposObj: defaultDispos,
    });
    return outDispoObj;
  });

  return aDisposArr;
};

export { populateDisposArr };

function useNodeNav({ sessionState, setSessionState }) {
  const navigate = useNavigate();

  const nodeNav = (targetNodeKey = "") => {
    const refBreadcrumbNode = navNode({});
    const refDefaultState = baseReturnState({});

    if (sessionState.oNavNodes[targetNodeKey]) {
      const outNavNodesObj = cloneDeep(sessionState.oNavNodes);

      // all nodes prior to the target remain enabled.
      let nodeAfterTarget = false;

      for (const thisNode of Object.values(outNavNodesObj)) {
        thisNode.selected = false; // deselect all nodes
        thisNode.disabled = nodeAfterTarget; // deactivate all nodes

        // once target node is reached, flip bool so all subequent nodes are disabled.
        if (thisNode.keyStr === targetNodeKey) {
          nodeAfterTarget = true;
        }
      }

      // activate the target node and make it available.
      outNavNodesObj[targetNodeKey].selected = true;

      setSessionState((draft) => {
        draft.oNavNodes = outNavNodesObj;
      });
      navigate(outNavNodesObj[targetNodeKey].routeStr);
    }
  };

  return nodeNav;
}

export { useNodeNav };

////////////////////////////////////////////////////////////////////////////////
/////////////////         Session Input Handlers       /////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Make a change to the items in the current session state.

function useSetSessionItems({ sessionState, setSessionState }) {
  const itemsCtx = useContext(ProductContext);

  function setSessionItems({
    itemsArrRouteStr = "returnItems",
    itemAtom = new returnAtom({}),
    newQty = 0,
    actionType = "add",
    add_edit_remove = "add edit remove",
  }) {
    const refDefaultState = baseReturnState({});
    const refAtom = new returnAtom({});

    let outSessionState = cloneDeep(sessionState);
    let outItemsArr = outSessionState[itemsArrRouteStr];
    const thisItemNum = itemAtom.atomItemNum;

    // universal validity checks
    if (
      itemsCtx[itemAtom.bifrostKey] === undefined ||
      !Array.isArray(outItemsArr)
    ) {
      console.log("You FAIL!");
      return false;
    }

    // get index of the itemAtom to be operated on.
    let itemIndex = outItemsArr.findIndex((thisItem) => {
      return thisItem.atomItemNum === thisItemNum;
    });

    // this is OK for 'remove' because this itemNum will get filtered no matter what.
    if (itemIndex === -1) {
      outItemsArr.push(
        new returnAtom({ atomItemNum: thisItemNum, atomItemQty: 0 })
      );
      itemIndex = outItemsArr.length - 1;
    }

    const actionMethods = {
      add: () => {
        outItemsArr[itemIndex].atomItemQty += Number(newQty);
      },
      edit: () => {
        outItemsArr[itemIndex].atomItemQty = Number(newQty);
      },
      remove: () => {
        // Remove this item and any items with this item as a parent.
        outItemsArr = outItemsArr.filter((thisItem) => {
          return thisItem.atomItemNum !== thisItemNum;
        });
        outItemsArr = outItemsArr.filter((thisItem) => {
          return thisItem.parentKey !== thisItemNum;
        });
      },
    };

    // run the specified action.
    actionMethods[actionType]();
    outSessionState[itemsArrRouteStr] = outItemsArr;
    outSessionState = returnAutoDeriver(outSessionState);

    setSessionState(() => {
      return outSessionState;
    });
  }
  return setSessionItems;
}

// Make a change to the invos in the Session state
function useSetSessionInvos({ sessionState, setSessionState }) {
  const invosCtx = useContext(InvoContext);

  const setSessionInvos = ({
    invosRtStr = "sessionInvos",
    invoNum = 0,
    actionType = "add",
    add_remove = "add remove",
  }) => {
    const refDefaultState = baseReturnState({});

    let outSessionState = cloneDeep(sessionState);

    if (!invosCtx[invoNum]) {
      return false;
    }

    const actionMethods = {
      add: () => {
        outSessionState[invosRtStr][invoNum] = cloneDeep(invosCtx[invoNum]);
      },
      remove: () => {
        delete outSessionState[invosRtStr][invoNum];
      },
    };

    actionMethods[actionType]();
    outSessionState = returnAutoDeriver(outSessionState);
    setSessionState(() => {
      return outSessionState;
    });
  };

  return setSessionInvos;
}

////////////////////////////////////////////////////////////////////////////////
/////////////////         Session Value Derivers       /////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

  /////////////////           Atomizaton Layers         //////////////////////////

  // Splits atoms by invo, or no invo if empty. ////////////////////////////////////////

  LoopAtoms_Items_X_Invos: for (const thisItemAtom of outFullyAtomizedArr) {
    const refInvoItem = new Invoice_SR({});
    const refInvoProd = new InvoProduct({});

    // TODO - call sorting function here.

    for (const thisInvoItemAtom of aUM_InvoicedItemAtoms) {
      // Only operate on items with this itemNum.

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

const useReturnAtomizer = () => {
  return returnAtomizer;
};

const autoAddChildAtoms = (clonedDraft) => {
  // Papa?  Is it you?

  // We need this because the only way we can tell if an item has a parent is from the invoice.

  const refSessionState = baseReturnState({});
  const refItemAtom = new returnAtom({});

  const returnedItemsArr = clonedDraft.returnItems;
  const sessionInvos = clonedDraft.sessionInvos;
  // array of all atoms in all invoices in the session.
  const itemsSold = Object.values(sessionInvos).flatMap((thisInvo) => {
    return thisInvo.itemAtomsArr;
  });

  for (const thisAtom of itemsSold) {
    // check if atom has a parent
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
          thisItem.atomItemNum === thisAtom.atomItemNum
          //&& thisItem.parentKey === parentItemNum
        );
      }).length > 0;

    // if this is a child item and it is not already in the returnItems but its parent is, add it.
    if (parentItemNum && parentReturned && !childReturned) {
      /* */
      const outAtom = cloneDeep(thisAtom);
      outAtom.atomItemQty = 0;
      outAtom.atomInvoNum = "";
      outAtom.atomMoneyObj = new moneyObj({});

      clonedDraft.returnItems.push(outAtom);
    }
  }
  return clonedDraft;
};

function returnAutoDeriver(clonedDraft) {
  // purpose is to perform all derivations needed when performing a return.
  // returns a new draft, which must be assigned to the state.

  const refDefaultState = baseReturnState({});
  let outSessionState = cloneDeep(clonedDraft);

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

  outSessionState.totalReplacementValue = atomsMonetizer(
    outSessionState.replacementItems
  );

  outSessionState.cashDeltaMO = moneyObjDelta({
    refundMo: outSessionState.totalReturnValue,
    chargeMo: outSessionState.totalReplacementValue,
  });

  outSessionState.wholeBigNumber = outSessionState.totalReturnValue.unitTotal;

  return outSessionState;
}

const useReturnAutoDeriver = () => {
  return returnAutoDeriver;
};

export {
  useReturnAtomizer,
  useSetSessionItems,
  useSetSessionInvos,
  useReturnAutoDeriver,
};
