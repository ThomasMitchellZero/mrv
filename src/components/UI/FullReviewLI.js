import classes from "./FullReviewLI.module.css";

import RejectionCode from "./RejectionCode";

const FullReviewLI = ({ itemDataObj, liPreSearch = true }) => {
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
        <RejectionCode isPreSearch={liPreSearch} itemObj={itemDataObj} />
        <section className={classes.modelInfo}>
          <h5>{`Item #${itemDataObj.itemNum}`}</h5>
          <div className="text-spacer" />
          <h5>{`Model #${itemDataObj.modelNum}`}</h5>
        </section>
        <p className={classes.description}>{itemDataObj.description}</p>
        <section className={classes.priceInfo}>
          <h4>{`$ ${itemDataObj.price.toFixed(2)} ea`}</h4>
          <div className="text-spacer" />
          <div className="number-bubble">{itemDataObj.quantity}</div>
          <div className="text-spacer" />
          <h4>{`$ ${(itemDataObj.price * itemDataObj.quantity).toFixed(
            2
          )}`}</h4>
        </section>
      </section>
    </section>
  );
};

export default FullReviewLI;
