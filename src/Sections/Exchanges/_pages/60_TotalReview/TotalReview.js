import classes from "./_TotalReviewCSS.module.css";

import { ApptCardTotRev } from "./ApptCardTotRev.js";
import { PaymentSummary } from "./PaymentSummary";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ExchTotalReview() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchDeliveries = exchCtx.exchSession.deliveryGroups;
  const exchNav = useExchNav();

  const defaultState = {
    show30warning: false,
  };

  //local state
  const [locSt_TotalRev, setLocSt_TotalRev] = useImmer(defaultState);

  /* ---- Shared Functions ---- */

  /* ---- Table Elements ---- */

  // generate <th>

  // Generate <tr>s
  const apptCardsArr = [];

  for (const thisAppointment of Object.entries(exchDeliveries)) {
    const [thisApptCode, thisApptObj] = thisAppointment;

    apptCardsArr.push(
      <ApptCardTotRev key={thisApptCode} apptData={thisAppointment} />
    );
  }

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main color__surface__subdued`}>
        <ExchHeader
          headerTitle="Review Exchange"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "schedule" })}
        />
        <ExchPizzaTracker />
        <section className={`main_content `}>
          <section className={`cardContainer`}>
            <p className={`color__primary__text body__large`}>
              Exchange Appointments
            </p>
            {apptCardsArr}
          </section>
        </section>
      </section>
      <PaymentSummary />
    </section>
  );
}

export { ExchTotalReview };

/*
  
  
*/
