import classes from "./_TotalReviewCSS.module.css";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ApptCardTotRev({ apptData = "" }) {
  const exchCtx = useOutletContext();
  const [thisApptCode, thisApptObj] = apptData;
  const thisApptTime = thisApptObj.apptTime;
  const thisDayStr = `${thisApptTime.wkday}, ${thisApptTime.month} ${thisApptTime.date} :`;

  const cardDataGroup = ({
    name = "",
    content = "",
    sub = "",
    flex = "1 1 0rem",
  }) => {
    return (
      <section style={{ flex: `${flex}` }} className={` ${classes.dataGroup}`}>
        <p className={`color__secondary__text body__small`}>{name}</p>
        <h4 className={`color__primary__text heading__small`}>{content}</h4>
        <p className={`color__tertiary__text body`}>{sub}</p>
      </section>
    );
  };

  return (
    <section className={`cardStyle nohover ${classes.apptCard}`}>
      <section className={` ${classes.cardContent}`}>
        {cardDataGroup({
          name: `Exchange ${thisApptObj.appointmentIndex}`,
          content: thisDayStr,
          sub: `${thisApptTime.timeSlot}`,
        })}
        {cardDataGroup({
          name: "Address",
          content: `${thisApptObj.address.street}`,
          sub: `${thisApptObj.address.addressStr}`,
          flex: "3 3 0rem",
        })}
        {cardDataGroup({
          name: `Pick up from customer`,
          content: `${thisApptObj.totalApptPickupQty} item(s)`,
          flex: "1.5 1.5 0rem",
        })}
        {cardDataGroup({
          name: `Deliver to customer`,
          content: `${thisApptObj.totalApptDeliveryQty} item(s)`,
        })}
      </section>
      <div className={`divider horizontal`}></div>
      <section className={` ${classes.cardContent} ${classes.delivery}`}>
        <p className={`color__secondary__text body__small`}>Delivery Instructions : </p>
        <p className={`color__tertiary__text body`}>
          {`${thisApptObj.deliveryInstructions}`}
        </p>
      </section>
    </section>
  );
}

export { ApptCardTotRev };
