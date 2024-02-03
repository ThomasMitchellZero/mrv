import { HeaderSTRX } from "../../_resources/components/HeaderSTRX";

import { AllEntry30 } from "./AllEntry30";
import { NoneScanned } from "./NoneScanned";

import { useNavigate } from "react-router";
import { useImmer } from "use-immer";

function AddItemsAndInvosSTRX() {
  const navigate = useNavigate();

  const defaultState = {
    active30: "AllEntry30",
    active70: "NoneScanned",
  };

  const [locStAddRtrns, setLocStAddRtrns] = useImmer({
    ...defaultState,
  });

  const o30panels = {
    InvoEntry30: <AllEntry30 />,
  };

  const o70panels = {
    NoneScanned: <NoneScanned />,
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage color__surface__subdued`}>
      <section className={`mrvPanel__main`}>
        <HeaderSTRX
          showProductName={false}
          headerTitle={"Invoices and Items Being Returned"}
        />
        <div className={`main_content`}>
          {o70panels[locStAddRtrns.active70]}
        </div>
      </section>
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
