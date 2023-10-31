import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import {
  useSwapFilter,
  useSwapGroupsArr,
  useMakeSwapMoneyObj,
  useSetSGreplacements,
} from "../../_Resources/customHooks/exchHooks";

import { useOutletContext } from "react-router";
import { useImmer } from "use-immer";

const defaultState = {
  formValid: false,
  formWarning: false,
  needsMO: false,
};

function ExchChooseExchItems() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchSwapGroups = exchCtx.exchSession.allSwapGroups;
  const exchNav = useExchNav();
  const swapFilter = useSwapFilter();
  const swapGroupArr = useSwapGroupsArr();
  const makeSwapMoneyObj = useMakeSwapMoneyObj();
  const setSGreplacements = useSetSGreplacements();

  // LocalState
  const [locSt_PickItems, setLocSt_PickItems] = useImmer(defaultState);

  /* ---- Shared Functions ---- */

  const integerizer = (input) => {
    // Placeholder.  If we decide later to force integers, do it here.
    return parseInt(input);
  };

  const handleExchQtyInput = ({ event, inputSwapGroup, inputSwapKey }) => {
    const maxVal =
      exchSwapGroups[inputSwapGroup].swaps[inputSwapKey].returningItem.qtySold;
    let input = Math.min(integerizer(event.target.value), maxVal);

    setExchState((draft) => {
      const thisReturnItem =
        draft.allSwapGroups[inputSwapGroup].swaps[inputSwapKey];

      thisReturnItem.returningItem.returnQty = input;
      // move pickupQty out when we add ability to edit this separately.
      thisReturnItem.returningItem.pickupQty = input;
    });
  };

  // clears error states when a new field is focused.
  const handleFieldFocus = () => {
    setLocSt_PickItems((draft) => {
      draft.formWarning = false;
    });
  };

  const handleContinue = () => {
    //Still Needs Validation
    let isValid = false;

    /*
      const ref = {
        swapGroupKey,
        swapGroupValue,
        thisSwapkey,
        thisSwapValue,
      };
    */

    //Pre-continue, check for form validity and create moneyObj for each swap.
    for (const i of swapGroupArr) {
      // Valid if ANY item is being returned.
      if (i.thisSwapValue.returningItem.returnQty) {
        isValid = true;
      }
      console.log(i.thisSwapValue);

      const outMoneyObj = makeSwapMoneyObj({ targetSwap: i.thisSwapValue });
      setExchState((draft) => {
        draft.allSwapGroups[i.swapGroupKey].swaps[i.thisSwapkey].moneyObj =
          outMoneyObj;
      });
    }

    if (isValid) {
      for (const [key, value] of Object.entries(exchSwapGroups)) {
        setExchState((draft) => {
          draft.allSwapGroups[key].swaps = setSGreplacements({
            targetSwapGroup: value,
          });
        });
      }

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

  const makeTR = ({ swapGroupKey, thisSwapKey, swapObj }) => {
    const rtrnItem = swapObj.returningItem;
    return (
      <tr key={`${swapGroupKey}${thisSwapKey}`} className={`nohover_bg`}>
        <td>
          <ProductInfo itemObj={rtrnItem} />
        </td>
        <td>
          <p className={`body`}>{`${rtrnItem.qtySold}`}</p>
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
              value={rtrnItem.returnQty}
              max={rtrnItem.qtySold}
              onFocus={handleFieldFocus}
              onChange={(event) => {
                handleExchQtyInput({
                  event: event,
                  inputSwapGroup: swapGroupKey,
                  inputSwapKey: thisSwapKey,
                });
              }}
            />
          </MRVinput>
        </td>
        <td>Picked Up</td>
        <td></td>
      </tr>
    );
  };

  for (const i of swapGroupArr) {
    if (
      swapFilter({
        targetSwap: i.thisSwapValue,
        mainItem: true,
        accessory: true,
        includeEmpty: true,
      })
    ) {
      trArray.push(
        makeTR({
          swapGroupKey: i.swapGroupKey,
          thisSwapKey: i.thisSwapkey,
          swapObj: i.thisSwapValue,
        })
      );
    }
  }

  /*

  */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Select items to exchange"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "index" })}
        />
        <ExchPizzaTracker />
        <section className={`main_content`}>
          <section className={`tableContainer`}>
            <table>
              <thead>
                <tr>{thArray}</tr>
              </thead>
              <tbody>{trArray}</tbody>
            </table>
          </section>
        </section>
        <section className={`footer_text`}>
          {locSt_PickItems.formWarning ? (
            <p className={`buttonBox tinyText warning`}>
              Enter at least one item to exchange
            </p>
          ) : null}
        </section>
        <section className={`footer_content`}>
          <div className={`buttonBox`}>
            <button
              className={`mrvBtn primary fullWidth jumbo`}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </section>
      </section>
    </section>
  );
}

export { ExchChooseExchItems };

/*


*/
