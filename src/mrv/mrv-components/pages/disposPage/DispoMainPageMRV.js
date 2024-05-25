import "./_Dispositions.css";

import {
  SingleDispo,
  ItemDisposObj,
  baseReturnState,
} from "../../../../globalFunctions/globalJS_classes";
import { DispoItemCard } from "./DispoItemCard";
import { TitleBarMRV } from "../../DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../DisplayOutputs/CashTotalMRV";
import { useImmer, useImmerReducer } from "use-immer";
import { useOutletContext } from "react-router";

import { SetDispos30MRV } from "./SetDispos30MRV";
import { DispoItems70 } from "./DispoItems70";

function DispoMainPageMRV({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
  handleContinue = () => console.log("No Continue Handler Provided"),
  titleBar = (
    <TitleBarMRV
      hasIcon={"back"}
      showProductName={true}
      headerTitle={`Provide reason for return`}
    />
  ),
  cashTotal = <CashTotalMRV mode={"exchDelta"} sessionState={sessionState} />,
  panel70,
  panel30,
}) {
  // I've included the TitleBar and CashTotal components mostly as placeholders.  They should normally be replaced in the app-specific config of this component with their respective configured counterparts.

  const refBaseReturnState = baseReturnState({});
  const refItemDisposObj = new ItemDisposObj({});

  const clearableFields = {
    activeErrorState: "",
  };

  const initLocStDispoMain = {
    activeItemNum: missingDispos(),
    ...clearableFields,
    get activeDisposObj() {
      let outActiveDispo = sessionState.returnItemDispos.find((iItem) => {
        return iItem.dispoItemNum === this.activeItemNum;
      });
      return outActiveDispo;
    },
  };

  const [locStDispoMain, setLocStDispoMain] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case "SELECT_ROW": {
          draft.activeItemNum = action.payload;
          break;
        }
        case "AUTO_NEXT_ACTIVE": {
          draft.activeItemNum = missingDispos();
          break;
        }
        default:
          break;
      }
    },
    initLocStDispoMain
  );

  function missingDispos() {
    const refBaseReturnState = baseReturnState({});
    const refItemDisposObj = new ItemDisposObj({});

    let outKeyStr = "";

    for (const iItem of sessionState.returnItemDispos) {
      if (iItem.qtySansDispo > 0) {
        outKeyStr = iItem.dispoItemNum;
        break;
      }
    }
    return outKeyStr;
  }

  const ui70Panel = panel70 || (
    <DispoItems70
      sessionState={sessionState}
      setSessionState={setSessionState}
      parLocState={locStDispoMain}
      setParLocState={setLocStDispoMain}
    />
  );

  const ui30Panel = panel30 || (
    <SetDispos30MRV
      sessionState={sessionState}
      setSessionState={setSessionState}
      parLocStDispos={locStDispoMain}
      setParLocStDispos={setLocStDispoMain}
    />
  );

  const uiCardArray = sessionState.returnItemDispos.map((iItemDispoObj) => {
    const refItemDisposObj = new ItemDisposObj({});

    return (
      <DispoItemCard
        key={iItemDispoObj.dispoItemNum}
        thisItemDisposObj={iItemDispoObj}
        parLocState={locStDispoMain}
        setParLocState={setLocStDispoMain}
        sessionState={sessionState}
      />
    );
  });

  return (
    <section className={` mrvPage color__surface__subdued disposMain`}>
      {ui70Panel}
      {ui30Panel}
    </section>
  );
}

export { DispoMainPageMRV };
