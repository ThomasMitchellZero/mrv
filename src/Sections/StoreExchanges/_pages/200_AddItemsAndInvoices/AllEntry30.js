import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ItemEntry, ReceiptEntry } from "./EntrySubsections";

import {
  returnAtom,
  baseLocState,
  locStFields,
} from "../../../../globalFunctions/globalJS_classes";

import { cloneDeep } from "lodash";

import {
  populateDisposArr,
  useNodeNav,
  useClearLocErrStates,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { Methods_AddItemsAndInvosSTRX } from "./AddItemsAndInvosSTRX";

import { useImmer } from "use-immer";
import { RtrnItemsList } from "./RtrnItems/RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvos/RtrnInvosList";
import { useOutletContext } from "react-router";

const locSt_AllEntry30 = (() => {
  // base local state to be used in NodeNav.
  const outLocSt = cloneDeep(locStFields);
  outLocSt._keyStr = "AllEntry30";
  outLocSt.activeMode1 = "receipt";
  return outLocSt;
})();

export { locSt_AllEntry30 };

function AllEntry30() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();
  const locStRt = sessionMRV.locSt;
  const locMethods = Methods_AddItemsAndInvosSTRX({});
  const s30Mode = locStRt.page.activeMode1; // think this is wrong, needs to be top state.

  const refLocState = baseLocState;

  // mode-specific properties
  const oMode = {
    receipt: {
      sLabel: "receipt",
      sInputLabel: "",
      inputCluster: <ReceiptEntry />,
    },

    item: {
      sLabel: "item",
      sInputLabel: "",
      inputCluster: <ItemEntry />,
    },
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- UI ELEMENTS ---- */

  const handleTabClick = ({ e, btnType }) => {
    e.preventDefault();
    console.log("Screw Buttons Type", btnType);
    locMethods.testEz();
    locMethods.entryTabClick({ keyStr: btnType });
    /*
      setSessionMRV((draft) => {
      draft.locSt.page.activeMode1 = btnType;
      draft.tabs = "Dropped 2 tabs";
    });
    */
  };

  // Tab Buttons
  const uiTabBtn = (btnType = "dong") => {
    const isActive = s30Mode === btnType ? "active" : "";
    return (
      <button
        onClick={(e) => handleTabClick({ e: e, btnType: btnType })} // this is the issue
        className={`tab fullWidth ${isActive}`}
      >
        {`${oMode[btnType].sLabel}s`}
      </button>
    );
  };

  /* ########  OUTPUT JSX   ######## */

  /*
        onClick={() =>

      locMethods.bgClick({
        keyStr: "activeErrorKey",
      })
    }
  
  */

  return (
    <main className={`allEntry30 mrvPanel__side color__surface__default`}>
      <TitleBarSTRX
        hasCluster={false}
        showProductName={false}
        headerTitle={"Add To Exchange"}
      />
      <section className={`main_content`}>
        <div className={`tabBox`}>
          {uiTabBtn("receipt")}
          {uiTabBtn("item")}
        </div>
        {/* Input cluster varies based on selected Mode */}
        {oMode[s30Mode].inputCluster}
      </section>
    </main>
  );
}

export { AllEntry30 };

/*



*/
