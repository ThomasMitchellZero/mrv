import classes from "./RefundTotal.module.css";

const RefundTotal = ({ declined, subtotal, tax }) => {
  const refundText = (label, value) => {
    <section className={classes.refundText}>
      <p>{label}</p>
    </section>;
  };
  return <section className={classes.container}></section>;
};

export default RefundTotal;
