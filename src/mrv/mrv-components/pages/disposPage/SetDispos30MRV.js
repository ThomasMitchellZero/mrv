import {
  SingleDispo,
  ItemDisposObj,
  baseReturnState,
  baseLocState,
} from "../../../../globalFunctions/globalJS_classes";

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
}) {
  const locMethods = useDispoMainMethods({ sessionState, setSessionState });

  const refLocState = baseLocState({});
  const locState = sessionState.locSt;

  const refSingleDispo = new SingleDispo({});

  // this will change if we ever set global state directly.
  const activeDisposObj = locState.pageActiveData1;

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

  const uiDispoInput = (oDispo) => {
    const refSingleDispo = new SingleDispo({});

    return (
      <div className={`singleDispoCtnr`} key={oDispo.keyStr}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
            value={
              sessionState.locSt.pageActiveData1.allDisposObj[oDispo.keyStr]
                .dispoQty
            }
            onChange={(e) => {
              handleInputQty({ ddKey: oDispo.keyStr, event: e });
            }}
          />
        </MRVinput>
        <div className={`body__small color__primary__text`}>
          {oDispo.strLabel}
        </div>
      </div>
    );
  };

  const refItemDisposObj = new ItemDisposObj({});

  const activeAllDispos = activeDisposObj?.allDisposObj || {};

  const didntWantCodes = Object.values(activeAllDispos).filter(
    (singleDispo) => {
      return singleDispo.isDamaged === false;
    }
  );

  const damagedCodes = Object.values(activeAllDispos).filter((singleDispo) => {
    return singleDispo.isDamaged === true;
  });

  const aDDdispoFields = damagedCodes.map((iDispo) => {
    return uiDispoInput(iDispo);
  });

  aDDdispoFields.push(
    <div className={`singleDispoCtnr spacer`} key={"spacer"}></div>
  );

  const uiItemActive = activeDisposObj ? (
    <div className={`main_content gap1rem`}>
      <div className={`hBox minFlex`}>
        <MRVitemDetails
          thisItemAtom={activeDisposObj.dispoItemAtom}
          showQty={false}
        />
      </div>

      {/* Return Reason Section */}

      <div className="hBox minFlex body">Why is customer returning item?</div>
      <section className={`tabCtnr `}>
        {tabButton({ category: "didntWant", title: "Didn't Want/Need" })}
        {tabButton({ category: "damaged", title: "Damaged/Defective" })}
      </section>

      {/*  this was copied over, not sure how relevant.
            
                      {locStMI.activeTab === "dwn" ? (
            <section className={`dwnDispoCtnr`}>
              <p className={`tinyText reasonExplainer`}>
                Select all reasons customer doesn't want items
              </p>
              {dwnButtonsArr}
            </section>
          ) : (
            <section className={`ddDisposCtnr`}>
              <p className={`tinyText reasonExplainer`}>
                Enter types and qtys of any damaged items
              </p>

              {aDDdispoFields}
            </section>
          )}
            
             */}

      <div className={` inputDisposCtnr`}>{aDDdispoFields}</div>
      <button className={`secondary maxWidth`}>Confirm</button>
      <div className={`warningCtnr`}></div>
    </div>
  ) : null;

  return (
    <section className={`mrvPanel__side color__surface__default SetDispos30`}>
      <div className={`hBox minFlex padding__both heading__medium`}>Item Details</div>
      {uiItemActive}
      {/*<div className={`footer_content`}></div> */}
    </section>
  );
}

export { SetDispos30MRV };
