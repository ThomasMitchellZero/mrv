import {
  SingleDispo,
  ItemDisposObj,
  baseReturnState,
  baseLocState,
} from "../../../../globalFunctions/globalJS_classes";

import { useRef } from "react";

import { useImmer, useImmerReducer } from "use-immer";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router";

import { MRVitemDetails } from "../../DisplayOutputs/mrvItemDetails";

import { useDispoMainMethods } from "./DispoMainPageMRV";

import { TitleBarMRV } from "../../DisplayOutputs/TitleBarMRV";
import { MRVinput } from "../../inputs/MRVinput";

function SetDispos30MRV({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
  inputComponent = null,
  tMode = "T1",
}) {
  const locMethods = useDispoMainMethods({ sessionState, setSessionState });

  const refLocState = baseLocState({});
  const locState = sessionState.locSt;

  const refSingleDispo = new SingleDispo({});

  // this will change if we ever set global state directly.
  const activeDisposObj = locState.pageActiveData1;

  const inputRef = useRef(null);

  /////////////////// LOCAL FUNCTIONS //////////////////////

  // deal with changes to the input field
  const handleInputQty = ({ ddKey, event }) => {
    const inputQty = parseInt(event.target.value) || "";
    // Input might be empty so if NaN, set it to 0.
    locMethods.editDispoQty({
      dispoKeyStr: ddKey,
      qty: inputQty,
    });
  };

  const handleDamgeTypeSelect = ({ dispoKeyStr }) => {
    locMethods.damageTypeSelect({ dispoKeyStr });
    inputRef.current.focus();
  };

  /////////////////// UI COMPONENTS //////////////////////

  const tabButton = ({ category, title }) => {
    // didntWant , damaged
    return (
      <button
        type="button"
        className={`tab body__small ${
          locState.rPanActiveUI1 === category ? "active" : ""
        }`}
        onClick={() => {
          locMethods.tabClick({ category });
        }}
      >
        {title}
      </button>
    );
  };

  const refItemDisposObj = new ItemDisposObj({});

  //// Didn't Want / Need Inputs ////////////////////////

  const activeAllDispos = activeDisposObj?.allDisposObj || {};

  const didntWantCodes = Object.values(activeAllDispos).filter(
    (singleDispo) => {
      return singleDispo.isDamaged === false;
    }
  );

  const uiDidntWantBtn = (oSingleDispo) => {
    const refSingleDispo = new SingleDispo({});

    return (
      <button
        className={`chip ${oSingleDispo.isChosen ? "selected" : ""}`}
        key={oSingleDispo.keyStr}
        onClick={() => {
          locMethods.chipSelect({ dispoKeyStr: oSingleDispo.keyStr });
        }}
      >
        {oSingleDispo.strLabel}
      </button>
    );
  };

  const uiDidntWantBtnGroup = (
    <div className={`chipCtnr`}>
      {didntWantCodes.map((dwnObj) => {
        return uiDidntWantBtn(dwnObj);
      })}
    </div>
  );

  //// Damaged / Defective Inputs ////////////////////////

  const damagedCodes = Object.values(activeAllDispos).filter((singleDispo) => {
    return singleDispo.isDamaged === true;
  });

  const uiDamagedInputField = (ddSingleDispo) => {
    const refSingleDispo = new SingleDispo({});

    return (
      <div className={`singleDispoCtnr`} key={ddSingleDispo.keyStr}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
            value={
              sessionState.locSt.pageActiveData1.allDisposObj[
                ddSingleDispo.keyStr
              ].dispoQty
            }
            onChange={(e) => {
              handleInputQty({ ddKey: ddSingleDispo.keyStr, event: e });
            }}
          />
        </MRVinput>
        <div className={`body__small color__primary__text`}>
          {ddSingleDispo.strLabel}
        </div>
      </div>
    );
  };

  const uiDamagedBtn = (ddSingleDispo) => {
    const refSingleDispo = new SingleDispo({});
    const style =
      locState.rPanActiveKey1 === ddSingleDispo.keyStr
        ? "active"
        : ddSingleDispo.dispoQty > 0
        ? "selected"
        : "";

    const numStr = ddSingleDispo.dispoQty > 0 ? `: ${ddSingleDispo.dispoQty}` : "";

    return (
      <button
        className={`chip ${style}`}
        key={ddSingleDispo.keyStr}
        onClick={() => {
          handleDamgeTypeSelect({ dispoKeyStr: ddSingleDispo.keyStr });
        }}
      >
        {`${ddSingleDispo.strLabel} ${numStr}`}
      </button>
    );
  };

  const uiDamagedInputFieldGroup = (
    <div className={`damagedInputFieldsCtnr`}>
      {damagedCodes.map((singleDispo) => {
        return uiDamagedInputField(singleDispo);
      })}
    </div>
  );

  const uiDamagedBtnGroup = (
    <div className={`damagedChipsCtnr`}>
      <div className={`singeFieldCtnr`}>
        <div className={`inputLabel body color__primary__text `}>
          Select reason & enter qty:
        </div>
        <MRVinput width={"5rem"}>
          <input
            ref={inputRef}
            id="damagedQtyInput"
            type="number"
            min="0"
            disabled={!locState.rPanActiveKey1}
            step="1"
            value={
              locState?.pageActiveData1?.allDisposObj[locState.rPanActiveKey1]
                ?.dispoQty || ""
            }
            onChange={(e) => {
              handleInputQty({ ddKey: locState.rPanActiveKey1, event: e });
            }}
          />
        </MRVinput>
      </div>
      <div className={`chipCtnr`}>
        {damagedCodes.map((ddSingleDispo) => {
          return uiDamagedBtn(ddSingleDispo);
        })}
      </div>
    </div>
  );

  const activeReasonInput =
    locState.rPanActiveUI1 === "didntWant"
      ? uiDidntWantBtnGroup
      : tMode === "T1" && locState.rPanActiveUI1 === "damaged"
      ? uiDamagedInputFieldGroup
      : tMode === "T2" && locState.rPanActiveUI1 === "damaged"
      ? uiDamagedBtnGroup
      : null;

  const uiItemActive = activeDisposObj ? (
    <div className={`main_content gap1rem`}>
      <div className={`hBox minFlex goWide`}>
        <MRVitemDetails
          thisItemAtom={activeDisposObj.dispoItemAtom}
          showQty={false}
        />
      </div>

      {/* Return Reason Section */}

      <div className="hBox minFlex body goWide">
        Why is customer returning item?
      </div>
      <section className={`tabCtnr goWide`}>
        {tabButton({ category: "didntWant", title: "Didn't Want/Need" })}
        {tabButton({ category: "damaged", title: "Damaged/Defective" })}
      </section>

      {activeReasonInput}
      <button
        onClick={() => locMethods.handleApply()}
        className={`secondary submitBtn maxWidth goWide`}
      >
        Apply
      </button>
      <div className={`warningCtnr`}></div>
    </div>
  ) : null;

  return (
    <section className={`mrvPanel__side color__surface__default SetDispos30`}>
      <div className={`hBox minFlex padding__both heading__medium`}>
        Item Details
      </div>
      {uiItemActive}
      {/*<div className={`footer_content`}></div> */}
    </section>
  );
}

export { SetDispos30MRV };
