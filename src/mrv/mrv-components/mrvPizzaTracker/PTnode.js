import classes from "./ptStyle.module.css";

function PTnode({dataObj, nodeIndex = 99}) {
  return (
    <section>
      <button className={``}>{dataObj.title}</button>
      <p className={`${nodeIndex}`}></p>
    </section>
  );
}

export { PTnode };
