import classes from "./MiniItemLI.module.css";

const MiniUnmatchedLI = ({ itemObj, hasMessage, totalPrice = false }) => {
  // if there is a message, generate its JSX
  const message = hasMessage ?? null;

  // if there is a total price, calculate it
  const displayPrice = totalPrice ? (
    <h4>{`$ ${((itemObj.price * itemObj.quantity) / 100).toFixed(2)}`}</h4>
  ) : null;
  return (
    <section className={`divider-bottom ${classes.container}`}>
      <section className={classes.mainColumn}>
        {message}
        <h5>{`Item # ${itemObj.itemNum}     Model # ${itemObj.modelNum}`}</h5>
        <p>{itemObj.description}</p>
        <h4>{`$ ${(itemObj.price / 100).toFixed(2)}`}</h4>
      </section>
      <section className={classes.secondColumn}>
        <div className="number-bubble">{itemObj.quantity}</div>
        {displayPrice}
      </section>
    </section>
  );
};

export default MiniUnmatchedLI;
