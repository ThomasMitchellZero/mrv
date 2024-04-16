import "./_Dispositions.css";

import {
  SingleDispo,
  ItemDisposObj,
  baseReturnState,
} from "../../../../globalFunctions/globalJS_classes";
import { TitleBarMRV } from "../../DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../DisplayOutputs/CashTotalMRV";
import { useImmer, useImmerReducer } from "use-immer";
import { useOutletContext } from "react-router";

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
}) {
  const clearableFields = {
    activeSingleDispo: "",
    activeDisposObj: {},
    activeErrorState: "",
  };

  const initLocStDispoMain = {
    activeRowKey: missingDispos(),
    ...clearableFields,
  };

  /*
  
    titleBar = (
    <TitleBarMRV
      hasIcon={"back"}
      showProductName={true}
      headerTitle={`Provide reason for return`}
    />
  ),
  cashTotal = <CashTotalMRV mode={"exchDelta"} sessionState={sessionState} />,
  
  */

  const [locStDispoMain, setLocStDispoMain] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case "SELECT_ROW": {
          draft.activeRowKey = action.payload;
          return draft;
        }
        case "DISPO_APPLIED": {
          const outLocSt = initLocStDispoMain;
          outLocSt.activeRowKey = missingDispos();
          return outLocSt;
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
      console.log(iItem, iItem.itemQty, iItem.qtySansDispo);
      if (iItem.qtySansDispo > 0) {
        outKeyStr = iItem.dispoItemNum;
        break;
      }
    }
    return outKeyStr;
  }

  return (
    <section className={` mrvPage color__surface__subdued`}>
      <main className={`mrvPanel__main`}>
        {titleBar}
        <div className={`main_content`}>
          <div className={`heading__medium`}>Test Complete</div>
        </div>
        <div className={`footer_content`}>
          {cashTotal}
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
    </section>
  );
}

export { DispoMainPageMRV };
