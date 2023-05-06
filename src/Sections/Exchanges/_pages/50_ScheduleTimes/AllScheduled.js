import classes from "./_ScheduleTimesCSS.module.css";

import { weekdayArr, monthArr } from "../../_Resources/glossary/glossaryExch";

import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { MdArrowForward, MdOutlineCheckCircle } from "react-icons/md";

import { useOutletContext } from "react-router";

function AllScheduled({ parentSt, setParSt }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;

  const activeKey = parentSt.activeKey;
  const show30warning = parentSt.show30warning;
  const activeTimeBtnObj = parentSt.activeTimeBtnObj;
  const activeProduct = exchProdsMap.get(activeKey);

  const allComplete = true;

  /* ---- Shared Functions ---- */

  const handleContinue = () => {
    const pickedTime = parentSt.activeTimeBtnObj;

    //If a time was picked...
    if (pickedTime) {
      // add that time to the
      setExchState((draft) => {
        const activeProduct = parentSt.activeKey;
        draft.exchProducts.get(activeProduct).apptTime = pickedTime;
      });

      setParSt((draft) => {
        draft.activeKey = null;
        //draft.activeTimeBtnObj = null;
        draft.showApplyWarning = false;
      });
    }
  };

  /* ---- UI Elements ---- */

  /* ---- Final Component ---- */

  return (
    <>
      <section className={` main_col ${classes.allScheduled}`}>
        <MdOutlineCheckCircle />
        <h4 className={`heading__small`}>
          All exchanges have been scheduled.
        </h4>
      </section>
      <section className={`footer_text right_col`}>
        <p className={`tinyText warning`}></p>
      </section>
      <section className={`footer_content right_col`}>
        <button
          onClick={handleContinue}
          className={`mrvBtn primary fullWidth jumbo`}
        >
          Continue
        </button>
      </section>
    </>
  );
}

export { AllScheduled };

/*






*/
