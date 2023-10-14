import InvoiceContext from "../store/invoice-context";
import ProductContext from "../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import { cloneDeep, isEmpty } from "lodash";



const useMakeWAP = () => {
  // purpose is to produce a fully-populated ExchItem obj.
  // All qtys start at default values.

  const exchCtx = useOutletContext();
  console.log(exchCtx.session);
  const defaultVals = exchCtx.session.defaultValues;

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

  useMakeWAP,

};
