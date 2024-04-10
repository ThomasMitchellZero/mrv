import "./_AddItemsAndInvosSTRX.css";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";

import { AllEntry30 } from "./AllEntry30";
import { ItemDetails30STRX } from "../../_resources/components/ItemDetails30STRX";

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
    activeItemAtom: null,
    storeNumField: "",
    dateField: "",
    oActiveErrorState: null,
    active30: "AllEntry30",
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

    ItemDetails30: (
      <ItemDetails30STRX
        stateItemArr="returnItems"
        parLocState={locStAddRtrns}
        setParLocState={setLocStAddRtrns}
      />
    ),
  };

  const o70panels = {
    item: (
      <RtrnItemsList
        parLocState={locStAddRtrns}
        setParLocState={setLocStAddRtrns}
      />
    ),
    receipt: (
      <RtrnInvosList
        parLocState={locStAddRtrns}
        setParLocState={setLocStAddRtrns}
      />
    ),
  };

  /* ---- SHARED FUNCTIONS ---- */

  const bgClick = () => {
    console.log("fart of failure");
    setLocStAddRtrns((draft) => {
      draft.active30 = "AllEntry30";
      draft.activeItemAtom = null;
      draft.oActiveErrorState = null;
    });
  };
  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`addItemsAndInvos mrvPage color__surface__subdued`}>
      <main onClick={bgClick} className={`mrvPanel__main`}>
        <TitleBarSTRX
          //hasIcon={"back"}
          showProductName={true}
          headerTitle={s70label[locStAddRtrns.activeMode]}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>
          {o70panels[locStAddRtrns.activeMode]}
        </div>
        <div className={`footer_content`}>
          <CashTotalSTRX mode={"exchDelta"} sessionState={sessionState} />
        </div>
      </main>
      {o30panels[locStAddRtrns.active30]}
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
