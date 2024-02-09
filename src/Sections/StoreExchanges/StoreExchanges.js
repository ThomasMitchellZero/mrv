import "../../mrv/mrv-styles/mrvAllStyles.css";
import "../Exchanges/Exchanges.css";
import {
  sessionItem,
  singleDispo,
} from "../../globalFunctions/globalJS_classes";

import InvoiceContext from "../../store/invoice-context";

import { useImmer } from "use-immer";

import { Outlet } from "react-router";
import { useContext } from "react";

function StoreExchanges() {
  const invoiceContext = useContext(InvoiceContext);

  const debugTestCase = {
    returnItems: {
      100: new sessionItem({
        itemNum: 100,
        itemQty: 12,
        disposObj: new singleDispo({}),
      }),
      200: new sessionItem({
        itemNum: 200,
        itemQty: 5,
        disposObj: new singleDispo({}),
      }),
      300: new sessionItem({
        itemNum: 300,
        itemQty: 9,
        disposObj: new singleDispo({}),
      }),
      900: new sessionItem({
        itemNum: 900,
        itemQty: 4,
        disposObj: new singleDispo({}),
      }),
    },
    sessionInvoices: {
      AAA: invoiceContext.AAA,
      BBB: invoiceContext.BBB,
      CCC: invoiceContext.CCC,
    },
  };

  const defaultState = {
    returnItems: {},
    sessionInvoices: {},
    ...debugTestCase,
  };

  const [sessionSTRX, setSessionStrx] = useImmer({
    ...defaultState,
  });

  return (
    <section className={`mrv STRX_top`}>
      <Outlet
        context={{
          sessionSTRX: sessionSTRX,
          setSessionStrx: setSessionStrx,
        }}
      />
    </section>
  );
}

export { StoreExchanges };

/*


*/
