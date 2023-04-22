import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { actPan } from "../../_Resources/glossary/glossaryExch";
import { useSetActivePanels } from "../../_Resources/customHooks/useSetActivePanels";
import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import cloneDeep from "lodash.clonedeep";

function StartExchange() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const invoiceContext = useContext(InvoiceContext);
  const productContext = useContext(ProductContext);



  const nextAp = actPan.selectItems;

  const setActivePanels = useSetActivePanels();
  const navigate = useNavigate();

  /* ---- SHARED FUNCTIONS ---- */


  const handleSetInvoice = (invoNum) => {
    setExchState((draft) => {

      const outInvoProducts = cloneDeep(invoiceContext[invoNum].products)

      for (const i of Object.keys(outInvoProducts)) {
        outInvoProducts[i].productDetails = cloneDeep(productContext[i]);
        outInvoProducts[i].qtyExchanging = "";
      }
      draft.activeOrder = invoiceContext[invoNum].invoiceDetails.orderNum;
      draft.invoiceProducts = outInvoProducts;
    });
  };

  const handleClick = () => {
    handleSetInvoice("XAAA");
    navigate("chooseitems");
    setActivePanels({ main: nextAp.invoItemsTable.k });
  };

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main exch-rows ${classes.container}`}>
        <ExchHeader headerTitle="Start Exchange" hasCluster={false} />
        <div className={`main_content main_col ${classes.main}`}>
          <MRVinput width={"40rem"} extClasses={``} />
          <button
            type="button"
            onClick={() => handleClick()}
            className={`mrvBtn primary`}
          >
            Add Order
          </button>
        </div>
      </section>
    </section>
  );
}

export default StartExchange;

/*



*/
