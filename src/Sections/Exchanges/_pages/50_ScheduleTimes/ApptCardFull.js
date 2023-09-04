import classes from "./_ScheduleTimesCSS.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel30";
import { AllScheduled } from "./AllScheduled";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";

import { useImmer } from "use-immer";

function ApptCardFull({ appt, locSt, setLocSt }) {
  const exchCtx = useOutletContext();

  const itemsInExch = exchCtx.exchSession.itemsInExchange;


  const thisDeliv = exchCtx.exchSession.deliveryGroups[appt];


  //---- Shared Functions ----

  //---- UI Elements----

  const itemsArr = [];

  for (const item of thisDeliv.apptItemKeys) {
    const thisItemkey = itemsInExch[item];
    const returnItem = thisItemkey.returningItem;
    itemsArr.push(
      <section key={item}>
        <p>{returnItem.productDetails.modelNum}</p>
      </section>
    );
  }

  return (
    <section className={`cardStyle ${classes.apptCard_container}`}>
      {itemsArr}
    </section>
  );
}

export { ApptCardFull };
