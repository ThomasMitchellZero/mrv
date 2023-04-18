import classes from "./StartExchange.module.css";

import { actPan } from "../../_Resources/glossary/glossaryExch";
import { useSetActivePanels } from "../../_Resources/customHooks/useSetActivePanels";
import InvoiceContext from "../../../../store/invoice-context";

import { useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function StartExchange() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const invoiceContext = useContext(InvoiceContext);
  const nextAp = actPan.selectItems;

  const setActivePanels = useSetActivePanels();
  const navigate = useNavigate();

  const handleSetInvoice = (invoNum) => {
    setExchState((draft) => {
      draft.activeOrder = invoiceContext[invoNum].invoiceDetails.orderNum;
      draft.invoiceProducts = invoiceContext[invoNum].products;
    });
  };

  const handleClick = () => {
    handleSetInvoice("XAAA");
    navigate("chooseitems");
    setActivePanels({ main: nextAp.invoItemsTable.k });
  };

  return (
    <section className={`mrvPage ${classes.container}`}>
      <section className={`mrvPanel__main exch-rows ${classes.container}`}>
      <div className={`main_content main_col`}>
          <button onClick={() => handleClick()} className={`mrvBtn primary`}>
            Add Order
          </button>
        </div>
      </section>
    </section>
  );
}

export default StartExchange;

/*

      <section className={`mrv-panel__main exch-rows`}>
        <div className={`main_content main_col`}>
          <button onClick={() => handleClick()} className={`mrvBtn primary`}>
            Add Order
          </button>
        </div>
      </section>

*/
