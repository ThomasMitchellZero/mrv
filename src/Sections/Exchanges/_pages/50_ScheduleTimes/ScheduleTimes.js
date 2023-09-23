import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel30";
import { AllScheduled } from "./AllScheduled";
import { ApptCardFull } from "./ApptCardFull";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";

import { useImmer } from "use-immer";

function ExchScheduleTimes() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const delivGroups = exchCtx.exchSession.deliveryGroups;
  const exchNav = useExchNav();
  const allScheduledStr = "All Scheduled";

  const defaultState = {
    showApplyWarning: false,
    activeKey: null,
    activeTimeBtnObj: null,
  };

  //local state
  const [locSt_PickTime, setLocSt_PickTime] = useImmer(defaultState);

  //---- On Render ----

  // on every render, check if activeKey has a value.

  /*
     if (!locSt_PickTime.activeKey) {
    let outLocSt = {
      showApplyWarning: false,
      activeKey: allScheduledStr,
      //activeTimeBtnObj: null, // If active, selected btn resets after Apply
    };

    // loop through the keys, return 1st with no apptTime.
    for (const thisKey of exchProdsMap.keys()) {
      // Valid values are either obj or string, but both are truthy
      const thisItemTime = exchProdsMap.get(thisKey).apptTime;
      if (!thisItemTime) {
        // if prod has no time scheduled...
        outLocSt.activeKey = thisKey; // it befomes the new active prod
        break;
      }
    }

    setLocSt_PickTime((draft) => {
      draft.activeKey = outLocSt.activeKey;
      draft.showApplyWarning = false;
    });
  }
  */

  /* ---- Shared Functions ---- */

  /* ---- UI Elements ---- */

  // Generate Time Cards

  const timeCardArr = [];

  for (const apptKey of Object.keys(delivGroups)) {
    timeCardArr.push(<ApptCardFull key={apptKey} appt={apptKey} />);
  }

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage `}>
      <section className={`mrvPanel__main exch-rows color__surface__subdued`}>
        <ExchHeader
          headerTitle="Schedule Pickup / Delivery"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "whichforwhat" })}
        />
        <ExchPizzaTracker />
        <section className={`main_content main_col cardContainer ${""}`}>
          {timeCardArr}
        </section>
      </section>
      <TimePickerPanel parentSt={locSt_PickTime} setParSt={setLocSt_PickTime} />
    </section>
  );
}

export { ExchScheduleTimes };

/*
  
  
*/
