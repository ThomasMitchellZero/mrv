import "./_Dispositions.css";

import {
  SingleDispo,
  ItemDisposObj,
  baseReturnState,
  baseLocState,
} from "../../../../globalFunctions/globalJS_classes";

import { useImmer, useImmerReducer } from "use-immer";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router";

import { TitleBarMRV } from "../../DisplayOutputs/TitleBarMRV";
import { MRVinput } from "../../inputs/MRVinput";

function SetDispos30MRV({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
}) {

  const refLocState = baseLocState({});
  const locSt = sessionState.locSt;

  const refSingleDispo = new SingleDispo({});

  const activeDisposObj = locSt.pageActiveData1;

  // deal with changes to the input field
  const handleInputQty = ({ ddKey, event }) => {
    const inputQty = parseInt(event.target.value) || "";
    // Input might be empty so if NaN, set it to 0.

    // FILL OUT, NOT EVEN STARTED.
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
            value={oDispo.dispoQty}
            onChange={(event) => {}}
          />
        </MRVinput>
        <p className={`body color__primary__text`}>{oDispo.strLabel}</p>
      </div>
    );
  };

  const refItemDisposObj = new ItemDisposObj({});

  const aDDdispoFields = activeDisposObj
    ? Object.values(activeDisposObj.allDisposObj).map(
        (iDispo) => {
          return uiDispoInput(iDispo);
        }
      )
    : null;

  return (
    <section className={`mrvPanel__side color__surface__default SetDispos30`}>
      <TitleBarMRV headerTitle={`Return Reason`} hasCluster={false} />
      <div className={`main_content`}>
        <div className={` inputDisposCtnr`}>{aDDdispoFields}</div>
        <button className={`secondary maxWidth`}>Confirm</button>
        <div className={`warningCtnr`}>Error</div>
      </div>

      <div className={`footer_content`}></div>
    </section>
  );
}

export { SetDispos30MRV };
