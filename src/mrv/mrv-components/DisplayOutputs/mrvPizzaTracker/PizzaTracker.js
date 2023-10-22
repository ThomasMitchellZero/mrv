import "./_ptStyle.css";

import { PTnode } from "./PTnode";

/*Component is designed to fill up a parent component.  That parent will be configured for the specific circumstances. */
function PizzaTracker({ ptObj = {}, localStyles = "" }) {
  const ptArr = ptObj.ptNodes;
  const activeNode = ptObj.activeNode;
  const activeIndex = ptArr.map((arr) => arr.key).indexOf(activeNode);

  //Computed here and not stored in state because node status is only used for display.  The actual, active value is ptState.activeNode
  const makeNodeStatus = (thisIndex) => {
    const outStatus =
      thisIndex > activeIndex
        ? "notStarted"
        : thisIndex < activeIndex
        ? "complete"
        : "active";
    return outStatus;
  };

  // Makes an array of arrays containing a PT node and a spacer
  const nodeArr = ptArr.map((node, index) => {
    const thisNodeStatus = makeNodeStatus(index);
    return [
      <section key={index} className={`spacer`}>
        <div />
      </section>,
      <PTnode
        key={node.title}
        dataObj={node}
        nodeIndex={index}
        nodeStatus={thisNodeStatus}
      />,
    ];
  });

  //flattens that array
  const spacedNodeArr = nodeArr.flat();

  //adds fixed-size spacers to the end.
  spacedNodeArr.push(
    <section key="last" className={`spacer end`}>
      <div />
    </section>
  );

  //replaces first element with fixed-size spacer.
  spacedNodeArr[0] = (
    <section key="first" className={`spacer end`}>
      <div />
    </section>
  );

  return <section className={`pt_Top`}>{spacedNodeArr}</section>;
}

export { PizzaTracker };
