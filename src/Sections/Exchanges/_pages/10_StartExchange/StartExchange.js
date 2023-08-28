import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { MRVinput90 } from "../../../../mrv/mrv-components/inputs/MRVinput";

import {
  actPan,
  saleRecordTypes,
} from "../../_Resources/glossary/glossaryExch";
import { useSetActivePanels } from "../../_Resources/customHooks/useSetActivePanels";
import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";
import OrdersContext from "../../../../store/orders-context";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import cloneDeep from "lodash.clonedeep";

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

  const setInvoice = (invoNum) => {
    return { invoiceNum: invoNum };
  };

  const setOrder = (orderNum) => {
    console.log(ordersContext[orderNum].invoice);
    return {
      out: "Your papers are in order, comrade",
      invoiceNum: ordersContext[orderNum].invoice,
    };
  };


  const handleSetSaleRecord = ({ srType, srKey }) => {
    // Data that varies with record type.

    let outSRTypeProperties =
      srType === srt.order.k
        ? setOrder(srKey)
        : srType === srt.invoice.k
        ? setInvoice(srKey)
        : {};

    // ----Properties for all cases----//

    // Populate Items in the exchange

    const invoiceItemsRoute =
      invoiceContext[outSRTypeProperties.invoiceNum].products;

    let outItemsInExch = {};

    // loop through all item numbers of this invoice
    for (const i of Object.keys(invoiceItemsRoute)) {

      //data routes
      const thisInvoProductRt = cloneDeep(invoiceItemsRoute[i]);

      const getItemDetails = ()=>{
        let outItemDetails = cloneDeep(productContext[i])

        // If we need the Sale price and not Catalog price, use this:
        // outItemDetails.price = thisInvoProductRt.price;
        return outItemDetails
      }

      //populate the main object for this item.
      outItemsInExch[i] = {
        qtySold: thisInvoProductRt.quantity,
        qtyExchanging: defaultVals.dvExchQty,
        returningItems: {
          pickupQty: defaultVals.dvPickupQty,
          productDetails: getItemDetails(),
          itemDispo: null,
        },
        replacementItems: {
          deliveryQty: defaultVals.dvExchQty,
          productDetails: getItemDetails(),
        },
      };
    }

    //set the Exch Session State
    setExchState((draft) => {
      draft.activeSaleRecord = outSRTypeProperties;
      draft.itemsInExch = outItemsInExch;
    });
  };

  const handleClick = () => {
    handleSetSaleRecord({ srType: srt.order.k, srKey: "X11111111" });

    exchNav({ routeStr: "chooseitems" });
  };

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main exch-rows ${classes.container}`}>
        <ExchHeader headerTitle="Start Exchange" hasCluster={false} />
        <div className={`main_content main_col ${classes.main}`}>
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
