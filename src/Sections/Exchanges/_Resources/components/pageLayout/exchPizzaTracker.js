import { PizzaTracker } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvPizzaTracker/PizzaTracker";

import { useOutletContext } from "react-router";

function ExchPizzaTracker() {
  const exchCtx = useOutletContext();

  return (
    <section className={`pizzaTracker`}>
      <PizzaTracker ptObj={exchCtx.exchSession.ptState} />
    </section>
  );
}

export { ExchPizzaTracker };
