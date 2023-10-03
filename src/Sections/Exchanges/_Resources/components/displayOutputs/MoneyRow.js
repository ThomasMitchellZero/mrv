import classes from "./MoneyRow.module.css";

function MoneyRow({
  title = "",
  money = "",
  textColorClass = "color__primary__text",
  moneyColorClass = textColorClass,
  bigMoney = false,
}) {

  const moneyOutput = bigMoney ? (
    <h4 className={` ${textColorClass}`}>{`$ ${money}`}</h4>
  ) : (
    <p className={`body__large ${textColorClass}`}>{`$ ${money}`}</p>
  );

  return (
    <section className={`${classes.container}`}>
      <p className={`body ${textColorClass} ${classes.titleText}`}>{title}</p>
      {moneyOutput}
    </section>
  );
}

export { MoneyRow };
