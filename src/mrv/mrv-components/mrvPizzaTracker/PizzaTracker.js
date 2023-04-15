import classes from "./ptStyle.module.css";
import { PTnode } from "./PTnode";

/*Component is designed to fill up a parent component.  That parent will be configured for the specific circumstances. */
function PizzaTracker({ ptObj = {}, localStyles = "" }) {
  const activeIndex = ptObj.activeNode;
  const ptArr = ptObj.ptNodes;

  const nodeArr = ptArr.map((node, index) => {
    return <PTnode dataObj={node} nodeIndex={index} />;
  });

  return (
    <section className={`${classes.pt}`}>
      {nodeArr}
    </section>
  );
}

export { PizzaTracker };
