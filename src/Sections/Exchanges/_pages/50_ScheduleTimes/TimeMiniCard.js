import classes from "./_ScheduleTimesCSS.module.css";

import { MdDeleteOutline } from "react-icons/md";

import { useOutletContext } from "react-router";

function TimeMiniCard({ parentSt, setParSt, prodKey }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const thisProdObj = exchCtx.exchSession.exchProducts.get(prodKey);

  const timeObj = thisProdObj.apptTime;
  const product = thisProdObj.productDetails;
  const isActive = parentSt.activeKey === prodKey;

  /* ---- Shared Functions ---- */

  const handleCardClick = () => {
    setParSt((draft) => {
      draft.activeKey = prodKey;
      draft.showApplyWarning = false;
      draft.activeTimeBtnObj = timeObj;
    });
  };

  const handleDelete =(event)=>{
    setExchState((draft) => {
      draft.exchProducts.delete(prodKey);
    });

    // set Session state
    setParSt((draft) => {
      draft.showApplyWarning = false;

      // Only reassign activeKey if the Active item was deleted.
      const deletingActive = parentSt.activeKey === prodKey;
      // Set activeKey to null so that activeKey is auto-set next render.
      if (deletingActive) {
        draft.activeKey = null;
      }
    });
    event.stopPropagation();
  }

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
      className={`cardStyle ${isActive ? "selected" : ""} ${
        classes.mc_container
      }`}
      onClick={handleCardClick}
    >
      <img src={product.img} alt="test" className={classes.productImage} />
      <section className={`${classes.column}`}>{timeStr}</section>
      <button type="button" className={`mrvBtn ghost`} onClick={handleDelete}>
        <MdDeleteOutline fontSize="1.5rem" />
      </button>
    </section>
  );
}

export { TimeMiniCard };
