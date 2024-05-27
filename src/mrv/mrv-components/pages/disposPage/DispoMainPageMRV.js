import "./_Dispositions.css";

import {
  SingleDispo,
  ItemDisposObj,
  baseReturnState,
  baseLocState,
} from "../../../../globalFunctions/globalJS_classes";
import { TitleBarMRV } from "../../DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../DisplayOutputs/CashTotalMRV";
import { useImmer, useImmerReducer } from "use-immer";
import { useOutletContext } from "react-router";

import { SetDispos30MRV } from "./SetDispos30MRV";
import { DispoItems70 } from "./DispoItems70";
import cloneDeep from "lodash.clonedeep";

// local state setter to run prior to this component's render.
function DispoMainMRVLocSt({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
}) {
  const outLocSt = baseLocState({});

  const findActiveItem = ({ keyStr = "", clone = true }) => {
    console.log("keyStr: ", keyStr);
    console.log(sessionState);
    // loops through the ReturnItemDispos array and returns the object that matches the keyStr
    const refItemDisposObj = new ItemDisposObj({});
    const outActiveDispo = sessionState.returnItemDispos.find((iItem) => {
      return iItem.dispoItemNum === keyStr;
    });

    return clone ? cloneDeep(outActiveDispo) : outActiveDispo;
  };

  // Methods to be added to the local state object.

  const setActiveItem = ({ keyStr = "", clone = true }) => {
    // sets the active item in the local state

    setSessionState((draft) => {
      draft.locSt.pageActiveKey1 = keyStr;
      draft.locSt.pageActiveData1 = findActiveItem({ keyStr, clone });
    });
  };

  const missingDispos = ({ clone = true }) => {
    const refBaseReturnState = baseReturnState({});
    const refItemDisposObj = new ItemDisposObj({});

    let outKeyStr = "";

    for (const iItem of sessionState.returnItemDispos) {
      if (iItem.qtySansDispo > 0) {
        outKeyStr = iItem.dispoItemNum;
        break;
      }
    }
    setActiveItem({ keyStr: outKeyStr, clone });
  };

  outLocSt.methods = { ...outLocSt.methods, missingDispos, setActiveItem };

  return outLocSt;
}

//////////////////////////////////////////////////////////////////////////
// UI COMPONENT
//////////////////////////////////////////////////////////////////////////

function DispoMainPageMRV({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
  handleContinue = () => console.log("No Continue Handler Provided"),
  panel70,
  panel30,
}) {
  // I've included the TitleBar and CashTotal components mostly as placeholders.  They should normally be replaced in the app-specific config of this component with their respective configured counterparts.

  const refBaseReturnState = baseReturnState({});
  const refItemDisposObj = new ItemDisposObj({});

  /*
  
  */

  const ui70Panel = panel70 || (
    <DispoItems70
      sessionState={sessionState}
      setSessionState={setSessionState}
    />
  );

  const ui30Panel = panel30 || (
    <SetDispos30MRV
      sessionState={sessionState}
      setSessionState={setSessionState}
    />
  );

  return (
    <section className={` mrvPage color__surface__subdued disposMain`}>
      {ui70Panel}
      {ui30Panel}
    </section>
  );
}

export { DispoMainPageMRV, DispoMainMRVLocSt };
