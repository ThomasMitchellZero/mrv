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

const useGenerateChildren = () => {};

const useMakeMergedItemData = () => {
  // Merge stock product data with sale-specific data.

  const exchCtx = useOutletContext();
  const exchItems = exchCtx.exchSession.itemsInExchange;

  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);

  return ({ itemNum, invoItemDataRt = {}, prodQty }) => {
    let outMergedProdDetails = {
      ...cloneDeep(productContext[itemNum]),
      // if product isn't from an invoice, this will be {}
      ...cloneDeep(invoItemDataRt),
    };

    // Because this may need to be provided independently
    if (prodQty) {
      outMergedProdDetails.quantity = prodQty;
    }

    // everything in this Rt is cloned, so it's safe to work.
    return outMergedProdDetails;
  };
};

export { useCentsToDollars, useDollarsToCents, useMakeMergedItemData };
