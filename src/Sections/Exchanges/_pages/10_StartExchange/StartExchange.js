import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { saleRecordTypes } from "../../../../globalFunctions/globalJS_classes";
import {
  InvoProduct,
  ProdClass,
} from "../../../../globalFunctions/globalJS_classes";

import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";
import OrdersContext from "../../../../store/orders-context";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import {
  useMergeItemData,
  useMakeSwap,
  useSwapGrouper,
} from "../../_Resources/customHooks/exchHooks";

import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

import { cloneDeep, isEmpty } from "lodash";

function ExchStartExchange() {
  const exchCtx = useOutletContext();
  const defaultVals = exchCtx.exchSession.defaultValues;
  const setExchState = exchCtx.setExchSession;
  const invoiceContext = useContext(InvoiceContext);
  const ordersContext = useContext(OrdersContext);
  const exchNav = useExchNav();
  const mergeItemData = useMergeItemData();
  const makeSwap = useMakeSwap();
  const swapGrouper = useSwapGrouper();
  const srt = saleRecordTypes;

  /* ---- SHARED FUNCTIONS ---- */

  const makeSrObj = ({ type, key, invoiceNum }) => {
    return {
      type,
      key,
      invoiceNum,
    };
  };

  console.log(new InvoProduct({ quantity: 3 }));

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

  //// Swap Stuff ///////////////// ////////////////// /////////////

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

      // Loop through all the products sold on this invoice and create a swapGroup for each.
      for (const [thisInvoKey, thisInvoObj] of Object.entries(invoiceItemsRt)) {
        outAllSwaps[thisInvoKey] = {
          swaps: swapGrouper({
            itemNum: thisInvoKey,
            itemObj: thisInvoObj,
          }),
        };
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
