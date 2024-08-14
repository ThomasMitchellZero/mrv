import "./CashTotalMRV.css";

import {
  useCentsToDollars,
  greenify,
  useNodeNav,
  moneyObjDelta,
} from "../../MRVhooks/MRVhooks";

import {
  baseReturnState,
  moneyObj,
} from "../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";

const CashTotalMRV = ({
  mode = "exchDelta",
  modeVALS_exchDelta_returnMinusReplace,
}) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();

  const centsToDollars = useCentsToDollars();
  const stateDeltaMO = sessionMRV.cashDeltaMO;
  const totalCartDeltaMO = moneyObjDelta({
    refundMo: sessionMRV.totalReturnValue,
    replaceMo: sessionMRV.totalReplacementValue,
  })

  // if it can be derived from info in the moneyObj, then make some fields to do it.

  const refMoneyObj = new moneyObj({});

  // this all feels kind of ugly. Probably a neater way to do this.
  const configsObj = {
    exchDelta: {
      aCashLines: [
        { label: "Subtotal Difference", value: stateDeltaMO.unitBaseValue },
        { label: "Tax Difference", value: stateDeltaMO.salesTax },
      ],
      finalTotal: stateDeltaMO.unitTotal,
    },
    returnMinusReplace: {
      // THIS IS NOT SET UP YET
      aCashLines: [
        { label: "Return Value", value: sessionMRV.totalReturnValue.unitTotal },
        {
          label: "Replacement Cost",
          value: sessionMRV.totalReplacementValue.unitTotal,
        },
      ],
      finalTotal: totalCartDeltaMO.unitTotal,
    },
  };

  const thisConfig = configsObj[mode];

  const uiCashLineLabels = thisConfig.aCashLines.map((line) => {
    return (
      <div key={line.label} className={`body`}>
        {`${line.label}:`}
      </div>
    );
  });

  const uiCashLineValues = thisConfig.aCashLines.map((line) => {
    return (
      <div key={line.label} className={`body ${greenify(line.value)} bold `}>
        {`$${centsToDollars(line.value)}`}
      </div>
    );
  });

  const totalGreenified = greenify(thisConfig.finalTotal);

  return (
    <section className={`cashTotal`}>
      <div className={`breakdownLabelsCol`}>{uiCashLineLabels}</div>
      <div className={`breakdownValsCol`}>{uiCashLineValues}</div>
      <div className={`totalCol `}>
        <div className={`body__small ${totalGreenified}`}>
          {totalGreenified ? "Total Refund:" : "Total Due:"}
        </div>
        <div className={`heading__large ${totalGreenified}`}>
          {`$${centsToDollars(Math.abs(thisConfig.finalTotal))}`}
        </div>
      </div>
    </section>
  );
};

export { CashTotalMRV };
