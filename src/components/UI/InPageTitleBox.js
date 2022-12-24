import classes from "./InPageTitleBox.module.css";

const InPageTitle = ({ hasDivider = true, mainTitle ="", subTitle="",topContent, bottomContent}) => {

  return (
    <section className={classes.container}>
      <section className={classes.distalHolder}>{topContent}</section>
      <section className={classes.mainContent}>
        <h2 className="inPageTitle">{mainTitle}</h2>
        <h4 className="inPageTitle">{subTitle}</h4>
      </section>
      <section className={classes.distalHolder}>{bottomContent}</section>
      {hasDivider ? <div className="divider" /> : null}
    </section>
  );
};

export default InPageTitle;
