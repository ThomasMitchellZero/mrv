import "./CashTotalMRV.css";

import { useCentsToDollars } from "../../MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

const CashTotalMRV = ({
  mode = "exchDelta",
  sessionState = {},
  setSessionState,
}) => {
  const appCtx = useOutletContext();
  const centsToDollars = useCentsToDollars();

  // if it can be derived from info in the moneyObj, then make some fields to do it.

  const configsObj = {
    exchDelta: {
      title: "Cash Total",
    },
    exchReturn: {
      title: "Cash Total",
    },
  };

  // Tomorrow, populate with dummy numbers and get the CSS right, then start hooking shit up.
  return (
    <section className={`cashTotal`}>
      <div className={`subdiv__titles`}>
        <div>Difference Subtotal</div>
      </div>
      <div className={`subdiv__values`}></div>
      <div className={`totalCol `}>
        <div className={`heading__large`}>$123.45</div>
      </div>
    </section>
  );
};

export { CashTotalMRV };
