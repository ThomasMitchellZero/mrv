import classes from "./RefundTotal.module.css";

const RefundTotal = ({ dataObj }) => {
  const refundText = (label, value) => {
    return (
      <section className={classes.refundText}>
        <p>{label}</p>
        <h4>{value}</h4>
      </section>
    );
  };
  return (
    <section className={classes.container}>
      <section className={classes.itemizedColumn}>
        {refundText("Declined", 0.00)}
        {refundText("Subtotal", 123.00)}
      </section>
      <section className={classes.totalColumn}></section>
    </section>
  );
};

export default RefundTotal;
