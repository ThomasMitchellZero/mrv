import { ExchPizzaTracker } from "../Sections/Exchanges/_Resources/components/pageLayout/exchPizzaTracker";

import { ExchHeader } from "../Sections/Exchanges/_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "../Sections/Exchanges/_pages/50_ScheduleTimes/TimeMiniCard";
import { TimePickerPanel } from "../Sections/Exchanges/_pages/50_ScheduleTimes/TimePickerPanel30";
import { AllScheduled } from "../Sections/Exchanges/_pages/50_ScheduleTimes/AllScheduled";

import { useExchNav } from "../Sections/Exchanges/_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";

import { useImmer } from "use-immer";

function ExchScheduleTimes() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;
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

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage `}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Schedule Pickup / Delivery"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "whichforwhat" })}
        />
        <ExchPizzaTracker />
        {locSt_PickTime.activeKey === allScheduledStr ? (
          <AllScheduled
            parentSt={locSt_PickTime}
            setParSt={setLocSt_PickTime}
          />
        ) : (
          <TimePickerPanel
            parentSt={locSt_PickTime}
            setParSt={setLocSt_PickTime}
          />
        )}
      </section>
      <section className={`mrvPanel__side exch-rows blankback`}>
        <ExchHeader
          headerTitle="Exchange Items"
          hasCluster={false}
          hasProductName={false}
        />
        <section className={`fullColumn`}>{timeCardArr}</section>
      </section>
    </section>
  );
}

export { ExchScheduleTimes };

/*
  
  
*/
