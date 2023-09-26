import classes from "./_TotalReviewCSS.module.css";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ApptCardTR({ apptData = "" }) {
  const exchCtx = useOutletContext();
  const [thisApptCode, thisApptObj] = apptData;
  const thisApptTime = thisApptObj.apptTime;
  const thisDayStr = `${thisApptTime.wkday}, ${thisApptTime.month} ${thisApptTime.date} :`;

  const cardDataGroup = ({
    name = "",
    content = "",
    sub = "",
    flex = "0 0 16rem",
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
          name: "xyz",
          content: "Contented",
          sub: `${thisApptTime.timeSlot}`,
        })}
      </section>
    </section>
  );
}

export { ApptCardTR };
