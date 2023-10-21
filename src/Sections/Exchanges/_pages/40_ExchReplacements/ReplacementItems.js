import "./_ReplacementItems.css";

import { ReplacementDetails30 } from "./ReplacementDetails30";

import { ReplaceSwapsCard } from "./ReplaceSwapsCard";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import {
  useSwapGroupsArr,
  useGroupAppointments,
} from "../../_Resources/customHooks/exchHooks";



import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";

function ReplacementItems() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchSwapGroups = exchCtx.exchSession.allSwapGroups;

  const swapGroupArr = useSwapGroupsArr();

  const exchNav = useExchNav();
  const groupAppointments = useGroupAppointments();

  // all values need to be in dollars, not cents, to reflect user inputs
  const defaultLocSt = {
    replacementSum: 420,
    discount: 0,
    discountPct: 0,
    discountedTotal: 420,
  };

  //local state
  const [locSt_Replace, setLocSt_Replace] = useImmer(defaultLocSt);

  /* ---- Shared Functions ---- */

  const handleReplacementContinue = () => {
    //calculate, populate shipments

    groupAppointments();

    // nav to Schedule
    exchNav({ routeStr: "schedule" });
  };

  /* ---- Table Elements ---- */

  const cardsArr = [];

  for (const swapGroupNum of Object.keys(exchSwapGroups)) {
    // Cards are for Swap Groups.  Single swaps are rows within the cards.
    cardsArr.push(
      <ReplaceSwapsCard
        key={swapGroupNum}
        parLocSt_Replace={locSt_Replace}
        setParLocSt_Replace={setLocSt_Replace}
        exchSwapGroupNum={swapGroupNum}
      />
    );
  }

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage replacementTop `}>
      <section className={`mrvPanel__main color__surface__subdued`}>
        <ExchHeader
          headerTitle="Replacement Products"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "exchreason" })}
        />
        <ExchPizzaTracker />
        <section className={`main_content cardContainer`}>{cardsArr}</section>
        <section className={`footer_text`}>
          <p className={`tinyText warning`}></p>
        </section>
        <section className={`footer_content`}>
          <div className={`buttonBox`}>
            <button
              onClick={handleReplacementContinue}
              className={`mrvBtn primary fullWidth jumbo`}
            >
              Continue
            </button>
          </div>
        </section>
      </section>
      <ReplacementDetails30
        parLocSt_Replace={locSt_Replace}
        setParLocSt_Replace={setLocSt_Replace}
      />
    </section>
  );
}

export { ReplacementItems };

/*
  
  
*/
