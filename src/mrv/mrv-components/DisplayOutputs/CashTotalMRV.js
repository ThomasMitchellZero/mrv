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

  const isNegative = (value) => { return value < 0; };


  const uiCashLineLabels = configsObj[mode].aCashLines.map((line) => {
    return <div key={line.label} className={`body`}>{line.label}</div>;
  });

  const uiCashLineValues = configsObj[mode].aCashLines.map((line) => { 
    return <div key={line.label} className={`body bold`}>{centsToDollars(line.value)}</div>;
  });

  return (
    <section className={`footer_content cashTotal`}>
      <div className={`cashLine sdTitles`}>
        {uiCashLineLabels}
      </div>
      <div className={`cashLine`}>
        {uiCashLineValues}
      </div>
      <div className={`totalCol `}>
        <div className={`heading__large`}>$123.45</div>
      </div>
    </section>
  );
};

export { CashTotalMRV };
