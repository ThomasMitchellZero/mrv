import "./_AddItemsAndInvos.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useOutletContext } from "react-router";

import { useMRVAddItem } from "../../../../mrv/MRVhooks/MRVhooks";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry = ({ parentLocSt, setParentLocSt }) => {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;
  const mrvAddItem = useMRVAddItem();

  const oErrorStates = {
    invalidItem: {},
    invalidQty: {},
  };

  const itemFormValidation = () => {
    return true;
  };

  const handleAddItem = (event) => {

    event.preventDefault();
    
    const bFormValid = true;

    if (bFormValid) {
      // create a new session returnItems obj with item + qty added to it.
      const outItemsObj = mrvAddItem({
        targetAllItemsObj: sessionState.returnItems,
        itemNum: parLocState.itemNumField,
        qtyToAdd: parLocState.itemQtyField,
      });

      setSession((draft) => {
        draft.returnItems = outItemsObj;
      });
      setParLocState((draft) => {
        draft.itemNumField = "";
        draft.itemQtyField = "";
      });
    }
  };

  return (
    <form
      id={"addItemForm"}
      onSubmit={handleAddItem}
      className={`inputSection`}
    >
      <MRVinput flex={"1 1 0rem"}>
        <input
          type="text"
          value={parLocState.itemNumField}
          onChange={(event) => {
            const itemNumField = event.target.value;
            setParLocState((draft) => {
              draft.itemNumField = itemNumField;
            });
          }}
        />
      </MRVinput>

      <div className={`inputRow`}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
            value={parLocState.itemQtyField}
            onChange={(event) => {
              const inputQty = parseInt(event.target.value) || "";
              setParLocState((draft) => {
                draft.itemQtyField = inputQty;
              });
            }}
          />
        </MRVinput>
        <button form="addItemForm" type="submit" className={`secondary`}>
          Add Item
        </button>
      </div>
      <p className={`warning`}>fart</p>
    </form>
  );
};

/* &&&&&&&&&&&&&&   Receipt Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ReceiptEntry = ({ parentLocSt, setParentLocSt }) => {
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;

  return (
    <>
      <div className={`inputSection`}>
        <MRVinput flex={"1 1 0rem"}>
          <input
            value={parLocState.itemNumField}
            onChange={(event) => {
              const fieldInput = event.target.value;
              setParLocState((draft) => {
                draft.itemNumField = fieldInput;
              });
            }}
          />
        </MRVinput>
      </div>
    </>
  );
};

export { ItemEntry, ReceiptEntry };
