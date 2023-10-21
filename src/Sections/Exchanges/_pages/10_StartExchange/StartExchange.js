import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { saleRecordTypes } from "../../../../globalFunctions/globalJS_classes";

import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";
import OrdersContext from "../../../../store/orders-context";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { useExchItemTotaler } from "../../_Resources/customHooks/moneyHooks";

import {
  useMergeItemData,
  useMakeSwap,
} from "../../_Resources/customHooks/exchHooks";

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

  //// Post-swap, delete from HERE ......


  //// Swap Stuff ///////////////// ////////////////// /////////////

  const makeSwapGroup = ({ itemNum, itemObj, targetObj }) => {
    //Combine the invoice and product data
    const mergedProdInfo = mergeItemData({
      itemNum: itemNum,
      invoItemDataRt: itemObj,
    });

    //Make a new swap, assign to target with key of prodClass
    targetObj[mergedProdInfo.prodClass] = makeSwap({
      // Only one argument b/c Like4Like is default
      returnItemInfo: mergedProdInfo,
    });

    const thisProdChildRt = mergedProdInfo?.childItemsObj;

    if (!isEmpty(thisProdChildRt)) {
      for (const [childItemNum, childItemObj] of Object.entries(
        thisProdChildRt
      )) {
        makeSwapGroup({
          itemNum: childItemNum,
          itemObj: childItemObj,
          targetObj: targetObj,
        });
      }
    }
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


      //// Swaps

      const activeInvoNum = draft.activeSaleRecord.invoiceNum;
      const invoiceItemsRt = invoiceContext[activeInvoNum].products;

      let outAllSwaps = {};

      for (const [thisInvoKey, thisInvoObj] of Object.entries(invoiceItemsRt)) {
        outAllSwaps[thisInvoKey] = { swaps: {} };
        makeSwapGroup({
          itemNum: thisInvoKey,
          itemObj: thisInvoObj,
          targetObj: outAllSwaps[thisInvoKey].swaps,
        });
      }

      draft.allSwapGroups = outAllSwaps;
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
