import { TitleBarSTRX } from "./CompConfigsSTRX";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useSetSessionItemsSTRX } from "../hooks/STRXhooks";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router";

const ItemDetails30STRX = ({
  stateItemArr,
  parLocState,
  setParLocState,
  setItemState,
}) => {
  const activeAtom = parLocState.activeItemAtom;
  const activeItemNum = activeAtom?.atomItemNum;
  const clearFields = parLocState.clearableFields;
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;
  const thisStateAtom = sessionState[stateItemArr].find(
    (item) => item.atomItemNum === activeItemNum
  );

  const setSessionItemsSTRX = useSetSessionItemsSTRX();

  const handleClose = () => {
    setParLocState(() => {
      return { ...cloneDeep(parLocState), ...parLocState.clearableFields };
    });
  };

  const handleInput = (e) => {
    const outQty = parseInt(e.target.value) || "";
    setSessionItemsSTRX({
      itemsArrRouteStr: "returnItems",
      itemAtom: activeAtom,

      newQty: outQty,
      actionType: "edit",
    });
  };

  return (
    <main className={`mrvPanel__side color__surface__default`}>
      <TitleBarSTRX
        hasCluster={false}
        showProductName={false}
        hasIcon={"close"}
        navBtnClick={handleClose}
        headerTitle={"Item Details"}
      />
      <section className={`main_content`}>
        <div className={``}>
          <div className={``}>
            <MRVitemDetails
              showPrice={false}
              showQty={false}
              thisItemAtom={activeAtom}
            />
          </div>
          <div className={``}>
            <MRVinput width={"8rem"}>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Qty"
                value={thisStateAtom.atomItemQty}
                onChange={(event) => {
                  handleInput(event);
                }}
              />
            </MRVinput>
          </div>
        </div>
      </section>
    </main>
  );
};

export { ItemDetails30STRX };
