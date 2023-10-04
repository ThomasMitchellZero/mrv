import classes from "./MoneyRow.module.css";

import { useCentsToDollars } from "../../customHooks/exchHooks";

function MoneyRow({
  title = "",
  moneyVal = 0,
  textColorClass = "color__primary__text",
  moneyColorClass = textColorClass,
  bigMoney = false,
}) {
  const centsToDollars = useCentsToDollars();

  const moneyStr = moneyVal.toFixed(2);

  const moneyJSX = bigMoney ? (
    <h4 className={` ${textColorClass}`}>{`$ ${moneyStr}`}</h4>
  ) : (
    <p className={`body__large ${textColorClass}`}>{`$ ${moneyStr}`}</p>
  );

  return (
    <section className={`${classes.container}`}>
      <p className={`body body__small ${textColorClass} ${classes.titleText}`}>
        {title}
      </p>
      {moneyJSX}
    </section>
  );
}

export { MoneyRow };
