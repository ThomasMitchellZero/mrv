import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { actPan } from "../../_Resources/glossary/glossaryExch";
import { useSetActivePanels } from "../../_Resources/customHooks/useSetActivePanels";
import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import cloneDeep from "lodash.clonedeep";

function ExchStartExchange() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);
  const exchNav = useExchNav();

  /* ---- SHARED FUNCTIONS ---- */

  const handleSetInvoice = (invoNum) => {
    setExchState((draft) => {
      const outInvoProducts = cloneDeep(invoiceContext[invoNum].products);

      for (const i of Object.keys(outInvoProducts)) {
        outInvoProducts[i].productDetails = cloneDeep(productContext[i]);
        outInvoProducts[i].qtyExchanging = 0;
      }
      draft.activeOrder = invoiceContext[invoNum].invoiceDetails.orderNum;
      draft.invoiceProducts = outInvoProducts;
    });
  };

  const handleClick = () => {
    handleSetInvoice("XAAA");
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
