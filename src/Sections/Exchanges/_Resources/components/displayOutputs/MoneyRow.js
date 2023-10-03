import classes from "./MoneyRow.module.css";

import { useDeCentsitize } from "../../customHooks/mrvHooks";

function MoneyRow({
  title = "",
  moneyVal = 0,
  textColorClass = "color__primary__text",
  moneyColorClass = textColorClass,
  bigMoney = false,
}) {

  const deCentsitize = useDeCentsitize()

  const moneyStr = deCentsitize(moneyVal)

  const moneyJSX = bigMoney ? (
    <h4 className={` ${textColorClass}`}>{`$ ${moneyStr}`}</h4>
  ) : (
    <p className={`body__large ${textColorClass}`}>{`$ ${moneyStr}`}</p>
  );

  return (
    <section className={`${classes.container}`}>
      <p className={`body body__small ${textColorClass} ${classes.titleText}`}>{title}</p>
      {moneyJSX}
    </section>
  );
}

export { MoneyRow };
