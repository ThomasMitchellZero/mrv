import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext, useNavigate } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ScheduleTimes() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;
  const exchNav = useExchNav();

  const defaultState = {
    show30warning: false,
  };

  //local state
  const [locSt_WhichFor, setLocSt_WhichFor] = useImmer(defaultState);

  // on every render, check if activeKey has a value.

  /* ---- Shared Functions ---- */

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

  exchProdsMap.forEach((value, key) => {
    timeCardArr.push(<TimeMiniCard key={key} prodObj={value} />);
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
        <section className={`main_content main_col`}>
          <section className={`tableContainer`}>
            <table>
              <thead>
                <tr>{thArray}</tr>
              </thead>
              <tbody>{trArray}</tbody>
            </table>
          </section>
        </section>
        <ExchPizzaTracker />
        <section className={`footer_text right_col`}>
          <p className={`tinyText warning`}></p>
        </section>
        <section className={`footer_content right_col`}>
          {true ? (
            <button
              onClick={() => {}}
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
