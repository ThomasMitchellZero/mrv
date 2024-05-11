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

  // I've included the TitleBar and CashTotal components mostly as placeholders.  They should normally be replaced in the app-specific config of this component with their respective configured counterparts.

  const strxCtx = useOutletContext();
  const sessionSTRX = strxCtx.sessionSTRX;
  const setSessionStrx = strxCtx.setSessionStrx;

  const refBaseReturnState = baseReturnState({});
  const refItemDisposObj = new ItemDisposObj({});

  const clearableFields = {
    activeErrorState: "",
  };

  const initLocStDispoMain = {
    activeItemNum: missingDispos(),
    ...clearableFields,
    get activeDisposObj() {
      let outActiveDispo = sessionSTRX.returnItemDispos.find((iItem) => {
        return iItem.dispoItemNum === this.activeItemNum;
      });
      return outActiveDispo;
    },
  };

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
      <main className={`mrvPanel__main`}>
        {titleBar}
        <div className={`main_content`}>
          <div className={` cardContainer`}>{uiCardArray}</div>
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
      <SetDispos30MRV
        parLocStDispos={locStDispoMain}
        setParLocStDispos={setLocStDispoMain}
      />
    </section>
  );
}

export { DispoMainPageMRV };
