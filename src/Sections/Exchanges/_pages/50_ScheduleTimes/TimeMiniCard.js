import classes from "./TimeMiniCard.module.css";

import { MdDeleteOutline } from "react-icons/md";

import { useOutletContext } from "react-router";

function TimeMiniCard({ locSt, setLocSt, prodKey }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const thisProdObj = exchCtx.exchSession.exchProducts.get(prodKey);

  const timeObj = thisProdObj.apptTime;
  const product = thisProdObj.productDetails;
  const isActive = locSt.activeKey === prodKey;

  /* ---- Shared Functions ---- */

  const handleCardClick = () => {
    setLocSt((draft) => {
      draft.activeKey = prodKey;
      draft.showApplyWarning = false;
      draft.activeTimeBtnObj = timeObj
    });
  };

  /* ---- UI Elements ---- */
  let timeStr = timeObj ? ( // if this prod has a timeObj assigned...
    <p // Time-specific string and CSS
      className={`body__small color__primary__text bold ${""}`}
    >{`${timeObj.month} ${timeObj.date}, ${timeObj.timeSlot}`}</p>
  ) : (
    // else, generic text and CSS
    <p className={`body__small color__tertiary__text ${""}`}>
      Schedule Appointment
    </p>
  );

  return (
    <section
      className={`cardStyle ${isActive ? "selected" : ""} ${classes.container}`}
      onClick={handleCardClick}
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
