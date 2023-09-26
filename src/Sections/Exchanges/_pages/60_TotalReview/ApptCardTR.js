import classes from "./_TotalReviewCSS.module.css";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ApptCardTR({ apptData = "" }) {
  const exchCtx = useOutletContext();
  const [thisApptCode, thisApptObj] = apptData;

  const cardDataGroup = ({
    name = "",
    content = "",
    sub = "",
    flex = "0 0 16rem",
  }) => {
    return (
      <section style={{ flex: `${flex}` }} className={` ${classes.dataGroup}`}>
        <p>{name}</p>
        <h4>{content}</h4>
        <p>{sub}</p>
      </section>
    );
  };

  return (
    <section className={`cardStyle nohover ${classes.apptCard}`}>
      <section className={` ${classes.cardContent}`}>
        {cardDataGroup({ name: "xyz", content: "Contented", sub: "blerrgs" })}
        {cardDataGroup({ name: "xyz", content: "Contented", sub: "blerrgs" })}
      </section>
    </section>
  );
}

export { ApptCardTR };
