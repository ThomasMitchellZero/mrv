import classes from "./_ScheduleTimesCSS.module.css";

import { MdOutlineCheckCircle } from "react-icons/md";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

function AllScheduled({ parentSt, setParSt }) {
  const exchNav = useExchNav();

  /* ---- Shared Functions ---- */

  /* ---- UI Elements ---- */

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPanel__side`}>
      <section className={` ${classes.allScheduled}`}>
        <MdOutlineCheckCircle
          color={`var(--color__green)`}
          fontSize={"1.75rem"}
        />
        <h4 className={`heading__small`}>All exchanges have been scheduled.</h4>
      </section>
      <section className={`footer_text `}>
        <p className={`tinyText warning`}></p>
      </section>
      <section className={`footer_content `}>
        <div className={`buttonBox`}>
          <button
            onClick={() => exchNav({ routeStr: "totalreview" })}
            className={`mrvBtn primary fullWidth jumbo`}
          >
            Continue
          </button>
        </div>
      </section>
    </section>
  );
}

export { AllScheduled };

/*






*/
