import classes from "./_TotalReviewCSS.module.css";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ApptCardTR({ apptData = "" }) {
  const exchCtx = useOutletContext();
  const [thisApptCode, thisApptObj] = apptData;

  return (
    <section className={`cardStyle nohover ${classes.apptCard}`}>
      <p>{thisApptCode}</p>
    </section>
  );
}

export { ApptCardTR };
