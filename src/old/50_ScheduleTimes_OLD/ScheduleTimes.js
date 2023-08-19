import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel";
import { AllScheduled } from "./AllScheduled";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";
import { current } from "immer";
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

  // on every render, check if activeKey has a value.
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

  /* ---- Shared Functions ---- */

  /* ---- UI Elements ---- */

  // Generate Time Cards
  const timeCardArr = [];

  exchProdsMap.forEach((_value, mapKey) => {
    timeCardArr.push(
      <TimeMiniCard
        key={mapKey}
        prodKey={mapKey}
        parentSt={locSt_PickTime}
        setParSt={setLocSt_PickTime}
      />
    );
  });

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__side exch-rows blankback`}>
        <ExchHeader
          headerTitle="Exchange Items"
          hasCluster={false}
          hasProductName={false}
        />
        <section className={`fullColumn`}>{timeCardArr}</section>
      </section>
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
    </section>
  );
}

export { ExchScheduleTimes };

/*
  
  
*/
