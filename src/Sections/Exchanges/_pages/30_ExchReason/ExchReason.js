import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { InputReason30 } from "./InputReason30";
import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { MdDeleteOutline } from "react-icons/md";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";

function ExchReason() {
  const exchNav = useExchNav();
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExch;
  const defaultVals = exchCtx.exchSession.defaultValues;


  const defaultState = {
    activeKey: null,
    autoCalcActive: true,
    show30warning: false,
    pendingDispo: defaultVals.dvReturnReason,
  };

  //local state
  const [locSt_ExchReason, setLocSt_ExchReason] = useImmer(defaultState);

  // on every render, check if activeKey has a value.
  if (!locSt_ExchReason.activeKey) {
    let outActiveKey = "All Assigned"; // Only reassigned if item without a dispo is found in the loop.  Prevents infinite loops.

    for (const key of Object.keys(exchItems)) {
      const thisDispo = exchItems[key].returningItems.itemDispo;

      if (!thisDispo) {
        // if this item doesn't have a dispo...
        outActiveKey = key; // return it as the active key
        break; // stop looping because we are only looking for the first.
      }
    }

    setLocSt_ExchReason((draft) => {
      draft.show30warning = false;
      draft.activeKey = outActiveKey;
    });
  }

  const areAllAssigned = locSt_ExchReason.activeKey === "All Assigned";

  /* ---- Shared Functions ---- */

  const handleTRclick = (key) => {
    setLocSt_ExchReason((draft) => {
      draft.activeKey = key;
      draft.pendingDispo = exchItems[key].returningItems.itemDispo;
      draft.show30warning = false;
    });
  };

  // Delete a table row.
  const handleDelete = ({ event, prodKey }) => {
    // set Session state
    setExchState((draft) => {
      delete draft.itemsInExch[prodKey];
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
  const thFactory = (title = "", width) => {
    return { title, width };
  };

  const thInputs = [
    thFactory("Product Details"),
    thFactory("PickupQty", "8rem"),
    thFactory("Return Reason", "20%"),
    thFactory("Remove", "5rem"),
  ];

  const thArray = thInputs.map((th) => {
    return (
      <th key={th.title} style={{ width: `${th.width}` }}>
        {th.title}
      </th>
    );
  });

  // Generate <tr>s

  const trArray = [];

  for (const key of Object.keys(exchItems)) {
    const thisItemRt = exchItems[key].returningItems;

    // Check for Exch. Qty before adding
    trArray.push(
      <tr
        key={key}
        className={`${locSt_ExchReason.activeKey === key ? "active" : ""}`}
        onClick={() => handleTRclick(key)}
      >
        <td>
          <ProductInfo
            hasPrice={true}
            itemObj={thisItemRt}
            qty={exchItems[key].qtyExchanging}
          />
        </td>
        <td>
          <p className={`body__small`}>{thisItemRt.pickupQty}</p>
        </td>
        <td>
          <p className={`body__small`}>{thisItemRt.itemDispo}</p>
        </td>
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
  }

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
          <section className={`tableContainer`}>
            <table>
              <thead>
                <tr>{thArray}</tr>
              </thead>
              <tbody>{trArray}</tbody>
            </table>
          </section>
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
          locSt_ExchReason={locSt_ExchReason}
          setLocSt_ExchReason={setLocSt_ExchReason}
        />
      )}
    </section>
  );
}

export { ExchReason };

/*

  
  */
