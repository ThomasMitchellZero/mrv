import classes from "./MoneyRow.module.css";

function MoneyRow({
  title = "",
  money = "",
  textColorClass = "color__primary__text",
}) {
  return (
    <section className={`${classes.container}`}>
      <p className={`body ${textColorClass}`}>{title}</p>
      <p className={`body__large ${classes.priceTxt} ${textColorClass}`}>
        {money}
      </p>
    </section>
  );
}

export { MoneyRow };
