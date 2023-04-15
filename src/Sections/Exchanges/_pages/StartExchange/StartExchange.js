import classes from "./StartExchange.module.css";
import { MRVheader } from "../../../../mrv/mrv-components/MRVheader";
import { actPan } from "../../_Resources/glossary/glossaryExch";
import { useSetActivePanels } from "../../_Resources/customHooks/useSetActivePanels";
import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function StartExchange() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const invoiceContext = useContext(InvoiceContext);
  const nextAp = actPan.selectItems

  const setActivePanels = useSetActivePanels()
  const navigate = useNavigate();

  const handleSetInvoice = (invoNum) => {
    setExchState((draft) => {
      draft.activeOrder = invoiceContext[invoNum].invoiceDetails.orderNum;
      draft.invoiceProducts = invoiceContext[invoNum].products;
    });
  };

  console.log(nextAp.invoItemsTable.k)

  const handleClick = () => {
    handleSetInvoice("XAAA");
    navigate("chooseitems");
    setActivePanels({main:`${nextAp.invoItemsTable.k}`})
  };

  return (
    <section className={`mrv-primary-columns ${classes.container}`}>
      <section className={`mrv-panel__main exch-rows`}>
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

  XAAA:{

      invoiceDetails: {
        store: 1234,
        date: new Date(2022, 3, 8),
        payment: {
          44443333: {
            tenderType: tType.check,
            tenderLabel: "Check ****3333",
            paid: 0,
            routingNum: "44443333",
            accountNum: "33334444",
          },
        },
        orderNum: "X11111111",
      },

      products: {
        900: { quantity: 2, price: 103115, tax: 11030 },
        910: { quantity: 1, price: 91234, tax: 9120 },
        400: { quantity: 1, price: 38723, tax: 3810 },
    },
  },

*/
