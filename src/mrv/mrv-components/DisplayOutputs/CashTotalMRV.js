import "./CashTotalMRV.css";

import { useCentsToDollars } from "../../MRVhooks/MRVhooks";
import {
  baseReturnState,
  moneyObj,
} from "../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";

const CashTotalMRV = ({
  mode = "exchDelta",
  sessionState = baseReturnState({}),
}) => {
  const appCtx = useOutletContext();
  const centsToDollars = useCentsToDollars();
  const stateDeltaMO = sessionState.cashDeltaMO;

  // if it can be derived from info in the moneyObj, then make some fields to do it.

  const refMoneyObj = new moneyObj({});

  const configsObj = {
    exchDelta: {
      aCashLines: [
        { label: "Subtotal Difference", value: stateDeltaMO.unitBaseValue },
        { label: "Tax Difference", value: stateDeltaMO.salesTax },
      ],
      finalTotal: stateDeltaMO.unitTotal,
    },
  };

  const thisConfig = configsObj[mode];

  const isNegative = (value) => {
    return value < 0 ? "color__green__text" : "";
  };

  const uiCashLineLabels = thisConfig.aCashLines.map((line) => {
    return (
      <div key={line.label} className={`body`}>
        {line.label}
      </div>
    );
  });

  const uiCashLineValues = thisConfig.aCashLines.map((line) => {
    return (
      <div key={line.label} className={`body ${isNegative(line.value)} bold `}>
        {`$${centsToDollars(line.value)}`}
      </div>
    );
  });

  const negTotal = isNegative(thisConfig.finalTotal);

  const uiFinalTotal = (
    <div className={`totalCol `}>
      <div className={`body__small ${negTotal}`}>
        {negTotal ? "Total Refund:" : "Total Due:"}
      </div>
      <div className={`heading__large ${negTotal}`}>
        {`$${centsToDollars(thisConfig.finalTotal)}`}
      </div>
    </div>
  );

  return (
    <section className={`footer_content cashTotal`}>
      <div className={`cashLine sdTitles`}>{uiCashLineLabels}</div>
      <div className={`cashLine`}>{uiCashLineValues}</div>
      {uiFinalTotal}
    </section>
  );
};

export { CashTotalMRV };
