import classes from "./FullReviewLI.module.css";

import RejectionCode from "../../../components/UI/DisplayOutputs/RejectionCode";

const FullReviewLI = ({ itemDataObj, liPreSearch = true }) => {
  const totalPrice = itemDataObj.price * itemDataObj.quantity;

  return (
    <section className={`divider-bottom ${classes.container}`}>
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
          <h5>{`Item #${itemDataObj.itemNum}    Model #${itemDataObj.modelNum}`}</h5>
        </section>
        <p className={classes.description}>{itemDataObj.description}</p>
        <section className={classes.priceInfo}>
          <h4>{`$ ${(itemDataObj.price / 100).toFixed(2)} ea`}</h4>
          <div className="text-spacer" />
          <div className="number-bubble">{itemDataObj.quantity}</div>
          <div className="text-spacer" />
          <h4>{`$ ${(totalPrice / 100).toFixed(2)}`}</h4>
        </section>
      </section>
    </section>
  );
};

export default FullReviewLI;
