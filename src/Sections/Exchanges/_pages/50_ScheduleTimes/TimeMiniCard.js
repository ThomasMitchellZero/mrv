import classes from "./TimeMiniCard.module.css";

import { MdDeleteOutline } from "react-icons/md";

import { useOutletContext } from "react-router";

function TimeMiniCard({ prodObj = {}, isActive = false, locSt, setLocSt }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;

  const timeObj = prodObj.apptTime;
  

  /* ---- Shared Functions ---- */

  /* ---- UI Elements ---- */
  let timeStr = timeObj ? ( // if this prod has a timeObj assigned...

    <p // Time-specific string and CSS
      className={`body__small color__primary__text bold ${""}`}
    >{`${timeObj.month} ${timeObj.date}, ${timeObj.timeSlot}`}</p>
  ) : ( // else, generic text and CSS
    <p className={`body__small color__tertiary__text ${""}`}>
      Schedule Appointment
    </p>
  );

  const product = prodObj.productDetails;

  return (
    <section
      className={`cardStyle ${isActive ? "selected" : ""} ${classes.container}`}
    >
      <img src={product.img} alt="test" className={classes.productImage} />
      <section className={`${classes.column}`}>{timeStr}</section>
      <button type="button" className={`mrvBtn ghost`}>
        <MdDeleteOutline fontSize="1.5rem" />
      </button>
    </section>
  );
}

export { TimeMiniCard };
