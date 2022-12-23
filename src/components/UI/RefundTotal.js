import classes from "./RefundTotal.module.css";
import ReturnTotaler from "../../global_functions/returnTotaler";

const RefundTotal = ({ dataObj }) => {

  const returnDataObj = RefundTotal(dataObj)
  
  const refundText = (label, value) => {
    return (
      <section className={classes.refundText}>
        <p>{label}</p>
        <h4>{value.toFixed(2)}</h4>
      </section>
    );
  };
  
  return (
    <section className={classes.container}>
      <section className={classes.itemizedColumn}>
        {refundText("Declined", 0.00)}
        {refundText("Subtotal", 123.00)}
        {refundText("Tax", 3.00)}
      </section>
      <section className={classes.totalColumn}>
        <h5>Refund Total</h5>
        <h2>{2200.13.toFixed(2)}</h2>
      </section>
    </section>
  );
};

export default RefundTotal;
