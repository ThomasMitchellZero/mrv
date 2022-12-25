import classes from "./FullReviewLI.module.css";

const FullReviewLI = ({ itemDataObj }) => {
  return (
    <section className={classes.container}>
      <section className={classes.imageHolder}></section>
      <section className={classes.mainContent}>
        .priceInfo
        <section className={classes.modelInfo}></section>
        <section className={classes.priceInfo}></section>
      </section>
    </section>
  );
};

export default FullReviewLI;
