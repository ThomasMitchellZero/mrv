import "./ItemDetails30STRX.css";

import { TitleBarSTRX } from "./CompConfigsSTRX";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useSetSessionItemsSTRX } from "../hooks/STRXhooks";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router";

const ItemDetails30STRX = ({ stateItemArr, parLocState, setParLocState }) => {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;

  const activeAtom = parLocState.activeItemAtom;
  const activeItemNum = activeAtom?.atomItemNum;

  const thisStateAtom = sessionState[stateItemArr].find(
    (item) => item.atomItemNum === activeItemNum
  );

  const inputMode = thisStateAtom ? "edit" : "add";

  const oConfigs = {
    edit: { actionType: "edit", inputVal: thisStateAtom?.atomItemQty },
    add: { actionType: "add", inputVal: "" },
  };

  const activeConfig = oConfigs[inputMode];

  const setSessionItemsSTRX = useSetSessionItemsSTRX();

  const handleClose = () => {
    setParLocState(() => {
      return { ...cloneDeep(parLocState), ...parLocState.clearableFields };
    });
  };

  // handle input changes.
  const handleInput = (e) => {
    const outQty = parseInt(e.target.value) || "";

    // This can be used from either Items or Invoices.
    // Item might not yet exist in the session items, so we handle the input conditionally.
    if (outQty && inputMode === "add") {
      setSessionItemsSTRX({
        itemsArrRouteStr: "returnItems",
        itemAtom: activeAtom,
        newQty: outQty,
        actionType: "add",
      });
    } else if (inputMode === "edit") {
      setSessionItemsSTRX({
        itemsArrRouteStr: "returnItems",
        itemAtom: activeAtom,
        newQty: outQty,
        actionType: "edit",
      });
    }
  };

  return (
    <main className={`mrvPanel__side color__surface__default itemDetails30`}>
      <TitleBarSTRX
        hasCluster={false}
        showProductName={false}
        hasIcon={"back"}
        navBtnClick={handleClose}
        headerTitle={"Item Details"}
      />
      <section className={`main_content`}>
        <div className={``}>
          <MRVitemDetails
            showPrice={false}
            showQty={false}
            thisItemAtom={activeAtom}
          />
        </div>

        <MRVinput width={"8rem"}>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Qty"
            value={activeConfig.inputVal}
            onChange={(event) => {
              handleInput(event);
            }}
          />
        </MRVinput>
      </section>
    </main>
  );
};

export { ItemDetails30STRX };
