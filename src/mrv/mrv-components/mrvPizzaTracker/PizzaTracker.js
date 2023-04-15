import classes from "./ptStyle.module.css";
import { PTnode } from "./PTnode";

function PizzaTracker({ ptObj, localStyles="" }) {
  return (
    <section className={`${localStyles}`}>
      <PTnode></PTnode>
    </section>
  );
}

export { PizzaTracker };
