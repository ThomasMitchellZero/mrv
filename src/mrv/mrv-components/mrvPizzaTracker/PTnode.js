import classes from "./ptStyle.module.css";

function PTnode({ dataObj, nodeIndex = 99 }) {
  const status = "notStarted";

  const statusObj = {
    notStarted: { css: classes.notStarted },
    active: { css: classes.active },
    complete: { css: classes.complete },
  };

  return (
    <section className={`${classes.ptNode}`}>
      <button
        className={`body small bold ${classes.ptBtn} ${statusObj[status].css}`}
      >
        {nodeIndex}
      </button>
        <p className={`body small bold`}>{dataObj.title}</p>
    </section>
  );
}

export { PTnode };
