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

  /* ---- Shared Functions ---- */

  const setActiveDeliveryFn = (delivNum) => {
    // allScheduledStr is never a delivery key, so this is safe.
    // Narrator: It was not safe.
    const thisDelivTimeObj = delivGroups[delivNum]?.apptTime ?? null;

    setlocSt_Schedule((draft) => {
      draft.activeKey = delivNum;
      draft.activeTimeBtnObj = thisDelivTimeObj;
      draft.showApplyWarning = false;
    });
  };

  //---- On Render ----

  // on every render, check if activeKey has a value.  Applying a time in TimePicker sets this to null to trigger a search for any unassigned times.

  if (!locSt_Schedule.activeKey) {
    // this function ONLY checks for unassigned times.

    let outActiveKey = allScheduledStr;

    // loop through the keys, return 1st with no apptTime.
    for (const thisAppt of Object.entries(delivGroups)) {
      // Valid values are either obj or string, but both are truthy
      const thisItemTime = thisAppt[1].apptTime;
      if (!thisItemTime) {
        // if prod has no time scheduled...
        outActiveKey = thisAppt[0]; // it becomes the new active prod
        break;
      }
    }

    setActiveDeliveryFn(outActiveKey);
  }

  /* ---- UI Elements ---- */

  // Generate Time Cards

  const timeCardArr = [];

  for (const apptKey of Object.keys(delivGroups)) {


    timeCardArr.push(
      <ApptCardFull
        key={apptKey}
        appt={apptKey}
        parentLocSt={locSt_Schedule}
        setparentLocSt={setlocSt_Schedule}
        setDelivFn={setActiveDeliveryFn}
      />
    );
  }

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage `}>
      <section className={`mrvPanel__main color__surface__subdued`}>
        <ExchHeader
          headerTitle="Schedule Pickup / Delivery"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "whichforwhat" })}
        />
        <ExchPizzaTracker />
        <section className={`main_content cardContainer ${""}`}>
          {timeCardArr}
        </section>
      </section>
      {locSt_Schedule.activeKey === allScheduledStr ? (
        <AllScheduled />
      ) : (
        <TimePickerPanel
          parentLocSt={locSt_Schedule}
          setparentLocSt={setlocSt_Schedule}
          setDelivFn={setActiveDeliveryFn}
        />
      )}
    </section>
  );
}

export { ExchScheduleTimes };

/*
  
  
*/
