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

  const dataModel = {
    keyItemNum: {
      qtySold: 2,
      qtyExchanging: 2,
      returningItems: {
        pickupQty: 1,
        productDetails: {},
        price: 11111,
        tax: 111,
        itemDispo: null,
      },
      replacementItems: {
        deliveryQty: 2,
        productDetails: {},
      },
    },
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

    let outItemsInExch = {};

    //const invoiceRoute = invoiceContext[srTypeProperties.invoice];

    //console.log(invoiceRoute);

    /*    

        for (const i of Object.keys(srTypeProperties.invoice)) {}
      outInvoProducts[i].productDetails = cloneDeep(productContext[i]);

      outInvoProducts[i].qtyExchanging = defaultVals.dfExchQty;
      outInvoProducts[i].pickupQty = defaultVals.dfExchQty;
    }
    draft.activeOrder = invoiceContext[invoNum].invoiceDetails.orderNum;
    draft.invoiceProducts = outInvoProducts; */

    setExchState((draft) => {
      draft.order = outSRTypeProperties;
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
