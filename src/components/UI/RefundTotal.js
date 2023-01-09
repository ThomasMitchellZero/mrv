import classes from "./RefundTotal.module.css";
import ReturnTotaler from "../../global_functions/returnTotaler";

const RefundTotal = ({ dataObj, hideAdjust }) => {

  const allCostsObj = ReturnTotaler(dataObj)
  
  //reusable component for showing fee composition.
  const refundText = (label, value, red) => {
    const isRed = `${!red ? "" : "red-text"}`

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
        {!hideAdjust? refundText("Fees", allCostsObj.adjustments, true) : null}
        {refundText("Subtotal", allCostsObj.subtotal)}
        {refundText("Tax", allCostsObj.taxSum)}
      </section>
      <section className={classes.totalColumn}>
        <h5>Refund Total</h5>
        <h2>{(allCostsObj.refundTotal/100).toFixed(2)}</h2>
      </section>
    </section>
  );
};

export default RefundTotal;
