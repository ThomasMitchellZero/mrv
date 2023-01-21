import classes from "./InPageTitleBox.module.css";

const InPageTitle = ({
  hasDivider = true,
  mainTitle = "",
  subTitle = "",
  topContent,
  bottomContent,
}) => {
  return (
    <section
      className={`${hasDivider ? "divider-bottom" : ""} ${classes.container}`}
    >
      <section className={classes.distalHolder}>{topContent}</section>
      <section className={classes.mainContent}>
        <h2 className="inPageTitle">{mainTitle}</h2>
        <h4 className="inPageTitle">{subTitle}</h4>
      </section>
      <section className={classes.distalHolder}>{bottomContent}</section>
    </section>
  );
};

export default InPageTitle;


/*  EVENLY SPACED

      <section className={classes.mainContent}>
        {topContent ? topContent : null}
        <h2 className="inPageTitle">{mainTitle}</h2>
        <h4 className="inPageTitle">{subTitle}</h4>
        {bottomContent ? bottomContent : null}
      </section>

*/

/*  Top and Bottom Containers

      <section className={classes.distalHolder}>{topContent}</section>
      <section className={classes.mainContent}>
        <h2 className="inPageTitle">{mainTitle}</h2>
        <h4 className="inPageTitle">{subTitle}</h4>
      </section>
      <section className={classes.distalHolder}>{bottomContent}</section>
*/