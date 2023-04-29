import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { useRemoveItem } from "../../_Resources/customHooks/useRemoveItem";

import { MdDeleteOutline, MdArrowForward } from "react-icons/md";

import { useOutletContext, useNavigate } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function WhichForWhat() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;
  const exchNav = useExchNav();

  const defaultState = {
    show30warning: false,
  };

  //local state
  const [locSt_WhichFor, setLocSt_WhichFor] = useImmer(defaultState);

  // on every render, check if activeKey has a value.

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

  exchProdsMap.forEach((value, key) => {
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
  });

  /* ---- Final Component ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Replacement Products"
          hasCluster={true}
          hasIcon={"back"}
        />
        <section className={`main_content main_col`}>
          <table>
            <thead>
              <tr>{thArray}</tr>
            </thead>
            <tbody>{trArray}</tbody>
          </table>
        </section>
        <ExchPizzaTracker />
      </section>
    </section>
  );
}

export { WhichForWhat };

/*
  
  
*/
