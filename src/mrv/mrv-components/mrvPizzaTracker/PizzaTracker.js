import classes from "./ptStyle.module.css";
import { PTnode } from "./PTnode";


/*Component is designed to fill up a parent component.  That parent will be configured for the specific circumstances. */
function PizzaTracker({ ptObj, localStyles="" }) {
  return (
    <section className={`${classes.pt}`}>
      <PTnode></PTnode>
    </section>
  );
}

export { PizzaTracker };
