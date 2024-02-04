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
    activeMode: "receipt",
    itemNumField: "",
    itemQtyField: "",
    receiptNumField: "",
  };

  const [locStAddRtrns, setLocStAddRtrns] = useImmer({
    ...defaultState,
  });

  const o30panels = {
    AllEntry30: <AllEntry30 parLocState={locStAddRtrns} setParLocState={setLocStAddRtrns} />,
  };

  const o70panels = {
    NoneScanned: <NoneScanned />,
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <main className={`mrvPage addItemsAndInvos color__surface__subdued`}>
      <section className={`mrvPanel__main`}>
        <HeaderSTRX
          showProductName={true}
          headerTitle={"Receipts and return items"}
        />
        <div className={`main_content`}>
          {o70panels[locStAddRtrns.active70]}
        </div>
      </section>
      {o30panels[locStAddRtrns.active30]}
    </main>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
