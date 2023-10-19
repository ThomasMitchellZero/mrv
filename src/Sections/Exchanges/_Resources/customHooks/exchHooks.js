import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import { ProdClass } from "../../../../globalFunctions/globalJS_classes";

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

//// Hooks for Swap handling ////

const useMergeItemData = () => {
  // Merge stock product data with sale-specific data.

  const exchCtx = useOutletContext();
  const productContext = useContext(ProductContext);

  return ({ itemNum, invoItemDataRt = {} }) => {
    let outMergedProdDetails = {
      ...cloneDeep(productContext[itemNum]),
      // if product isn't from an invoice, this will be {}
      ...cloneDeep(invoItemDataRt),
    };

    // everything in this Rt is cloned, so it's safe to work.
    return outMergedProdDetails;
  };
};

const useMakeSwap = () => {
  // purpose is to produce a fully-populated ExchItem obj.
  // All qtys start at default values.

  const exchCtx = useOutletContext();

  const defaultVals = exchCtx.exchSession.defaultValues;

  const makeSwapObj = ({
    returnItemInfo = {},
    replaceItemInfo = returnItemInfo,
  }) => {
    // populate the Swap object
    const outSwapObj = {
      swapClass: replaceItemInfo.prodClass,
      moneyObj: {},
      returningItem: {
        qtySold: returnItemInfo.quantity,
        returnQty: defaultVals.dvPickupQty,
        pickupQty: defaultVals.dvPickupQty,
        productDetails: returnItemInfo,
        itemDispo: null,
      },
      replacementItem: {
        replaceQty: defaultVals.dvExchQty,
        deliveryQty: defaultVals.dvExchQty,
        productDetails: replaceItemInfo,
      },
    };
    return outSwapObj;
  };

  return makeSwapObj;
};

const useSwapFilter = () => {
  const swapFilterFor = ({
    targetSwap,
    includeEmpty = false,
    mainItem = false,
    accessory = false,
    lpp_3yr = false,
    lpp_5yr = false,
    service = false,
    anyProdClass = false,
  }) => {
    // True if Repl or Return has qty, or if includeEmpty
    const hasValidContent =
      includeEmpty ||
      targetSwap.returningItem.returnQty ||
      targetSwap.replacementItem.replaceQty;

    const hasValidProdClass =
      (mainItem && targetSwap.swapClass === "mainItem") ||
      (accessory && targetSwap.swapClass === "accessory") ||
      (lpp_3yr && targetSwap.swapClass === "lpp_3yr") ||
      (lpp_5yr && targetSwap.swapClass === "lpp_5yr") ||
      (service && targetSwap.swapClass === "service") ||
      anyProdClass;

    return hasValidContent && hasValidProdClass;
  };

  return swapFilterFor;
};

const useSwapGroupsArr = () => {
  const exchCtx = useOutletContext();
  const exchSwapGroups = exchCtx.exchSession.allSwapGroups;

  const outArr = [];
  for (const [swapGroupKey, swapGroupValue] of Object.entries(exchSwapGroups)) {
    for (const [thisSwapkey, thisSwapValue] of Object.entries(
      swapGroupValue.swaps
    )) {
      const swapDataObj = {
        swapGroupKey,
        swapGroupValue,
        thisSwapkey,
        thisSwapValue,
      };
      outArr.push(swapDataObj);
    }
  }
  return outArr;
};

export {
  useCentsToDollars,
  useDollarsToCents,
  useSwapFilter,
  useSwapGroupsArr,
  useMakeSwap,
  useMergeItemData,
};
