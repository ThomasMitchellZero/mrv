import classes from "./StartExchange.module.css";
import { MRVheader } from "../../../mrv/mrv-components/MRVheader";

import { Link } from "react-router-dom";

import produce from "immer";
import { useOutletContext } from "react-router-dom";

function StartExchange() {
  const exchangesCtx = useOutletContext();
  const todosCtx = exchangesCtx.sessionToDo;

  return (
    <section className={`mrv-primary-grid ${classes.container}`}>
      <div className={`mrv-panel__main`}>
        <MRVheader
          hasIcon={"back"}
          navBtnClick={() => console.log("TAST")}
        ></MRVheader>
        <div className={`testest main_content main_col`}>
          <Link to={"chooseitems"}>Continue</Link>
        </div>
      </div>
    </section>
  );
}

export default StartExchange;

/*

      <div className={`mrv-panel__left`}>
         
      </div>

      <div className={`mrv-panel__main`}>
        <div className={`xxx`}>bottoms</div>
      </div>

      <div className={`mrv-panel__right`}>Side</div>


*/
