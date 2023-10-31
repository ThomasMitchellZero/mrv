import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import {
  ProdClass,
  InvoProduct,
} from "../../../../globalFunctions/globalJS_classes";

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

const useMakeSwapMoneyObj = () => {
  // Takes a swap, returns the correct moneyObj.

  const outFn = ({ targetSwap }) => {
    // using ?? 0 because I can't count on any of these values being defined.
    const thisReturnQty = targetSwap.returningItem?.returnQty ?? 0;
    const thisReturnInfo = targetSwap.returningItem?.productDetails ?? 0;

    const thisReplaceQty = targetSwap.replacementItem?.replaceQty ?? 0;
    const thisReplaceInfo = targetSwap.replacementItem?.productDetails ?? 0;

    // in L4L scenario, prices are always the same.
    // XXX This probably should be done when the replacement is assigned?
    const likeForLike = thisReturnInfo.itemNum === thisReplaceInfo.itemNum;
    let replaceTax = likeForLike ? thisReturnInfo.tax : thisReplaceInfo.tax;
    let replacePrice = likeForLike
      ? thisReturnInfo.price
      : thisReplaceInfo.price;

    // vals are $ * quantity returning / replacing.
    // Customer charges show as positive, refunds show as negative.
    const outCostDif =
      replacePrice * thisReplaceQty - thisReturnInfo.price * thisReturnQty;
    const outTaxDif =
      replaceTax * thisReplaceQty - thisReturnInfo.tax * thisReturnQty;

    const outMoneyObj = newMoneyObj({
      costDif: outCostDif,
      taxDif: outTaxDif,
      charge: outCostDif > 0 ? outCostDif : 0,
      refund: outCostDif < 0 ? outCostDif : 0,
      fullItemBalance: outCostDif,
    });

    return outMoneyObj;
  };

  return outFn;
};

//// Hooks for Swap handling ////

const useMergeItemData = () => {
  // Merge stock product data with sale-specific data.

  const productCtx = useContext(ProductContext);

  const mergeItemData = ({ itemNum, invoItemDataRt, prodClass = null }) => {
    //OK, so I think this is fine, and the issue is that the itemNum isn't getting to here.

    const testCtx = productCtx[itemNum];
    console.log(itemNum);
    console.log(testCtx);
    const ctxProduct = cloneDeep(productCtx[itemNum]);

    // new Items (e.g. a different replacement) won't have an invoice.  To ensure property consistency, give it an 'invoice' from the item's data.
    const invoObj = invoItemDataRt
      ? cloneDeep(invoItemDataRt)
      : new InvoProduct({
          quantity: 0,
          price: ctxProduct.price,
          tax: makeTax(ctxProduct.price),
          childItemsObj: ctxProduct.reqAccessories,
          prodClass: null,
        });

    let outMergedProdDetails = {
      ...ctxProduct,
      ...invoObj,
    };

    // everything in this Rt is cloned, so it's safe to work.
    return outMergedProdDetails;
  };

  return mergeItemData;
};

const useMakeSwap = () => {
  // purpose is to produce a fully-populated ExchItem obj.

  const exchCtx = useOutletContext();

  const defaultVals = exchCtx.exchSession.defaultValues;

  //PROBLEM - needs to be able to handle an empty returnItem.

  const makeSwapObj = ({ returnItemInfo = null }) => {
    // populate the Swap object
    const outSwapObj = {
      swapClass: returnItemInfo?.prodClass,
      moneyObj: {},
      returningItem: {
        itemNum: returnItemInfo?.itemNum,
        qtySold: returnItemInfo?.quantity ?? 0,
        returnQty: defaultVals.dvExchQty,
        pickupQty: defaultVals.dvPickupQty,
        productDetails: returnItemInfo ?? {},
        itemDispo: null,
      },
      replacementItem: {
        replaceQty: defaultVals.dvExchQty,
        deliveryQty: defaultVals.dvExchQty,
        productDetails: returnItemInfo,
      },
    };
    return outSwapObj;
  };

  return makeSwapObj;
};

const useSetSGreplacements = () => {
  const mergeProdInfo = useMergeItemData();
  const makeSwap = useMakeSwap();
  const productCtx = useContext(ProductContext);

  // Takes a SwapGroup and optional Replacement, returns SG with children fully populated via business rules.
  const setSGreplacements = ({
    targetSwapGroup,
    replacementItemNum = targetSwapGroup.swaps.mainItem.returningItem.itemNum,
  }) => {
    const oldSG = targetSwapGroup.swaps;

    let outSG = cloneDeep(oldSG);
    const exchQty = outSG.mainItem.returningItem.returnQty;

    // Determine if this is a Like 4 Like exchange.
    const sameItem = outSG.mainItem.returningItem.itemNum == replacementItemNum;

    // Handle Main Item ///////////////////////////////////////////////////

    let outMainItem = sameItem // If Like for Like:
      ? // Copy Prod Details from Return, since prices are the same.
        outSG.mainItem.returningItem.productDetails
      : // Else, make a new replacement by Merging this itemNum.
        mergeProdInfo({ itemNum: replacementItemNum, prodClass: "mainItem" });
    // Populate.

    outSG.mainItem.replacementItem = {
      productDetails: outMainItem,
      replaceQty: exchQty,
      deliveryQty: exchQty,
    };

    // Handle Accessory ///////////////////////////////////////////////////
    let outAccessory = outMainItem.reqAccessories;

    if (outAccessory) {
      // If the replacement has a required accessory:
      outAccessory = mergeProdInfo({
        itemNum: outAccessory,
        prodClass: "accessory",
      });

      // Make the accessory row if it doesn't exist
      outSG.accessory ||= makeSwap({});

      // Populate the row
      outSG.accessory.replacementItem = {
        productDetails: outAccessory,
        replaceQty: exchQty,
        deliveryQty: exchQty,
      };
      outSG.accessory.swapClass = "accessory";
    }

    // Handle LPP ////////////////////////////////

    // NEEDS WORK.
    const handleLPP = (lppStr) => {
      let lppRt = outSG.swaps[lppStr];
      lppRt.replacementItem.productDetails = lppRt.returningItem.productDetails;
    };

    return outSG;
  };
  return setSGreplacements;
};

const useSwapGrouper = () => {
  //Purpose is to populate a SINGLE swap group.
  const mergeItemData = useMergeItemData();
  const makeSwap = useMakeSwap();
  const setSGreplacements = useSetSGreplacements();

  const makeBaseSG = ({ itemNum, itemObj, targetObj }) => {
    //Combine the invoice and product data
    const mergedProdInfo = mergeItemData({
      itemNum: itemNum,
      invoItemDataRt: itemObj,
    });

    console.log(targetObj);

    //Make a new swap, assign to target with key of prodClass
    targetObj[mergedProdInfo.prodClass] = makeSwap({
      // Only one argument b/c Like4Like is default
      returnItemInfo: mergedProdInfo,
      replaceItemInfo: mergedProdInfo,
    });

    const thisProdChildRt = mergedProdInfo?.childItemsObj;

    if (!isEmpty(thisProdChildRt)) {
      for (const [childItemNum, childItemObj] of Object.entries(
        thisProdChildRt
      )) {
        makeBaseSG({
          itemNum: childItemNum,
          itemObj: childItemObj,
          targetObj: targetObj,
        });
      }
    }
  };

  const swapGrouper = ({ itemNum, itemObj, mainReplItem = itemNum }) => {
    let outSwapGroup = {};
    makeBaseSG({ itemNum: itemNum, itemObj: itemObj, targetObj: outSwapGroup });

    /*
      outSwapGroup = setSGreplacements({
      outSG: outSwapGroup,
      replacementItemNum: 9900,
    });
    
    
    */

    return outSwapGroup;
  };

  return swapGrouper;
};

const useSwapFilter = () => {
  // Takes a swap, returns true if it has a valid quantity AND has at least one of the prodClass arguments.
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
  //Money
  useCentsToDollars,
  useDollarsToCents,
  useMakeSwapMoneyObj,
  //Group Appts
  useGroupAppointments,
  // Swap stuff
  useMakeSwap,
  useMergeItemData,
  useSwapFilter,
  useSwapGroupsArr,
  useSwapGrouper,
  useSetSGreplacements,
};
