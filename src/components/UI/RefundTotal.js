import classes from "./RefundTotal.module.css";

const RefundTotal = ({ dataObj, hideAdjust }) => {

  const reference = {
    refundTotal: 0,
    taxSum: 0,
    subtotal: 0,
    adjustments: 0,
  };

  //reusable component for showing fee composition.
  const refundText = (label, value, red) => {
    const isRed = `${!red ? "" : "red-text"}`;

    return (
      <section className={classes.refundText}>
        <p className={isRed}>{label}</p>
        <h4 className={isRed}>{(value / 100).toFixed(2)}</h4>
      </section>
    );
  };

  return (
    <section className={classes.container}>
      <section className={classes.itemizedColumn}>
        {!hideAdjust ? refundText("Fees", dataObj.adjustments, true) : null}
        {refundText("Subtotal", dataObj.subtotal)}
        {refundText("Tax", dataObj.taxSum)}
      </section>
      <section className={classes.totalColumn}>
        <h5>Refund Total</h5>
        <h2>{(dataObj.refundTotal / 100).toFixed(2)}</h2>
      </section>
    </section>
  );
};

export default RefundTotal;
