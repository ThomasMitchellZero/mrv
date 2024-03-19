import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";

import { AllEntry30 } from "./AllEntry30";

import { useImmer } from "use-immer";
import { RtrnItemsList } from "./RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvosList";
import { useOutletContext } from "react-router";

function AddItemsAndInvosSTRX() {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;

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
    <page className={`mrvPage addItemsAndInvos color__surface__subdued`}>
      <main className={`mrvPanel__main`}>
        <TitleBarSTRX
          //hasIcon={"back"}
          showProductName={true}
          headerTitle={s70label[locStAddRtrns.activeMode]}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>
          {o70panels[locStAddRtrns.activeMode]}
          <CashTotalSTRX mode={"exchDelta"} sessionState={sessionState} />
        </div>
      </main>
      {o30panels[locStAddRtrns.active30]}

    </page>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
