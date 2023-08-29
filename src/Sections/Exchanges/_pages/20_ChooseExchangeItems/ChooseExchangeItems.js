import classes from "./ChooseExchangeItems.module.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

const defaultState = {
  formValid: false,
  formWarning: false,
  needsMO: false,
};

function ExchChooseExchItems() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExch;
  const exchNav = useExchNav();

  console.log(exchItems);

  // LocalState
  const [locSt_PickItems, setLocSt_PickItems] = useImmer(defaultState);

  /* ---- Shared Functions ---- */

  const dataModel = {
    qtySold: "",
    qtyExchanging: "",
    returningItems: {
      pickupQty: "",
      productDetails: "",
      itemDispo: "",
    },
    replacementItems: {
      deliveryQty: "",
      productDetails: "",
    },
  };

  const integerizer = (input) => {
    // Placeholder.  If we decide later to force integers, do it here.
    return parseInt(input);
  };

  const handleExchQtyInput = (event, itemNum) => {
    let input = integerizer(event.target.value);
    setExchState((draft) => {
      draft.itemsInExchange[itemNum].qtyExchanging = input;
      // move pickupQty out when we add ability to edit this separately.
      draft.invoiceProducts[itemNum].returningItems.pickupQty = input;
    });
  };

  // clears error states when a new field is focused.
  const handleFieldFocus = () => {
    setLocSt_PickItems((draft) => {
      draft.formWarning = false;
    });
  };

  const handleContinue = () => {
    // user can't proceed without at least 1 exch item.
    for (const itemNum of Object.keys(exchItems)) {
      const thisItemRt = exchItems[itemNum];
      if (thisItemRt.qtyExchanging) {
        // if this item has any qty...

        // clear warnings, may be redundant?
        setLocSt_PickItems((draft) => {
          draft.formWarning = false;
        });
        // go to next page.
        exchNav({ routeStr: "exchreason" });
      }
      setLocSt_PickItems((draft) => {
        draft.formWarning = true;
      });
    }
  };

  // make headers with titles
  const thFactory = (title = "", width = "") => {
    return { title, width };
  };
  const thInputs = [
    thFactory("Product Details"),
    thFactory("Sold", "3.5rem"),
    thFactory("In Stock", "5rem"),
    thFactory("Exchange Qty", "8rem"),
    thFactory("Status", "8rem"),
    thFactory("Manager Approval Needed", "20%"),
  ];

  // Make the Table
  const thArray = thInputs.map((th) => {
    return (
      <th key={th.title} style={{ width: `${th.width}` }}>
        {th.title}
      </th>
    );
  });

  //const trArray = [];

  const trArray = Object.keys(exchItems).map((product) => {
    const thisProd = exchItems[product];

    return (
      <tr key={product} className={``}>
        <td>
          <ProductInfo
            hasPrice={true}
            itemObj={thisProd.returningItems}
            qty={thisProd.qtySold}
          />
        </td>
        <td>
          <p className={`body`}>{`${thisProd.qtySold}`}</p>
        </td>
        <td>
          <p className={`body`}>{99}</p>
        </td>
        <td>
          <MRVinput hasError={locSt_PickItems.formWarning} width={"5rem"}>
            <input
              type="number"
              min="0"
              step="1"
              value={thisProd.qtyExchanging}
              max={thisProd.qtySold}
              onFocus={handleFieldFocus}
              onChange={(event) => {
                handleExchQtyInput(event, product);
              }}
            />
          </MRVinput>
        </td>
        <td>Picked Up</td>
        <td></td>
      </tr>
    );
  });

  /*
  
  */

  return (
    <section className={`mrvPage ${classes.container}`}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Select items to exchange"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "index" })}
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
          {locSt_PickItems.formWarning ? (
            <p className={`tinyText warning`}>
              Enter at least one item to exchange
            </p>
          ) : null}
        </section>
        <section className={`footer_content right_col`}>
          <button
            className={`mrvBtn primary fullWidth jumbo`}
            onClick={handleContinue}
          >
            Continue
          </button>
        </section>
      </section>
    </section>
  );
}

export { ExchChooseExchItems };

/*


*/
