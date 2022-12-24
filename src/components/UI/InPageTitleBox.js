import classes from "./InPageTitleBox.module.css";

const InPageTitle = ({ hasDivider = true }) => {
  return (
    <section className={classes.container}>
      <section className={classes.distalHolder}></section>
      <section className={classes.mainContent}>
        <h2>some</h2>
        <h2>some</h2>
        <h2>some</h2>
        <h2>some</h2>
      </section>
      <section className={classes.distalHolder}></section>
      {hasDivider? <div className="divider" /> : null}
    </section>
  );
};

export default InPageTitle;
