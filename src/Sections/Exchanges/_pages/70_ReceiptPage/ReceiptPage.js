

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ExchReceiptPage() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;
  const exchNav = useExchNav();

  const defaultState = {
  };

  //local state
  const [locSt_TotalRev, setLocSt_TotalRev] = useImmer(defaultState);

  // on every render, check if activeKey has a value.

  /* ---- Shared Functions ---- */

  /* ---- Table Elements ---- */


  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Receipt"
        />
        <section className={`main_content main_col`}>
          <h3>The real exchange was the friends we replaced along the way</h3>
        </section>

        <section className={`footer_text right_col`}>
          <p className={`tinyText warning`}></p>
        </section>
      </section>
    </section>
  );
}

/*
    
    
  */

export { ExchReceiptPage };
