import classes from "./StartExchange.module.css";
import { Link } from "react-router-dom";
function StartExchange() {
  return (
    <section className={`${classes.container}`}>
      <Link to={"chooseitems"}>Continue</Link>
    </section>
  );
}

export default StartExchange;
