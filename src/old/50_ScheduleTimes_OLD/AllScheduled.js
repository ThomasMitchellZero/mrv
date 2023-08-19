import classes from "./_ScheduleTimesCSS.module.css";

import { MdOutlineCheckCircle } from "react-icons/md";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";


function AllScheduled({ parentSt, setParSt }) {
  const exchNav = useExchNav();

  /* ---- Shared Functions ---- */

  /* ---- UI Elements ---- */

  /* ---- Final Component ---- */

  return (
    <>
      <section className={` main_col ${classes.allScheduled}`}>
        <MdOutlineCheckCircle
          color={`var(--color__green)`}
          fontSize={"1.75rem"}
        />
        <h4 className={`heading__small`}>All exchanges have been scheduled.</h4>
      </section>
      <section className={`footer_text right_col`}>
        <p className={`tinyText warning`}></p>
      </section>
      <section className={`footer_content right_col`}>
        <button
          onClick={() => exchNav({ routeStr: "totalreview" })}
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
