import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ItemEntry, ReceiptEntry } from "./EntrySubsections";

import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import { cloneDeep } from "lodash";

import {
  populateDisposArr,
  useNodeNav,
  useClearLocErrStates,
  useResetLocStFields,
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
  const locStRt = sessionMRV.locSt;
  const locMethods = Methods_AddItemsAndInvosSTRX({});
  const resetFields = useResetLocStFields();
  const s30Mode = locStRt.page.activeMode1;

  // mode-specific properties
  const oMode = {
    receipt: {
      sLabel: "receipt",
      inputCluster: <ReceiptEntry />,
    },

    item: {
      sLabel: "item",
      inputCluster: <ItemEntry />,
    },
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- UI ELEMENTS ---- */

  const handleTabClick = ({ e, btnType }) => {
    e.preventDefault();
    locMethods.entryTabClick({ keyStr: btnType });
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
        locMethods.bgClick()
      }
  
  */

  return (
    <main
      onClick={() => locMethods.bgClick()}
      className={`allEntry30 mrvPanel__side color__surface__default`}
    >
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
