import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
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
  const [locSt_Schedule, setlocSt_Schedule] = useImmer(defaultState);

  //---- On Render ----

  // on every render, check if activeKey has a value.

  if (!locSt_Schedule.activeKey) {
    let outLocSt = {
      showApplyWarning: false,
      activeKey: allScheduledStr,
      //activeTimeBtnObj: null, // If active, selected btn resets after Apply
    };

    // loop through the keys, return 1st with no apptTime.
    for (const thisKey of Object.entries(delivGroups)) {
      // Valid values are either obj or string, but both are truthy
      const thisItemTime = thisKey[1].apptTime;
      if (!thisItemTime) {
        // if prod has no time scheduled...
        outLocSt.activeKey = thisKey[0]; // it befomes the new active prod
        break;
      }
    }

    setlocSt_Schedule((draft) => {
      draft.activeKey = outLocSt.activeKey;
      draft.showApplyWarning = false;
    });
  }

  /* ---- Shared Functions ---- */

  /* ---- UI Elements ---- */

  // Generate Time Cards

  const timeCardArr = [];

  for (const apptKey of Object.keys(delivGroups)) {
    const cardNumber = timeCardArr.length + 1;
    timeCardArr.push(
      <ApptCardFull
        key={apptKey}
        appt={apptKey}
        parentLocSt={locSt_Schedule}
        setparentLocSt={setlocSt_Schedule}
        cardNum={cardNumber}
      />
    );
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
      <TimePickerPanel
        parentLocSt={locSt_Schedule}
        setparentLocSt={setlocSt_Schedule}
      />
    </section>
  );
}

export { ExchScheduleTimes };

/*
  
  
*/
