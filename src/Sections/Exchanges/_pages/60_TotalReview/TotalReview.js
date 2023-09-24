import classes from "./_TotalReviewCSS.module.css";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ExchTotalReview() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchNav = useExchNav();

  const defaultState = {
    show30warning: false,
  };

  //local state
  const [locSt_TotalRev, setLocSt_TotalRev] = useImmer(defaultState);

  // on every render, check if activeKey has a valeue.

  /* ---- Shared Functions ---- */

  /* ---- Table Elements ---- */

  // generate <th>
  const thFactory = (title = "", width = "") => {
    return { title, width };
  };

  const thInputs = [
    thFactory("Return Product"),
    thFactory("Qty", "3rem"),
    thFactory(" ", "4rem"),
    thFactory("Replacement Product"),
    thFactory("Qty ", "3rem"),
    thFactory("Balance", "5rem"),
  ];

  const thArray = thInputs.map((th) => {
    return (
      <th key={th.title} style={{ width: th.width }}>
        {th.title}
      </th>
    );
  });

  // Generate <tr>s
  const trArray = [];

  for(const thisItemObj of Object.entries(exchItems)){
    console.log(thisItemObj);
    const key = thisItemObj[0]
    const thisExchObj = thisItemObj[1]
    const rtrnItem = thisExchObj.returningItem;
    const replcItem = thisExchObj.replacementItem;

    trArray.push(
      <tr key={key} className={`${""}`}>
        <td>
          <ProductInfo hasPrice={true} itemObj={rtrnItem} />
        </td>
        <td>
          <p className={`body`}>{`${thisExchObj.qtyExchanging}`}</p>
        </td>
        <td className={`tdCenter`}>
          <MdArrowForward fontSize="2.5rem" />
        </td>
        <td>
          <ProductInfo hasPrice={true} itemObj={replcItem} />
        </td>
        <td>
          <p className={`body`}>{`${thisExchObj.qtyExchanging}`}</p>
        </td>
        <td>
        <p className={`body bold`}>{`$0.00`}</p>
        </td>
      </tr>
    );
  };

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Replacement Products"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "schedule" })}
        />
        <section className={`main_content main_col`}>
          <section className={`tableContainer`}>
            <table>
              <thead>
                <tr>{thArray}</tr>
              </thead>
              <tbody>{trArray}</tbody>
            </table>
          </section>
        </section>
        <ExchPizzaTracker />
        <section className={`footer_text right_col`}>
          <p className={`tinyText warning`}></p>
        </section>
        <section className={`footer_content right_col`}>
          {true ? (
            <button
              onClick={() => {exchNav({routeStr:"receipt"})}}
              className={`mrvBtn primary fullWidth jumbo`}
            >
              Continue
            </button>
          ) : null}
        </section>
      </section>
    </section>
  );
}

export { ExchTotalReview };

/*
  
  
*/
