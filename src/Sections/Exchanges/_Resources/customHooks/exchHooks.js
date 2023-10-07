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

const useMakeMergedItemData = () => {
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

const useMakeExchItem = () => {
  // purpose is to produce a fully-populated ExchItem obj.
  // All qtys start at 0.
  return ({ returnItemInvoProd, replaceItemNum }) => {};
};

const useTestes = () => {
  const testesOutput = (didOnce = true) => {
    console.log("By the Power Of Left And Right");
    if (didOnce) {
      console.log("ding");
      testesOutput(false);
    }
  };
  return testesOutput;
};

export {
  useCentsToDollars,
  useDollarsToCents,
  useMakeMergedItemData,
  useTestes,
};
