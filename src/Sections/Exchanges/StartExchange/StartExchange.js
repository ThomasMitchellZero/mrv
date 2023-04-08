import classes from "./StartExchange.module.css";
import { Link } from "react-router-dom";
function StartExchange() {
  return (
    <section className={`${classes.container}`}>
      <div className={`mrv-side mrv-column-grid`}>
        <Link to={"chooseitems"}>Continue</Link>
      </div>

      <div className={`mrv-main mrv-column-grid`}>
        <div className={`test-bottom-container`}>bottoms</div>
      </div>

      <div className={`mrv-side mrv-column-grid`}>Side</div>
    </section>
  );
}

export default StartExchange;
