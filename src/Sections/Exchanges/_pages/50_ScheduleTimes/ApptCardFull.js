import classes from "./_ScheduleTimesCSS.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { TimeMiniCard } from "./TimeMiniCard";
import { TimePickerPanel } from "./TimePickerPanel30";
import { AllScheduled } from "./AllScheduled";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";

import { useImmer } from "use-immer";

function ApptCardFull({ appt, locSt, setLocSt, cardNum }) {
  const exchCtx = useOutletContext();
  const itemsInExch = exchCtx.exchSession.itemsInExchange;
  const thisDeliv = exchCtx.exchSession.deliveryGroups[appt];
  const isActive = locSt.activeKey === thisDeliv;

  //---- Shared Functions ----

  //---- UI Elements----

  const thFactory = (title, key, width) => {
    return { title, key, width };
  };

  const thInputs = [
    thFactory("Picking up from customer", "custPickup"),
    thFactory("Qty", "pickupQty", "5rem"),
    thFactory("", "spacer", "4rem"),
    thFactory("Delivering to customer", "custDeliv"),
    thFactory("Qty", "delivQty", "5rem"),
  ];
  const thArray = thInputs.map((th) => {
    return (
      <th key={th.key} style={{ width: th.width }} className={``}>
        {th.title}
      </th>
    );
  });

  const trArray = [];

  for (const item of thisDeliv.apptItemKeys) {
    const thisItemkey = itemsInExch[item];
    const returnItem = thisItemkey.returningItem;

    // populate Items
    trArray.push(
      <tr key={item} className={`nohover_bg ${""}`}>
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
    <section
      className={`cardStyle ${isActive ? "selected" : ""} ${
        classes.apptCard_container
      }`}
    >
      <table>
        <thead className={`clearCell ${""}`}>
          <tr>{thArray}</tr>
        </thead>
        <tbody>{trArray}</tbody>
      </table>
    </section>
  );
}

export { ApptCardFull };
