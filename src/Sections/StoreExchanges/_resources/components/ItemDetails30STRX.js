import "./ItemDetails30STRX.css";

import { TitleBarSTRX } from "./CompConfigsSTRX";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useSetSessionItems} from "../../../../mrv/MRVhooks/MRVhooks";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router";

const ItemDetails30STRX = ({
  stateItemArr,
  parLocState,
  setParLocState,
  panelConfigStr = "return",
}) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setSessionItems = useSetSessionItems();

  const activeAtom = parLocState.activeItemAtom;
  const activeItemNum = activeAtom?.atomItemNum;

  const thisStateAtom = sessionMRV[stateItemArr].find(
    (item) => item.atomItemNum === activeItemNum
  );

  const inputMode = thisStateAtom ? "edit" : "add";

  const oConfigs = {
    edit: { actionType: "edit", inputVal: thisStateAtom?.atomItemQty },
    add: { actionType: "add", inputVal: "" },
  };

  const oPanelConfigs = {
    return: { fieldLabel: "Qty Returned" },
  };

  const activeConfig = oConfigs[inputMode];
  const panelConfig = oPanelConfigs[panelConfigStr];


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
      setSessionItems({
        itemsArrRouteStr: "returnItems",
        itemAtom: activeAtom,
        newQty: outQty,
        actionType: "add",
      });
    } else if (inputMode === "edit") {
      setSessionItems({
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

        <div className={`hBox minFlex gap1rem`}>
          <MRVinput width={"9rem"} helperText={panelConfig.fieldLabel}>
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
          <div className={`body`}></div>
        </div>
      </section>
    </main>
  );
};

export { ItemDetails30STRX };
