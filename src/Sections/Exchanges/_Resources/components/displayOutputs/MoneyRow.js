import classes from "./MoneyRow.module.css";

function MoneyRow({
  title = "",
  money = "",
  textColorClass = "color__primary__text",
  bigMoney = false,
}) {
  return (
    <section className={`${classes.container}`}>
      <p className={`body ${textColorClass} ${classes.titleText}`}>{title}</p>
      <p className={`body__large ${textColorClass}`}>
        {`$ ${money}`}
      </p>
    </section>
  );
}

export { MoneyRow };
