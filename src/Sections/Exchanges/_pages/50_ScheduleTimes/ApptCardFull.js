import classes from "./_ScheduleTimesCSS.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel30";
import { AllScheduled } from "./AllScheduled";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";

import { useImmer } from "use-immer";

function ApptCardFull({ appt , locSt, setLocSt}) {
  const exchCtx = useOutletContext();
  const delivGroups = exchCtx.deliveryGroups;
  const itemsInExch = exchCtx.itemsInExch;

  //---- Shared Functions ----

  return <section className={`cardStyle ${classes.apptCard_container}`}>
    <p>{appt}</p>
  </section>;
}

export { ApptCardFull };
