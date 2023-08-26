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
  const orderProducts = exchCtx.exchSession.invoiceProducts;
  const exchNav = useExchNav();

  // LocalState
  const [locSt_PickItems, setLocSt_PickItems] = useImmer(defaultState);

  /* ---- Shared Functions ---- */

  /*
quantity:1
price:38723
tax:3810
productDetails:{categories: Array(2), dcLocations: Array(1), descr…}
qtyExchanging:1
itemDispo:null
apptTime:null
  */

  const dataModel = {
    keyItemNum: {
      qtySold: 2,
      qtyExchanging: 2,
      returningItems: {
        pickupQty: 1,
        productDetails: {},
        price: 11111,
        tax: 111,
        itemDispo: null,
      },
      replacementItems: {
        deliveryQty: 2,
        productDetails: {},
      },
    },
  };

  const integerizer = (input) => {
    // Placeholder.  If we decide later to force integers, do it here.
    return parseInt(input);
  };

  const handleExchQtyInput = (event, itemNum) => {
    let input = integerizer(event.target.value);
    setExchState((draft) => {
      draft.invoiceProducts[itemNum].qtyExchanging = input;
      // move pickupQty out when we add ability to edit this separately.
      draft.invoiceProducts[itemNum].pickupQty = input;
    });
  };

  // clears error states when a new field is focused.
  const handleFieldFocus = () => {
    setLocSt_PickItems((draft) => {
      draft.formWarning = false;
    });
  };

  // makes Map of products being exchanges, navs to next page.
  const handleContinue = () => {
    const outProdMap = new Map();

    for (const itemNum of Object.keys(orderProducts)) {
      if (orderProducts[itemNum].qtyExchanging) {
        // Only add items with non-zero qty.

        //Start here tomorrow
        outProdMap.set(itemNum, cloneDeep(orderProducts[itemNum]));
        //this is how you set an object nested within a Map.
        outProdMap.get(itemNum).itemDispo = null;
        outProdMap.get(itemNum).apptTime = null;
      }
    }

    if (outProdMap.size) {
      // if there are any non-zero quantities..

      // clear warnings, may be redundant?
      setLocSt_PickItems((draft) => {
        draft.formWarning = false;
      });

      // update the global state
      setExchState((draft) => {
        draft.exchProducts = outProdMap;
      });

      exchNav({ routeStr: "exchreason" });
    } else {
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

  const trArray = [];

  /*
  const trArray = Object.keys(orderProducts).map((product) => {
    const thisProd = orderProducts[product];
    const pDetails = thisProd.productDetails;

    return (
      <tr key={product} className={``}>
        <td>
          <ProductInfo hasPrice={true} itemObj={thisProd} />
        </td>
        <td>
          <p className={`body`}>{`${thisProd.quantity}`}</p>
        </td>
        <td>
          <p className={`body`}>{`${pDetails.inStock}`}</p>
        </td>
        <td>
          <MRVinput hasError={locSt_PickItems.formWarning} width={"5rem"}>
            <input
              type="number"
              min="0"
              step="1"
              value={thisProd.qtyExchanging}
              max={thisProd.quantity}
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
