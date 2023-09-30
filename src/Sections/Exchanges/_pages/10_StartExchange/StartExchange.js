import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { saleRecordTypes } from "../../../../globalFunctions/globalJS_classes";

import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";
import OrdersContext from "../../../../store/orders-context";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { useExchItemTotaler } from "../../_Resources/customHooks/moneyHooks";

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
    // invoProductObj is separate because for child items, it can have a different source??

    let outMergedProdDetails = {
      ...cloneDeep(productContext[itemNum]),
      ...cloneDeep(invoProductObj),
    };

    delete outMergedProdDetails.quantity; // we're tracking more specific qtys.
    console.log(outMergedProdDetails);

    // everything in this Rt is cloned, so it's safe to work.
    let thisProdChildRt = outMergedProdDetails.childItemsObj;

    // If this product has any child items...
    if (!isEmpty(thisProdChildRt)) {
      // recursively run mergeProdData on any of the kids.
      for (const [childItemNum, childProductObj] of Object.entries(
        thisProdChildRt
      )) {
        thisProdChildRt[childItemNum] = mergeProdData(
          childItemNum,
          childProductObj
        );
      }
    }
    return outMergedProdDetails;
  };

  // Setter for all Sale Records.
  const buildAllExchItems = (draftSt) => {
    // routes to the active Invoice + its products
    const activeInvoNum = draftSt.activeSaleRecord.invoiceNum;
    const invoiceItemsRt = invoiceContext[activeInvoNum].products;
    console.log(activeInvoNum);
    console.log(invoiceItemsRt);

    // Loop through all items listed in Invoice and fully populate.
    for (const invoItemEntry in Object.entries(invoiceItemsRt)) {
      const [thisInvoNum, thisInvObj] = invoItemEntry;
      console.log(thisInvoNum);
      console.log(thisInvObj);

      const thisMergedProdInfo = mergeProdData([thisInvoNum, thisInvObj]);

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
      };
    }
  };

  const handleSetSaleRecord = ({ srType, srKey }) => {
    setExchState((draft) => {
      let outSRTypeProperties =
        srType === srt.order.k
          ? setOrder(srKey)
          : srType === srt.invoice.k
          ? setInvoice(srKey)
          : {}; ///////////////////////

      draft.activeSaleRecord = outSRTypeProperties;

      const activeInvoNum = draft.activeSaleRecord.invoiceNum;
      const invoiceItemsRt = invoiceContext[activeInvoNum].products;
      console.log(activeInvoNum);
      console.log(invoiceItemsRt);

      // Loop through all items listed in Invoice and fully populate.
      for (const [thisInvoItemNum, thisInvoItemObj] of Object.entries(
        invoiceItemsRt
      )) {
        console.log(thisInvoItemObj);
        const thisMergedProdInfo = mergeProdData(
          thisInvoItemNum,
          thisInvoItemObj
        );

        draft.invoiceItems[thisInvoItemNum] = {
          qtySold: thisInvoItemObj.quantity,
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
        };

        // populate the draft state
      }
    });
  };

  const handleSetSaleRecordOLD = ({ srType, srKey }) => {
    // Data that varies with record type.

    let outSRTypeProperties =
      srType === srt.order.k
        ? setOrder(srKey)
        : srType === srt.invoice.k
        ? setInvoice(srKey)
        : {};

    // ----Properties for all cases----//

    // A route to this invoice in invoice-context.
    const invoiceItemsRoute =
      invoiceContext[outSRTypeProperties.invoiceNum].products;

    let outInvoiceItems = {};

    // loop through all products sold on this invoice
    for (const thisItem of Object.keys(invoiceItemsRoute)) {
      // merges itemNum's Product and Invoice data.
      const mergeProdData = (itemNum, invoProductObj) => {
        let outMergedProdObj = {
          ...cloneDeep(productContext[itemNum]),
          ...cloneDeep(invoProductObj),
        };

        delete outMergedProdObj.quantity; // we're tracking more specific qtys.

        // everything in this Rt is cloned, so it's safe to work.
        let thisProdChildRt = outMergedProdObj.childItemsObj;

        // If this product has any child items...
        if (!isEmpty(thisProdChildRt)) {
          // recursively run mergeProdData on any of the kids.
          for (const [key, value] of Object.entries(thisProdChildRt)) {
            thisProdChildRt[key] = mergeProdData(key, value);
          }
        }

        return outMergedProdObj;
      };

      //Routes
      const thisInvoProdDetails = cloneDeep(invoiceItemsRoute[thisItem]);

      const mergedProdInfo = mergeProdData(thisItem, thisInvoProdDetails);

      //populate the main object for this item.
      outInvoiceItems[thisItem] = {
        qtySold: thisInvoProdDetails.quantity,
        qtyExchanging: defaultVals.dvExchQty,
        returningItem: {
          pickupQty: defaultVals.dvPickupQty,
          productDetails: mergedProdInfo,
          itemDispo: null,
        },
        replacementItem: {
          deliveryQty: defaultVals.dvExchQty,
          productDetails: mergedProdInfo,
        },
      };
    }

    //set the Exch Session State
    setExchState((draft) => {
      draft.activeSaleRecord = outSRTypeProperties;
      draft.invoiceItems = outInvoiceItems;
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
