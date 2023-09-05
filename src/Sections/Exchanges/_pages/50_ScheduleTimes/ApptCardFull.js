import classes from "./_ScheduleTimesCSS.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel30";
import { AllScheduled } from "./AllScheduled";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";

import { useImmer } from "use-immer";

function ApptCardFull({ appt, locSt, setLocSt }) {
  const exchCtx = useOutletContext();

  const itemsInExch = exchCtx.exchSession.itemsInExchange;

  const thisDeliv = exchCtx.exchSession.deliveryGroups[appt];

  //---- Shared Functions ----

  //---- UI Elements----


  const trArray = [];

  for (const item of thisDeliv.apptItemKeys) {
    const thisItemkey = itemsInExch[item];
    const returnItem = thisItemkey.returningItem;

    // populate Items
    trArray.push(
      <tr
        key={item}
        className={`${""}`}
      >
        <td>
          <ProductInfo
            hasPrice={true}
            itemObj={returnItem}
            qty={thisItemkey.qtyExchanging}
          />
        </td>
      </tr>

    // populate Children (LPP, etc)
    
    );
  }

  return (
    <section className={`cardStyle ${classes.apptCard_container}`}>
      <table>
        <tbody>{trArray}</tbody>
      </table>
    </section>
  );
}

export { ApptCardFull };
