import classes from "./StartExchange.module.css";
import { MRVheader } from "../../../../mrv/mrv-components/MRVheader";
import { EXCHheader } from "../../_Resources/components/EXCHheader";

import { Link } from "react-router-dom";

import produce from "immer";
import { useOutletContext } from "react-router-dom";

function StartExchange() {
  const exchangesCtx = useOutletContext();
  const todosCtx = exchangesCtx.sessionToDo;

  return (
    <section
      className={`mrv-primary-grid ${classes.container}`}
    >
      <section className={`mrv-panel__main exch-rows`}>
        <EXCHheader hasIcon={"back"} navBtnClick={() => console.log("TAST")} />
        <div className={`testest main_content main_col`}>
          <Link to={"chooseitems"}>Continue</Link>
        </div>
      </section>
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
