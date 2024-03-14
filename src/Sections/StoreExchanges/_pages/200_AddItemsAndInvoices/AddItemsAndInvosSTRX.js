import { HeaderSTRX } from "../../_resources/components/HeaderSTRX";
import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";

import { AllEntry30 } from "./AllEntry30";
import { NoneScanned } from "./NoneScanned";

import { useNavigate } from "react-router";
import { useImmer } from "use-immer";
import { RtrnItemsList } from "./RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvosList";

function AddItemsAndInvosSTRX() {
  const navigate = useNavigate();

  const clearableFields = {
    itemNumField: "",
    itemQtyField: "",
    receiptNumField: "",
    storeNumField: "",
    dateField: "",
    oActiveErrorState: null,
  };

  const defaultState = {
    active30: "AllEntry30",
    activeMode: "receipt",
    clearableFields: clearableFields, // lets me see field names in the other components
    ...clearableFields,
  };

  const [locStAddRtrns, setLocStAddRtrns] = useImmer(defaultState);

  const s70label = {
    item: "Return Items",
    receipt: "Receipts",
  };

  const o30panels = {
    AllEntry30: (
      <AllEntry30
        parLocState={locStAddRtrns}
        setParLocState={setLocStAddRtrns}
      />
    ),
  };

  const o70panels = {
    item: <RtrnItemsList />,
    receipt: <RtrnInvosList />,
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <main className={`mrvPage addItemsAndInvos color__surface__subdued`}>
      <section className={`mrvPanel__main`}>
        <HeaderSTRX
          showProductName={true}
          headerTitle={s70label[locStAddRtrns.activeMode]}
        />
        <div className={`main_content`}>
          {o70panels[locStAddRtrns.activeMode]}
        </div>
      </section>
      {o30panels[locStAddRtrns.active30]}
    </main>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
