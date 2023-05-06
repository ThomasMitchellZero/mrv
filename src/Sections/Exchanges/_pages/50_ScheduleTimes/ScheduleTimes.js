
import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";


import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";


import { useOutletContext } from "react-router";
import { current } from "immer";
import { useImmer } from "use-immer";

function ScheduleTimes() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;
  const exchNav = useExchNav();

  const defaultState = {
    show30warning: false,
    activeKey: null,
    activeTimeBtnObj: null,
  };

  //local state
  const [locSt_PickTime, setLocSt_PickTime] = useImmer(defaultState);

  // on every render, check if activeKey has a value.
  if (!locSt_PickTime.activeKey) {
    let outLocSt = {
      show30warning: false,
      activeKey: "All Scheduled",
      //activeTimeBtnObj: null, // If active, selected btn resets after Apply
    };

    // loop through the keys, return 1st with no apptTime.
    for (const thisKey of exchProdsMap.keys()) {
      // Valid values are either obj or string, but both are truthy
      const thisItemTime = exchProdsMap.get(thisKey).apptTime;
      if (!thisItemTime) {
        // if item has no time scheduled...
        outLocSt.activeKey = thisKey;
        //I don't think I need to do anything with activeTime?  
        break;
      }
    }

    setLocSt_PickTime((draft)=>{
      draft.activeKey = outLocSt.activeKey
      draft.show30warning = false

    });
  }

  /* ---- Shared Functions ---- */

  const handeApply = () => {
    const pickedTime = locSt_PickTime.activeTimeBtnObj;
    console.log(pickedTime);

    //If a time was picked...
    if (pickedTime) {
      // add that time to the
      setExchState((draft) => {
        const activeProduct = locSt_PickTime.activeKey;
        draft.exchProducts.get(activeProduct).apptTime = pickedTime;
      });

      setLocSt_PickTime((draft)=>{
        draft.activeKey = null;
        //draft.activeTimeBtnObj = null;
        draft.show30warning = false;
      })
    }
  };

  // Generate Time Cards
  const timeCardArr = [];

  exchProdsMap.forEach((value, mapKey) => {
    timeCardArr.push(
      <TimeMiniCard
        key={mapKey}
        prodKey={mapKey}
        locSt={locSt_PickTime}
        setLocSt={setLocSt_PickTime}
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
          headerTitle="NOT DONE"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "whichforwhat" })}
        />
        <TimePickerPanel
          localSt={locSt_PickTime}
          setLocSt={setLocSt_PickTime}
        />
        <ExchPizzaTracker />
        <section className={`footer_text right_col`}>
          <p className={`tinyText warning`}></p>
        </section>
        <section className={`footer_content right_col`}>
          {true ? (
            <button
              onClick={handeApply}
              className={`mrvBtn primary fullWidth jumbo`}
            >
              Apply
            </button>
          ) : null}
        </section>
      </section>
    </section>
  );
}

export { ScheduleTimes };

/*
  
  
*/
