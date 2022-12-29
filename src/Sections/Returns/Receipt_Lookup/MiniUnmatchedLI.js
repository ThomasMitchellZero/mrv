import classes from "./MiniUnmatchedLI.module.css";

const MiniUnmatchedLI = ({ unmatchedObj }) => {

  return (
    <section className={`divider-bottom ${classes.container}`}>
      <section className={classes.mainColumn}>{unmatchedObj.itemNum}</section>
      <section className={classes.secondaryColumn}></section>
      <section className={classes.secondaryColumn}></section>
    </section>
  );
};

export default MiniUnmatchedLI;
