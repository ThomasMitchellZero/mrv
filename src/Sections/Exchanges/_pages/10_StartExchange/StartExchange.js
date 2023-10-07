import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { saleRecordTypes } from "../../../../globalFunctions/globalJS_classes";

import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";
import OrdersContext from "../../../../store/orders-context";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { useExchItemTotaler } from "../../_Resources/customHooks/moneyHooks";

import {
  useDollarsToCents,
  useCentsToDollars,
  useMergeItemData,
  useMakeSwap,
  useTestes,
} from "../../_Resources/customHooks/exchHooks";

import { useMakeWAP } from "../../_Resources/customHooks/useMakeWAP";

import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

import { cloneDeep, isEmpty } from "lodash";

function ExchStartExchange() {
  const exchCtx = useOutletContext();
  const defaultVals = exchCtx.exchSession.defaultValues;
  const setExchState = exchCtx.setExchSession;
  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);
  const ordersContext = useContext(OrdersContext);
  const exchNav = useExchNav();
  const mergeItemData = useMergeItemData();
  const makeSwap = useMakeSwap();
  const srt = saleRecordTypes;

  /* ---- SHARED FUNCTIONS ---- */

  const makeSrObj = ({ type, key, invoiceNum }) => {
    return {
      type,
      key,
      invoiceNum,
    };
  };

  // Sale Record-specific handlers

  const setInvoice = (invoNum) => {
    return makeSrObj({ type: srt.invoice, key: invoNum, invoiceNum: invoNum });
  };

  const setOrder = (orderNum) => {
    return makeSrObj({
      type: srt.order,
      key: orderNum,
      invoiceNum: ordersContext[orderNum].invoice,
    });
  };

  const mergeProdData = (itemNum, invoProductObj) => {
    //Merges the invoice information (e.g price) with full product-context info

    let outMergedProdDetails = mergeItemData({
      itemNum: itemNum,
      invoItemDataRt: invoProductObj,
    });

    // everything in this Rt is cloned, so it's safe to work.
    let thisProdChildRt = outMergedProdDetails.childItemsObj;

    // If this product has any child items...
    if (!isEmpty(thisProdChildRt)) {
      // recursively run mergeProdData on any of the kids.
      for (const [childItemNum, childProductObj] of Object.entries(
        thisProdChildRt
      )) {
        thisProdChildRt[childItemNum] = mergeItemData({
          itemNum: childItemNum,
          childProductObj,
        });
      }
    }
    return outMergedProdDetails;
  };

  // Setter for all Sale Records.
  const buildAllExchItems = (draftSt) => {
    // routes to the active Invoice + its products
    const activeInvoNum = draftSt.activeSaleRecord.invoiceNum;
    const invoiceItemsRt = invoiceContext[activeInvoNum].products;

    // Loop through all items listed in Invoice and fully populate.
    for (const [thisInvoNum, thisInvObj] of Object.entries(invoiceItemsRt)) {
      const thisMergedProdInfo = mergeProdData(thisInvoNum, thisInvObj);

      //XXX I think this is where we want to get the child products, run mergeProdData on them, and populate a new childItems obj. with returningItem and ReplacementItem data.

      // populate the draft state
      draftSt.invoiceItems[thisInvoNum] = {
        qtySold: thisInvObj.quantity,
        qtyExchanging: defaultVals.dvExchQty,
        returningItem: {
          pickupQty: defaultVals.dvPickupQty,
          productDetails: thisMergedProdInfo,
          itemDispo: null,
        },
        replacementItem: {
          deliveryQty: defaultVals.dvExchQty,
          productDetails: thisMergedProdInfo,
        },
        childItems: {},
      };
    }
  };

  //// Swap Stuff ///////////////// ////////////////// /////////////

  const makeAllSwaps = (invoItemsRt) => {
    // Recursively make swap groups out of all items and children

    const outAllSwapsGroup = [];

    // Loop through all items listed in Invoice and fully populate.
    for (const [thisInvoNum, thisInvObj] of Object.entries(invoItemsRt)) {
      console.log(thisInvObj);
      const thisSwapsGroup = []; // the final output

      const thisMergedProdInfo = mergeItemData(thisInvoNum, thisInvObj);
      const thisSwap = makeSwap({ returnItemInfo: thisMergedProdInfo });
      thisSwapsGroup.push(thisSwap);

      const thisProdChildRt = thisMergedProdInfo?.childItemsObj;

      // If this product has any child items...
      if (!isEmpty(thisProdChildRt)) {
        makeAllSwaps(thisProdChildRt);
      }

      outAllSwapsGroup.push(thisSwapsGroup);
    }
    return outAllSwapsGroup;
  };

  const handleSetSaleRecord = ({ srType, srKey }) => {
    setExchState((draft) => {
      let outSRTypeProperties =
        srType === srt.order.k
          ? setOrder(srKey)
          : srType === srt.invoice.k
          ? setInvoice(srKey)
          : {};

      draft.activeSaleRecord = outSRTypeProperties;

      // Delete once Swaps work
      buildAllExchItems(draft);

      //// Swaps

      const activeInvoNum = draft.activeSaleRecord.invoiceNum;
      const invoiceItemsRt = invoiceContext[activeInvoNum].products;

      draft.allSwapGroups = makeAllSwaps(invoiceItemsRt);
    });
  };

  const handleClick = () => {
    handleSetSaleRecord(
      { srType: srt.order.k, srKey: "X11111111" }
      //{ srType: srt.invoice.k, srKey: "XAAA" }
    );

    exchNav({ routeStr: "chooseitems" });
  };

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main ${classes.container}`}>
        <ExchHeader headerTitle="Start Exchange" hasCluster={false} />
        <div className={`main_content ${classes.main}`}>
          <button
            type="button"
            onClick={() => handleClick()}
            className={`mrvBtn primary`}
          >
            Start Exchange
          </button>
        </div>
      </section>
    </section>
  );
}

export { ExchStartExchange };

/*



*/
