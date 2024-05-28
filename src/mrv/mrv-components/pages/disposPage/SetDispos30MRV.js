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

  // deal with changes to the input field
  const handleInputQty = ({ ddKey, event }) => {
    const inputQty = parseInt(event.target.value) || "";
    // Input might be empty so if NaN, set it to 0.

    console.log("inputQty", inputQty);
    locMethods.editDispoQty({
      dispoKeyStr: ddKey,
      qty: inputQty,
    });
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
            value={sessionState.locSt.pageActiveData1.allDisposObj[oDispo.keyStr].dispoQty}
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

  console.log(activeDisposObj);

  const aDDdispoFields = activeDisposObj
    ? Object.values(activeDisposObj.allDisposObj).map((iDispo) => {
        return uiDispoInput(iDispo);
      })
    : null;

  /*
      aDDdispoFields.push(
    <div className={`singleDispoCtnr spacer`} key={"spacer"}></div>
  );
    */

  const uiItemActive = activeDisposObj ? (
    <div className={`main_content`}>
      <div className={`hBox minFlex`}>
        <MRVitemDetails
          thisItemAtom={activeDisposObj.dispoItemAtom}
          showQty={false}
        />
      </div>

      <div className={` inputDisposCtnr`}>{aDDdispoFields}</div>
      <button className={`secondary maxWidth`}>Confirm</button>
      <div className={`warningCtnr`}>Error</div>
    </div>
  ) : null;

  return (
    <section className={`mrvPanel__side color__surface__default SetDispos30`}>
      <TitleBarMRV headerTitle={`Item Details`} hasCluster={false} />
      {uiItemActive}
      <div className={`footer_content`}></div>
    </section>
  );
}

export { SetDispos30MRV };
