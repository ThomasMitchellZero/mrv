import classes from "./ptStyle.module.css";
import { MdDone, } from "react-icons/md";

function PTnode({ dataObj, nodeIndex = 99 }) {
  const status = "complete";

  const statusObj = {
    notStarted: { css: classes.notStarted, text: nodeIndex },
    active: { css: classes.active, text: nodeIndex },
    complete: { css: classes.complete, text: <MdDone fontSize="1.5rem"/> },
  };

  return (
    <section className={`${classes.ptNode}`}>
      <button
        className={`body small bold ${classes.ptBtn} ${statusObj[status].css}`}
      >
        {statusObj[status].text}
      </button>
        <p className={`body small bold`}>{dataObj.title}</p>
    </section>
  );
}

export { PTnode };
