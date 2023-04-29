import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { InputReason30 } from "./InputReason30";
import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { useRemoveItem } from "../../_Resources/customHooks/useRemoveItem";

import { MdDeleteOutline } from "react-icons/md";

import { useOutletContext, useNavigate } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";
import { current } from "immer";

function ExchReason() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;
  const exchNav = useExchNav();

  const defaultState = {
    activeKey: null,
    autoCalcActive: true,
    show30warning: false,
  };

  //local state
  const [locSt_ExchReason, setLocSt_ExchReason] = useImmer(defaultState);

  // on every render, check if activeKey has a value.
  if (!locSt_ExchReason.activeKey) {
    setLocSt_ExchReason({ ...findNextEmptyDispo(exchProdsMap) });
  }

  const areAllAssigned = locSt_ExchReason.activeKey === "All Assigned";

  /* ---- Shared Functions ---- */

  function findNextEmptyDispo(productMap) {
    let outLocStObj = {
      show30warning: false,
      autoCalcActive: false,
      activeKey: "All Assigned", // Default unless an item has no dispo.  Prevents infinite loops.
    };

    for (const key of productMap.keys()) {
      const thisDispo = productMap.get(key).itemDispo;
      if (!thisDispo) {
        // if this item doesn't have a dispo...
        outLocStObj.activeKey = key; // return it as the active key
        break; // stop looping because we are only looking for the first.
      }
    }
    return outLocStObj;
  }

  /*
  
  
  */

  const handleTRclick = (key) => {
    setLocSt_ExchReason((draft) => {
      draft.activeKey = key;
      draft.pendingDispo = exchProdsMap.get(key).itemDispo;
      draft.show30warning = false;
      draft.autoCalcActive = false;
    });
  };

  // Delete a table row.
  const handleDelete = ({ event, prodKey }) => {
    // set Session state
    setExchState((draft) => {
      draft.exchProducts.delete(prodKey);
    });

    // set Session state
    setLocSt_ExchReason((draft) => {
      draft.show30warning = false;

      // Only reassign activeKey if the Active item was deleted.
      const deletingActive = locSt_ExchReason.activeKey === prodKey;
      // Set activeKey to null so that activeKey is rechecked next render.
      if (deletingActive) {
        draft.activeKey = null;
      }
    });
    event.stopPropagation();
  };

  const handleContinue = () => {
    exchNav({ routeStr: "whichforwhat" });
  };

  /* ---- Table Elements ---- */

  // generate <th>
  const thFactory = (title = "") => {
    return { title };
  };

  const thInputs = [
    thFactory("Product Details"),
    thFactory("Quantity"),
    thFactory("Return Reason"),
    thFactory("Remove"),
  ];

  const thArray = thInputs.map((th) => {
    return <th key={th.title}>{th.title}</th>;
  });

  // Generate <tr>s

  const trArray = [];

  exchProdsMap.forEach((value, key) => {
    trArray.push(
      <tr
        key={key}
        className={`${locSt_ExchReason.activeKey === key ? "active" : ""}`}
        onClick={() => handleTRclick(key)}
      >
        <td>
          <ProductInfo hasPrice={true} itemObj={value} />
        </td>
        <td>{value.qtyExchanging}</td>
        <td>{value.itemDispo}</td>
        <td>
          <button
            type="button"
            className={`mrvBtn ghost`}
            onClick={(event) => {
              handleDelete({ prodKey: key, event: event });
            }}
          >
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
          headerTitle="Reason For Exchange"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "chooseitems" })}
        />
        <ExchPizzaTracker />
        <section className={`main_content main_col`}>
          <table>
            <thead>
              <tr>{thArray}</tr>
            </thead>
            <tbody>{trArray}</tbody>
          </table>
        </section>

        <section className={`footer_text right_col`}>
          {locSt_ExchReason.formWarning ? (
            <p className={`tinyText warning`}>
              Enter at least one item to exchange
            </p>
          ) : null}
        </section>
        <section className={`footer_content right_col`}>
          {areAllAssigned ? (
            <button
              className={`mrvBtn primary fullWidth jumbo`}
              onClick={handleContinue}
            >
              Continue
            </button>
          ) : null}
        </section>
      </section>
      {areAllAssigned ? null : (
        <InputReason30
          activeItemNum={locSt_ExchReason.activeKey}
          pendingDispo={locSt_ExchReason.pendingDispo}
          locSt_ExchReason={locSt_ExchReason}
          findNextEmptyDispoFunc={findNextEmptyDispo}
          setLocSt_ExchReason={setLocSt_ExchReason}
        />
      )}
    </section>
  );
}

export { ExchReason };

/*
  
  200: { 
    quantity: 1, 
    price: 463, 
    tax: 41, 
    productDetails: {img: frontload_washer_img,
        price: 76600,
        itemNum: "910",
        modelNum: "SFL456",
        description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
        categories: ["Stock","Delivery"],
        specialCategories: {SOS:true},
        restockFee: 0.2,
        inStock: 2,
    },
 }
  
  */
