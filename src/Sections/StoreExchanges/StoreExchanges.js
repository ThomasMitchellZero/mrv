import "../../mrv/mrv-styles/mrvAllStyles.css";
import "../Exchanges/Exchanges.css";
import {
  sessionItem,
  singleDispo,
  baseReturnState,
} from "../../globalFunctions/globalJS_classes";

import InvoiceContext from "../../store/invoice-context";
import InvoContext from "../../store/invo-context";

import { useReturnAtomizer, atomsMonetizer } from "../../mrv/MRVhooks/MRVhooks";

import { useImmer } from "use-immer";

import { Outlet } from "react-router";
import { useContext } from "react";

function StoreExchanges() {
  const invoiceContext = useContext(InvoiceContext);
  const invoContext = useContext(InvoContext);
  const returnAtomizer = useReturnAtomizer();

  /*
    const debugTestCase = {
    returnItems: {
      100: new sessionItem({
        itemNum: "100",
        itemQty: 12,
        disposObj: {
          broken: new singleDispo({ isResellable: false, dispoQty: 3 }),
          cracked: new singleDispo({ isResellable: false, dispoQty: 7 }),
        },
      }),
      200: new sessionItem({
        itemNum: "200",
        itemQty: 5,
        disposObj: {},
      }),
      300: new sessionItem({
        itemNum: "300",
        itemQty: 9,
        disposObj: {
          broken: new singleDispo({ isResellable: false, dispoQty: 4 }),
        },
      }),
      900: new sessionItem({
        itemNum: "900",
        itemQty: 4,
        disposObj: {},
      }),
    },
    sessionInvoices: {
      AAA: invoiceContext.AAA,
      BBB: invoiceContext.BBB,
      CCC: invoiceContext.CCC,
    },
    sessionInvos: {
      CAAA: invoContext.CAAA,
      CBBB: invoContext.CBBB,
      CCCC: invoContext.CCCC,
    },
  };


    debugTestCase.atomizedItems = returnAtomizer({
    sessionInvosObj: debugTestCase.sessionInvos,
    sessionItemsObj: debugTestCase.returnItems,
  });

  /*
  
  
  
  */


  const [sessionSTRX, setSessionStrx] = useImmer(baseReturnState({}));

  return (
    <section className={`mrv STRX_top`}>
      <Outlet
        context={{
          sessionSTRX,
          setSessionStrx,
        }}
      />
    </section>
  );
}

export { StoreExchanges };

/*


*/
