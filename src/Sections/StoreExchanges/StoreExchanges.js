import "../../mrv/mrv-styles/mrvAllStyles.css";
import "./StoreExchanges.css";


import { baseStateSTRX } from "../../Sections/StoreExchanges/_resources/hooks/STRXhooks";

import InvoiceContext from "../../store/invoice-context";
import InvoContext from "../../store/invo-context";

import { useImmer } from "use-immer";

import { Outlet } from "react-router";

function StoreExchanges() {

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
