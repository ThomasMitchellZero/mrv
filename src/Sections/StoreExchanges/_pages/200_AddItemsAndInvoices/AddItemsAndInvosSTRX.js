import "./_AddItemsAndInvosSTRX.css";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";

import { AllEntry30 } from "./AllEntry30";
import { ItemDetails30STRX } from "../../_resources/components/ItemDetails30STRX";
import {
  useNodeNavSTRX,
} from "../../_resources/hooks/STRXhooks";

import { populateDisposArr, useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { useImmer } from "use-immer";
import { RtrnItemsList } from "./RtrnItems/RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvos/RtrnInvosList";
import { useOutletContext } from "react-router";

function AddItemsAndInvosSTRX() {
  
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();


  const clearableFields = {
    itemNumField: "",
    itemQtyField: "",
    receiptNumField: "",
    activeItemAtom: null,
    storeNumField: "",
    dateField: "",
    oActiveErrorState: null,
    activeErrorKey: "",
    active30: "AllEntry30",
  };

  const defaultState = {
    active30: "AllEntry30",
    activeMode: "receipt",
    oErrorStates: {
      noItem: "No items have been added",
      invalidItem: "Invalid item number",
      invalidQty: "Invalid quantity",
      invalidReceipt: "Invalid receipt number",
      duplicateInvo: "Receipt has already been added",
    },
    clearableFields: clearableFields, // lets me see field names in the other components
    ...clearableFields,
  };

  const [locStAddRtrns, setLocStAddRtrns] = useImmer(defaultState);

  const s70label = {
    item: "Items Being Returned",
    receipt: "Receipts for items being returned",
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

  const uiContinueWarning = (
    <div className={`footer_text`}>
      <div className={"buttonBox25 warning"}>
        {locStAddRtrns.oErrorStates.noItem}
      </div>
    </div>
  );

  /* ---- SHARED FUNCTIONS ---- */

  const bgClick = () => {
    console.log("bgClick");
    setLocStAddRtrns((draft) => {
      draft.active30 = "AllEntry30";
      draft.activeItemAtom = null;
      draft.activeErrorKey = "";
    });
  };

  const handleContinue = () => {
    console.log(sessionMRV.returnItems.length);
    if (locStAddRtrns.activeMode === "receipt") {
      setLocStAddRtrns((draft) => {
        draft.activeMode = "item";
        draft.active30 = "AllEntry30";
      });
    } else if (sessionMRV.returnItems.length === 0) {
      setLocStAddRtrns((draft) => {
        draft.activeErrorKey = "noItem";
      });
    } else {
      setSessionMRV((draft) => {
        draft.returnItemDispos = populateDisposArr({sessionSt: sessionMRV});
      });
      nodeNav("reason");
    }
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
        {locStAddRtrns.activeErrorKey === "noItem" ? uiContinueWarning : null}
        <div className={`footer_content`}>
          <CashTotalSTRX />
          <div
            onClick={(e) => {
              console.log("button BG register");
              e.stopPropagation();
            }}
            className={`buttonBox25`}
          >
            <button
              className={`primary jumbo maxFlex`}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
      {o30panels[locStAddRtrns.active30]}
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
