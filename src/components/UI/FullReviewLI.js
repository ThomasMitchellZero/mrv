import classes from "./FullReviewLI.module.css";

const FullReviewLI = ({ itemDataObj }) => {
  console.log(itemDataObj);
  return (
    <section className={classes.container}>
      <section className={classes.imageHolder}>
        <img
          src={itemDataObj.img}
          alt="test"
          className={classes.productImage}
        ></img>
      </section>
      <section className={classes.mainContent}>
        <section className={classes.modelInfo}></section>
        <section className={classes.priceInfo}>{itemDataObj.price}</section>
      </section>
    </section>
  );
};

export default FullReviewLI;
