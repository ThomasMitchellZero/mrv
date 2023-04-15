import { PizzaTracker } from "../../../../mrv/mrv-components/mrvPizzaTracker/PizzaTracker";

import { useOutletContext } from "react-router";

function ExchPizzaTracker() {
  const exchCtx = useOutletContext();
  console.log(exchCtx)

  return (
    <section className={`pizzaTracker`}>
      <PizzaTracker ptObj={exchCtx.exchSession.ptState} />
    </section>
  );
}

export { ExchPizzaTracker };
