import classes from "./ptStyle.module.css";
import { PTnode } from "./PTnode";

/*Component is designed to fill up a parent component.  That parent will be configured for the specific circumstances. */
function PizzaTracker({ ptObj = {}, localStyles = "" }) {
  const activeIndex = ptObj.activeNode;
  const ptArr = ptObj.ptNodes;

  const nodeArr = ptArr.map((node, index) => {
    // Makes an array of arrays containing a PT node and a spacer
    return [
      <section className={`${classes.spacer}`} key={index}>
        <div />
      </section>,
      <PTnode key={node.title} dataObj={node} nodeIndex={index} />,
    ];
  });

  //flattens that array
  const spacedNodeArr = nodeArr.flat();
  //removes the first element and then adds fixed-size spacers to the end.

  spacedNodeArr.push(
    <section key="last" className={`${classes.spacer} ${classes.end}`}>
      <div />
    </section>
  );
  
  spacedNodeArr[0] = (
    <section key="first" className={`${classes.spacer} ${classes.end}`}>
      <div />
    </section>
  );

  return <section className={`${classes.pt}`}>{spacedNodeArr}</section>;
}

export { PizzaTracker };
