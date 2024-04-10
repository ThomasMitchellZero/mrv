import "../../mrv/mrv-styles/mrvAllStyles.css";
import "./StoreExchanges.css";
import {
  sessionItem,
  singleDispo,
  baseReturnState,
} from "../../globalFunctions/globalJS_classes";

import { defaultNavNodesSTRX, baseStateSTRX } from "../../Sections/StoreExchanges/_resources/hooks/STRXhooks";

import InvoiceContext from "../../store/invoice-context";
import InvoContext from "../../store/invo-context";

import { useReturnAtomizer, atomsMonetizer } from "../../mrv/MRVhooks/MRVhooks";

import { useImmer } from "use-immer";

import { Outlet } from "react-router";
import { useContext } from "react";

function StoreExchanges() {
  const invoiceContext = useContext(InvoiceContext);
  const invoContext = useContext(InvoContext);

  const [sessionSTRX, setSessionStrx] = useImmer(
    baseStateSTRX()
  );

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
