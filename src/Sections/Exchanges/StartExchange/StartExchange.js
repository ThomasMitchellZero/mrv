import classes from "./StartExchange.module.css";
import { Link } from "react-router-dom";

import produce from "immer"
import { useOutletContext } from "react-router-dom";

function StartExchange() {
  const exchangesCtx = useOutletContext();
  const todosCtx = exchangesCtx.sessionToDo;

  return (
    <section className={`mrv-primary-grid ${classes.container}`}>
      <div className={`mrv-panel__main MR`}>
        <div className={`bottomColumnLeft`}>bottoms</div>
        <div className={`bottomColumnRight`}>bottoms</div>
      </div>
    </section>
  );
}

export default StartExchange;

/*

      <div className={`mrv-panel__left`}>
        <Link to={"chooseitems"}>Continue</Link>
      </div>

      <div className={`mrv-panel__main`}>
        <div className={`xxx`}>bottoms</div>
      </div>

      <div className={`mrv-panel__right`}>Side</div>


*/