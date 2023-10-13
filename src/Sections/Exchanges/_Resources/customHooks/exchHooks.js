import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import { cloneDeep, isEmpty } from "lodash";

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

    // Relevant quantities are tracked elsewhere, so delete?
    delete outMergedProdDetails.quantity;

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
      returningItem: {
        pickupQty: defaultVals.dvPickupQty,
        productDetails: returnItemInfo,
        itemDispo: null,
      },
      replacementItem: {
        deliveryQty: defaultVals.dvExchQty,
        productDetails: replaceItemInfo,
      },
    };
    return outSwapObj;
  };

  return makeSwapObj;
};

export {
  useCentsToDollars,
  useDollarsToCents,
  useMergeItemData,
  useMakeSwap,

};
