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

  return (
    <section className={`footer_content cashTotal`}>
      <div className={`cashLine sdTitles`}>
        <div className={`body`}>Difference Subtotal</div>
        <div className={`body`}>Tax</div>
      </div>
      <div className={`cashLine`}>
        <div className={`body bold`}>-$98982.34</div>
        <div className={`body bold`}>-$1123.34</div>
      </div>
      <div className={`totalCol `}>
        <div className={`heading__large`}>$123.45</div>
      </div>
    </section>
  );
};

export { CashTotalMRV };
