import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";

function ExchWhichForWhat() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchNav = useExchNav();

  const defaultState = {
    show30warning: false,
  };

  //local state
  const [locSt_WhichFor, setLocSt_WhichFor] = useImmer(defaultState);

  /* ---- Shared Functions ---- */

  const handleReplacementContinue = () => {
    //calculate, populate shipments


    let outShipmentsObj = {};

    // nav to Schedule
    exchNav({ routeStr: "schedule" });
  };

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
    thFactory("Remove", "5rem"),
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

  for (const key of Object.keys(exchItems)) {

    const thisItemRt = exchItems[key].returningItems; 
    const returnItem = replacementItem
    trArray.push(
      <tr key={key} className={`${""}`}>
        <td>
          <ProductInfo hasPrice={true} itemObj={value} />
        </td>
        <td>
          <p className={`body`}>{`${value.qtyExchanging}`}</p>
        </td>
        <td className={`tdCenter`}>
          <MdArrowForward fontSize="2.5rem" />
        </td>
        <td>
          <ProductInfo hasPrice={true} itemObj={value} />
        </td>
        <td>
          <p className={`body`}>{`${value.qtyExchanging}`}</p>
        </td>
        <td>
          <button type="button" className={`mrvBtn ghost`}>
            <MdDeleteOutline fontSize="1.5rem" />
          </button>
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
          navBtnClick={() => exchNav({ routeStr: "exchreason" })}
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
              onClick={handleReplacementContinue}
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

export { ExchWhichForWhat };

/*
  
  
*/
