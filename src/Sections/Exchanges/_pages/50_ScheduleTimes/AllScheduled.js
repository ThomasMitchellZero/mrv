import classes from "./ScheduleTimesCSS.module.css";

import { weekdayArr, monthArr } from "../../_Resources/glossary/glossaryExch";

import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { MdArrowForward, MdOutlineCheckCircle } from "react-icons/md";

import { useOutletContext } from "react-router";

function AllScheduled({ localSt, setLocSt }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;

  const activeKey = localSt.activeKey;
  const show30warning = localSt.show30warning;
  const activeTimeBtnObj = localSt.activeTimeBtnObj;
  const activeProduct = exchProdsMap.get(activeKey);

  const allComplete = true;

  /* ---- Shared Functions ---- */


  const handleContinue = () => {

    const pickedTime = localSt.activeTimeBtnObj;

    //If a time was picked...
    if (pickedTime) {
      // add that time to the
      setExchState((draft) => {
        const activeProduct = localSt.activeKey;
        draft.exchProducts.get(activeProduct).apptTime = pickedTime;
      });

      setLocSt((draft)=>{
        draft.activeKey = null;
        //draft.activeTimeBtnObj = null;
        draft.showApplyWarning = false;
      })
    }
  };

  /* ---- UI Elements ---- */

  /* ---- Final Component ---- */

  return (
    <>
      <section className={` main_content main_col ${classes.allScheduled}`}>
        Hello there
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
