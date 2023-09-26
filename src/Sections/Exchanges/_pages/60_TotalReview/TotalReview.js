import classes from "./_TotalReviewCSS.module.css";

import { ApptCardTR } from "./ApptCardTR";

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
  const thFactory = (title = "", width = "") => {
    return { title, width };
  };

  const thInputs = [
    thFactory("Return Product"),
    thFactory("Qty", "3rem"),
    thFactory(" ", "4rem"),
    thFactory("Replacement Product"),
    thFactory("Qty ", "3rem"),
    thFactory("Balance", "5rem"),
  ];

  const thArray = thInputs.map((th) => {
    return (
      <th key={th.title} style={{ width: th.width }}>
        {th.title}
      </th>
    );
  });

  // Generate <tr>s
  const apptCardsArr = [];

  for (const thisAppointment of Object.entries(exchDeliveries)) {
    const [thisApptCode, thisApptObj] = thisAppointment;

    apptCardsArr.push(
      <ApptCardTR key={thisApptCode} apptData={thisAppointment} />
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
            <p className={`body__large`}>Exchange Appointments</p>
            {apptCardsArr}
          </section>
        </section>
      </section>
      <section className={`mrvPanel__side `}>
        <ExchHeader
          hasCluster={false}
          headerTitle={"Payment Summary"}
          hasProductName={false}
        />
        <section className={`main_content`}></section>
        <section className={`footer_text`}>
          <p className={`tinyText warning`}></p>
        </section>
        <section className={`footer_content`}>
          <div className={`buttonBox`}>
            <button
              onClick={() => {
                exchNav({ routeStr: "receipt" });
              }}
              className={`mrvBtn primary fullWidth jumbo`}
            >
              Continue
            </button>
          </div>
        </section>
      </section>
    </section>
  );
}

export { ExchTotalReview };

/*
  
  
*/
