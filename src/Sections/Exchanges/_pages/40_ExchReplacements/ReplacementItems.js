import classes from "./_ReplacementItems.css";

import { ReplacementDetails30 } from "./ReplacementDetails30";
import { ReplacementCard } from "./ReplacementCard";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { useGroupAppointments } from "../../_Resources/customHooks/useGroupAppointments";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";

function ReplacementItems() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchNav = useExchNav();
  const groupAppointments = useGroupAppointments();

  const defaultState = {
    show30warning: false,
  };

  //local state
  const [locSt_Replace, setLocSt_Replace] = useImmer(defaultState);

  /* ---- Shared Functions ---- */

  const handleReplacementContinue = () => {
    //calculate, populate shipments

    groupAppointments();

    // nav to Schedule
    exchNav({ routeStr: "schedule" });
  };

  /* ---- Table Elements ---- */

  const cardsArr = [];

  for (const itemNum of Object.keys(exchItems)) {
    cardsArr.push(
      <ReplacementCard
        key={itemNum}
        parLocSt_Replace={locSt_Replace}
        setParLocSt_Replace={setLocSt_Replace}
        exchItemNum={itemNum}
      />
    );
  }

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage replacementTop`}>
      <section className={`mrvPanel__main `}>
        <ExchHeader
          headerTitle="Replacement Products"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "exchreason" })}
        /> 
        <ExchPizzaTracker />
        <section className={`main_content `}> {cardsArr}</section>

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
      <ReplacementDetails30 />
    </section>
  );
}

export { ReplacementItems };

/*
  
  
*/
