import classes from "./StartExchange.module.css";
import { Link } from "react-router-dom";

import produce from "immer"
import { useOutletContext } from "react-router-dom";

function StartExchange() {
  const exchangesCtx = useOutletContext();
  const todosCtx = exchangesCtx.sessionToDo;
  

  const stateTest = produce(todosCtx, (draftState)=>{
    console.log(draftState);
  })

  return (
    <section className={`mrv-primary-grid ${classes.container}`}>
      <div className={`mrv-panel__left mrv-column-grid`}>
        <Link to={"chooseitems"}>Continue</Link>
      </div>

      <div className={`mrv-panel__main mrv-column-grid`}>
        <div className={`test-bottom-container`}>bottoms</div>
      </div>

      <div className={`mrv-panel__right mrv-column-grid`}>Side</div>
    </section>
  );
}

export default StartExchange;
