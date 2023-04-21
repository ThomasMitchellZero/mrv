import classes from "./ptStyle.module.css";
import { MdDone, } from "react-icons/md";

function PTnode({ dataObj, nodeIndex = 99, nodeStatus }) {

  const statusObj = {
    notStarted: { css: classes.notStarted, text: nodeIndex },
    active: { css: classes.active, text: nodeIndex },
    complete: { css: classes.complete, text: <MdDone fontSize="1.5rem"/> },
  };

  return (
    <section className={`${classes.ptNode}`}>
      <button
        className={`body__small bold ${classes.ptBtn} ${statusObj[nodeStatus].css}`}
      >
        {statusObj[nodeStatus].text}
      </button>
        <p className={`ody__small bold`}>{dataObj.title}</p>
    </section>
  );
}

export { PTnode };
