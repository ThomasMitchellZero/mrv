import "./_AddItemsAndInvosSTRX.css";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";

import {
  returnAtom,
  baseLocState,
} from "../../../../globalFunctions/globalJS_classes";

import { AllEntry30, locSt_AllEntry30 } from "./AllEntry30";
import { ItemDetails30STRX } from "../../_resources/components/ItemDetails30STRX";
import { cloneDeep } from "lodash";

import {
  populateDisposArr,
  useNodeNav,
  useClearLocErrStates,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useImmer } from "use-immer";
import { RtrnItemsList } from "./RtrnItems/RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvos/RtrnInvosList";
import { useOutletContext } from "react-router";

const locSt_AddItemsAndInvosSTRX = (() => {
  // base local state to be used in NodeNav.
  const outLocSt = cloneDeep(baseLocState);
  outLocSt.rPan.activeUI1 = "AllEntry30";
  outLocSt[locSt_AllEntry30._keyStr] = locSt_AllEntry30;
  outLocSt.page.activeMode1 = "receipt";
  outLocSt.page.activeError1 = "receipt";
  return outLocSt;
})();

export { locSt_AddItemsAndInvosSTRX };

function Methods_AddItemsAndInvosSTRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();
  const locStRt = sessionMRV.locSt;
  const clearErrors = useClearLocErrStates();

  const outMethods = {};

  //-------------------------------------

  const bgClick = () => {
    clearErrors();
  };

  outMethods.bgClick = bgClick;


  const entryTabClick = ({
    keyStr = "receipt",
    REF_keyStr____item_receipt,
  }) => {
    // handles toggle between item and receipt entry
    setSessionMRV((draft) => {
      draft.locSt.page.activeMode1 = keyStr;
      draft.locSt.AllEntry30.activeMode1 = keyStr;
    });
  };
  outMethods.entryTabClick = entryTabClick;

  

  //-------------------------------------

  return outMethods;
}
export { Methods_AddItemsAndInvosSTRX };

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&     MAIN COMPONENT    &&&&&&&&&&&&&&&//
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function AddItemsAndInvosSTRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();
  const locStRt = sessionMRV.locSt;
  const clearErrors = useClearLocErrStates();

  console.log(locStRt);

  const s70label = {
    item: "Items Being Returned",
    receipt: "Receipts for items being returned",
  };

  const o30panels = {
    AllEntry30: <AllEntry30 />,
    ItemDetails30: <ItemDetails30STRX stateItemArr="returnItems" />,
  };

  const o70panels = {
    item: <RtrnItemsList />,
    receipt: <RtrnInvosList />,
  };

  const uiContinueWarning = (
    <div className={`footer_text`}>
      <div className={"buttonBox25 warning"}>{"FaRT warning"}</div>
    </div>
  );

  /* ---- SHARED FUNCTIONS ---- */

  const bgClick = () => {
    // haven't tried this yet.
    clearErrors();
    console.log("bgClick");
  };

  const refBaseLocState = baseLocState;

  const handleContinue = (e) => {
    e.stopPropagation();

    if (locStRt.page.activeMode1 === "receipt") {
      setSessionMRV((draft) => {
        draft.locSt.page.activeMode1 = "item";
      });
    } else if (sessionMRV.returnItems.length === 0) {
      setSessionMRV((draft) => {
        draft.locSt.page.errorSt1 = "noItem";
      });
    } else {
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
          headerTitle={s70label[locStRt.page.activeMode1]}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>
          {o70panels[locStRt.page.activeMode1]}
        </div>
        {locStRt.page.errorSt1 === "noItem" ? uiContinueWarning : null}
        <div className={`footer_content`}>
          <CashTotalSTRX />
          <div className={`buttonBox25`}>
            <button
              className={`primary jumbo maxFlex`}
              onClick={(e) => {
                handleContinue(e);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
      {o30panels[locStRt.rPan.activeUI1]}
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
