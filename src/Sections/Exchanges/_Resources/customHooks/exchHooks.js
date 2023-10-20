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

//// Hooks for Delivery Groups ////////

function useGroupAppointments() {
  const exchCtx = useOutletContext();
  const swapGroupArr = useSwapGroupsArr();
  const swapFilter = useSwapFilter();
  const setSessionSt = exchCtx.setExchSession;
  const defaultTime = exchCtx.exchSession.defaultValues.dvScheduledTime;

  return () => {
    let outShipmentsObj = {};
    // apptIndex isn't used in logic.  Just for the UI.
    let apptIndex = 1;
    let activeDC = null;

    for (const i of swapGroupArr) {
      if (
        swapFilter({
          targetSwap: i.thisSwapValue,
          mainItem: true,
          accessory: true,
        })
      ) {
        const thisItemPickupQty = i.thisSwapValue.returningItem.pickupQty;
        const thisItemDelivQty = i.thisSwapValue.replacementItem.deliveryQty;

        if (i.thisSwapkey === ProdClass({ mainItem: true })) {
          // Only using MainItem's DC because I am not dealing with this crap.
          activeDC =
            i.thisSwapValue.replacementItem.productDetails.dcLocations[0];
        }

        //Check if this DC code already exists in outShipmentsObj
        if (!outShipmentsObj[activeDC]) {
          outShipmentsObj[activeDC] = {
            appointmentIndex: apptIndex,
            apptItemKeys: [],
            totalApptPickupQty: 0,
            totalApptDeliveryQty: 0,
            timeSlot: "",
            apptTime: defaultTime,
            address: {
              street: "1600 Pennsylvania Avenue",
              addressStr: "Washington, DC 20001",
            },
            deliveryInstructions:
              "Leave it on the doorstep and get the hell outta here",
          };
          apptIndex++;
        }
        //add this item to the array of its DC
        outShipmentsObj[activeDC].apptItemKeys.push(i);

        //increase this appointment's pickup and delivery qtys
        outShipmentsObj[activeDC].totalApptPickupQty += thisItemPickupQty;
        outShipmentsObj[activeDC].totalApptDeliveryQty += thisItemDelivQty;
      }
    }

    setSessionSt((draft) => {
      draft.deliveryGroups = outShipmentsObj;
    });
  };
}


export {
  useCentsToDollars,
  useDollarsToCents,
  useGroupAppointments,
  useMakeSwap,
  useMergeItemData,
  useSwapFilter,
  useSwapGroupsArr,

};
