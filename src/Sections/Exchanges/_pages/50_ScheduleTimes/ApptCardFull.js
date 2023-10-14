import classes from "./_ScheduleTimesCSS.module.css";

import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useSwapGroupsArr } from "../../_Resources/customHooks/exchHooks";

import { useOutletContext } from "react-router";

import { MdArrowForward } from "react-icons/md";

import { useImmer } from "use-immer";

function ApptCardFull({ appt, parentLocSt, setparentLocSt, setDelivFn }) {
  const exchCtx = useOutletContext();

  const thisDelivery = exchCtx.exchSession.deliveryGroups[appt];
  const thisDelivTime = thisDelivery?.apptTime;
  const isActive = parentLocSt.activeKey === appt ? "selected" : "";

  //---- Shared Functions ----

  const handleCardClick = () => {
    setDelivFn(appt);
  };

  //---- UI Elements----

  // Shows appt time if picked, else msg to choose time.
  let apptTimeJSX = thisDelivTime ? (
    <p className={"color__primary__text body bold keepSpace"}>
      {thisDelivTime?.timeTxtStr}
    </p>
  ) : (
    <p className={"color__tertiary__text body__small"}>Choose date and time</p>
  );

  //headers for the table of items on this card.
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

  for (const item of thisDelivery.apptItemKeys) {
    const returnItem = item.thisSwapValue.returningItem;
    const replacementItem = item.thisSwapValue.replacementItem;

    // populate Items
    trArray.push(
      <tr
        key={`${item.swapGroupKey}${item.thisSwapkey}`}
        className={`nohover_bg ${""}`}
      >
        <td>
          <ProductInfo hasPrice={false} itemObj={returnItem} />
        </td>
        <td>
          <h4>{returnItem.pickupQty}</h4>
        </td>
        <td>
          <MdArrowForward fontSize="2.5rem" className={`color__green__text`} />
        </td>
        <td>
          <ProductInfo hasPrice={false} itemObj={replacementItem} />
        </td>
        <td>
          <h4>{replacementItem.deliveryQty}</h4>
        </td>
      </tr>
    );
  }

  return (
    <section className={`cardStyle ${isActive}`} onClick={handleCardClick}>
      <section className={` ${classes.cardSchedText}`}>
        <p
          className={`body color__secondary__text`}
        >{`Exchange ${thisDelivery.appointmentIndex}:`}</p>
        {apptTimeJSX}
      </section>
      <table>
        <thead className={`clear ${""}`}>
          <tr>{thArray}</tr>
        </thead>
        <tbody>{trArray}</tbody>
      </table>
    </section>
  );
}

export { ApptCardFull };
