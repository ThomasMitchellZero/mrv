import classes from "./_TotalReviewCSS.module.css";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ApptCardTR({ apptCode = "" }) {
  const exchCtx = useOutletContext();

  return (
    <section className={`cardStyle nohover ${classes.apptCard}`}>
      <p>{apptCode}</p>
    </section>
  );
}

export { ApptCardTR };
