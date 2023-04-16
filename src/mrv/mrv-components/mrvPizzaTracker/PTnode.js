import classes from "./ptStyle.module.css";

function PTnode({dataObj, nodeIndex = 99}) {
  return (
    <section>
      <button className={``}>{nodeIndex}</button>
      <p className={``}>{dataObj.title}</p>
    </section>
  );
}

export { PTnode };
