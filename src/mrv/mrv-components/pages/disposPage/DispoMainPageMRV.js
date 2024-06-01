import "./_Dispositions.css";
import { isEqual } from "lodash";

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
function dispoMainMethods({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
}) {
  const locState = sessionState.locSt;

  const clearErrorState = () => {
    setSessionState((draft) => {
      draft.locSt.locStError1 = "";
    });
  };

  const findActiveItem = ({ keyStr = "" }) => {
    // loops through the ReturnItemDispos array and returns the object that matches the keyStr
    const refItemDisposObj = new ItemDisposObj({});
    const outActiveDispo = sessionState.returnItemDispos.findIndex((iItem) => {
      return iItem.dispoItemNum === keyStr;
    });
    return outActiveDispo;
  };

  // Methods to be added to the local state object.

  const setActiveItem = ({ keyStr = "", clone = true }) => {
    // sets the active item in the local state

    setSessionState((draft) => {
      const itemIndex = findActiveItem({ keyStr });

      draft.locSt.pageActiveKey1 = keyStr;
      draft.locSt.pageActiveData1 = clone
        ? cloneDeep(sessionState.returnItemDispos[itemIndex])
        : sessionState.returnItemDispos[itemIndex];
      draft.locSt.rPanActiveKey1 = "";
      draft.locSt.locStError1 = "";
    });
  };

  const didDispoChange = () => {
    const refItemDisposObj = new ItemDisposObj({});
    const refSingleDispo = new SingleDispo({});

    const activeDispoItemIndex = findActiveItem({
      keyStr: locState?.pageActiveData1?.dispoItemNum,
    });

    return !isEqual(
      locState?.pageActiveData1,
      sessionState?.returnItemDispos[activeDispoItemIndex]
    );
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

  const tabClick = ({ category }) => {
    setSessionState((draft) => {
      draft.locSt.rPanActiveUI1 = category;
      draft.locSt.locStError1 = "";
    });
  };

  const editDispoQty = ({ dispoKeyStr, qty = 0 }) => {
    const refSingleDispo = new SingleDispo({});
    const refItemDisposObj = new ItemDisposObj({});

    const refLocState = baseLocState({});

    const outActiveItem = cloneDeep(locState.pageActiveData1);
    outActiveItem.allDisposObj[dispoKeyStr].dispoQty = qty;

    setSessionState((draft) => {
      draft.locSt.pageActiveData1 = outActiveItem;
      draft.locSt.locStError1 = "";
    });
  };

  const chipSelect = ({ dispoKeyStr = "" }) => {
    const refSingleDispo = new SingleDispo({});

    const outActiveItem = cloneDeep(locState.pageActiveData1);

    outActiveItem.allDisposObj[dispoKeyStr].isChosen =
      !outActiveItem.allDisposObj[dispoKeyStr].isChosen;

    setSessionState((draft) => {
      draft.locSt.pageActiveData1 = outActiveItem;
      draft.locSt.locStError1 = "";
    });
  };

  const damageTypeSelect = ({ dispoKeyStr = "" }) => {
    const refSingleDispo = new SingleDispo({});
    const refBaseLocState = baseLocState({});

    console.log("--method--", dispoKeyStr);
    setSessionState((draft) => {
      draft.locSt.rPanActiveKey1 = dispoKeyStr;
      draft.locSt.locStError1 = "";
    });
  };

  const filterAssignedDispos = ({ thisItemDisposObj }) => {
    const refItemDisposObj = new ItemDisposObj({});
    const refSingleDispo = new SingleDispo({});
    const outFilteredDispos = {
      damaged: [],
      didntWant: [],
    };

    // filter for Damaged dispos that have a qty assigned.
    outFilteredDispos.damaged = Object.values(
      thisItemDisposObj.allDisposObj
    ).filter((thisSingleDispo) => {
      return thisSingleDispo.isDamaged && thisSingleDispo.dispoQty > 0;
    });
    // filter for dispos that are not damaged and were chosen.
    outFilteredDispos.didntWant = Object.values(
      thisItemDisposObj.allDisposObj
    ).filter((thisSingleDispo) => {
      return !thisSingleDispo.isDamaged && thisSingleDispo.isChosen;
    });
    return outFilteredDispos;
  };

  const handleApply = () => {

    const refItemDisposObj = new ItemDisposObj({});
    const refSingleDispo = new SingleDispo({});

    console.log("===", didDispoChange());


    const outActiveDispoItem = cloneDeep(locState.pageActiveData1);

    if (
      //
      didDispoChange() ||
      locState.pageActiveData1?.allDisposObj?.[locState.rPanActiveKey1]?.dispoQty ||
      locState.rPanActiveUI1 === "didntWant"
    ) {
      setSessionState((draft) => {
        draft.returnItemDispos[
          findActiveItem({ keyStr: outActiveDispoItem.dispoItemNum })
        ] = outActiveDispoItem;
        draft.locSt.rPanActiveKey1 = "";
        //draft.locSt.locStError1 = "";
      });
    }
    else {
      setSessionState((draft) => {
        draft.locSt.locStError1 = "Enter the quantity.";
      });
    }
  };

  const outMethods = {
    clearErrorState,
    missingDispos,
    tabClick,
    didDispoChange,
    setActiveItem,
    editDispoQty,
    chipSelect,
    damageTypeSelect,
    filterAssignedDispos,
    handleApply,
  };

  return outMethods;
}

const useDispoMainMethods = ({ sessionState, setSessionState }) => {
  return dispoMainMethods({ sessionState, setSessionState });
};

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

export { DispoMainPageMRV, useDispoMainMethods };
