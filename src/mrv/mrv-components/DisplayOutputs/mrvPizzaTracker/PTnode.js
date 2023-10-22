import "./_ptStyle.css"
import { MdDone, } from "react-icons/md";

function PTnode({ dataObj, nodeIndex = 99, nodeStatus }) {

  const statusObj = {
    notStarted: { css: 'notStarted', text: nodeIndex },
    active: { css: 'active', text: nodeIndex },
    complete: { css: 'complete', text: <MdDone fontSize="1.5rem"/> },
  };

  return (
    <section className={`ptNode`}>
      <button
        className={`body__small bold ptBtn ${statusObj[nodeStatus].css}`}
      >
        {statusObj[nodeStatus].text}
      </button>
        <p className={`body__small bold`}>{dataObj.title}</p>
    </section>
  );
}

export { PTnode };
