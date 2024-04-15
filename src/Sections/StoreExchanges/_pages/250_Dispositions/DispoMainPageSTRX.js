import "./_Dispositions.css";

import {
  singleDispo,
  ItemDisposObj,
} from "../../../../globalFunctions/globalJS_classes";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";
import { useImmer, useImmerReducer } from "use-immer";
import { useNodeNavSTRX } from "../../_resources/hooks/STRXhooks";
import { useOutletContext } from "react-router";

function DispoMainPageSTRX() {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;

  const clearableFields = {
    activeSingleDispo: "",  
    activeDisposObj: {},
    activeErrorState: "",
  }

  const initLocStDispoMain = {
    activeRowKey: missingDispos(),
    ...clearableFields,
    
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
    const refItemDisposObj = new ItemDisposObj({});
    let outKeyStr = "";
    for (const iItem of sessionState.returnItemDispos) {
      console.log(iItem, iItem.itemQty, iItem.qtySansDispo)
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
        <TitleBarSTRX
          //hasIcon={"back"}
          showProductName={true}
          headerTitle={`Provide reason for return`}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>test</div>
        <CashTotalSTRX mode={"exchDelta"} sessionState={sessionState} />
      </main>
    </section>
  );
}

export { DispoMainPageSTRX };
