import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext, useNavigate } from "react-router";
import { current } from "immer";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

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
    setLocSt_PickTime({ ...findNextUnscheduled() });
  }

  /* ---- Shared Functions ---- */

  function findNextUnscheduled() {
    let outLocSt = {
      show30warning: false,
      activeKey: "All Scheduled",
      activeTimeBtnObj: null, // Not sure if right?
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
    return outLocSt;
  }

  const handeApply = () => {
    const pickedTime = locSt_PickTime.activeTimeBtnObj;
    console.log(pickedTime);

    //If a time was picked...
    if (pickedTime) {
      // add that time to the
      setExchState((draft) => {
        const activeProduct = locSt_PickTime.activeKey;
        const test =  current(draft.exchProducts)
        draft.exchProducts.get(locSt_PickTime.activeKey).apptTime = pickedTime;
      });


    }
  };

  /* ---- Table Elements ---- */

  // generate <th>
  const thFactory = (title = "", width = "") => {
    return { title, width };
  };

  const thInputs = [
    thFactory("Return Product"),
    thFactory("Qty", "3rem"),
    thFactory(" ", "4rem"),
    thFactory("Replacement Product"),
    thFactory("Qty ", "3rem"),
    thFactory("Remove", "5rem"),
  ];

  const thArray = thInputs.map((th) => {
    return (
      <th key={th.title} style={{ width: th.width }}>
        {th.title}
      </th>
    );
  });

  // Generate <tr>s
  const trArray = [];
  const timeCardArr = [];

  exchProdsMap.forEach((value, mapKey) => {
    timeCardArr.push(
      <TimeMiniCard
        key={mapKey}
        prodObj={value}
        isActive={mapKey === locSt_PickTime.activeKey}
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
