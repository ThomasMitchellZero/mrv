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

  const handleSetInvoice = (invoNum) => {
    setExchState((draft) => {
      const outInvoProducts = cloneDeep(invoiceContext[invoNum].products);

      for (const i of Object.keys(outInvoProducts)) {
        outInvoProducts[i].productDetails = cloneDeep(productContext[i]);

        outInvoProducts[i].qtyExchanging = defaultVals.dfExchQty;
        outInvoProducts[i].pickupQty = defaultVals.dfExchQty;
      }
      draft.activeOrder = invoiceContext[invoNum].invoiceDetails.orderNum;
      draft.invoiceProducts = outInvoProducts;
    });
  };

  const setOrder = (orderNum) => {
    console.log(ordersContext[orderNum].invoice);
  };

  const handleSetSaleRecord = ({ srType, srKey }) => {
    // Eventually we will handle different types of sales records.
    switch (srType) {
      case srt.order.k:
        setOrder(srKey);
        break;

      default:
        console.log("No matching record");
    }
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
