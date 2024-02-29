import "./_AddItemsAndInvos.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useOutletContext } from "react-router";

import {
  useAddItemAtom,
  useReturnAtomizer,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useAutoDeriverSTRX } from "../../_resources/hooks/STRXhooks";
import cloneDeep from "lodash.clonedeep";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry = ({ parentLocSt, setParentLocSt }) => {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;
  const addItemAtom = useAddItemAtom();
  const returnAtomizer = useReturnAtomizer();
  const autoDeriverSTRX = useAutoDeriverSTRX();

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
      const outItemsObj = addItemAtom({
        targetAllItemsObj: sessionState.returnItems,
        itemNumToAdd: parLocState.itemNumField,
        qtyToAdd: parLocState.itemQtyField,
      });

      // addItemAtom returns false if itemNumToAdd is isn't in itemCtx, hence this check.

      if (outItemsObj) {
        let outSessionState = cloneDeep(sessionState);
        outSessionState.returnItems = outItemsObj;
        outSessionState = autoDeriverSTRX(outSessionState);

        setSession(() => {
          return outSessionState;
        });
        setParLocState((draft) => {
          draft.itemNumField = "";
          draft.itemQtyField = "";
          draft.oActiveErrorState = null;
        });
      } else {
        setParLocState((draft) => {
          draft.oActiveErrorState = oErrorStates.invalidItem;
        });
      }
    }
  };

  return (
    <form
      id={"addItemForm"}
      onSubmit={handleAddItem}
      className={`inputSection`}
    >
      <MRVinput flex={"1 1 0rem"} width={`100%`}>
        <input
          type="text"
          value={parLocState.itemNumField}
          placeholder="Item Number"
          onChange={(event) => {
            const itemNumField = event.target.value;
            setParLocState((draft) => {
              draft.itemNumField = itemNumField;
              draft.oActiveErrorState = null;
            });
          }}
        />
      </MRVinput>

      <div className={`inputRow`}>
        <MRVinput width={"8rem"}>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Qty"
            value={parLocState.itemQtyField}
            onChange={(event) => {
              const inputQty = parseInt(event.target.value) || "";
              setParLocState((draft) => {
                draft.itemQtyField = inputQty;
                draft.oActiveErrorState = null;
              });
            }}
          />
        </MRVinput>
        <div className={`hBox maxFlex`} />
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

  let invoFormValidation = () => {
    return true;
  };

  const handleAddInvo = (event) => {
    event.preventDefault();
  };

  return (
    <form className={`inputSection`} onSubmit={handleAddInvo}>
      <MRVinput flex={"1 1 0rem"} width={`100%`}>
        <input
          type="text"
          placeholder="Receipt Number"
          value={parLocState.itemNumField}
          onChange={(event) => {
            const fieldInput = event.target.value;
            setParLocState((draft) => {
              draft.itemNumField = fieldInput;
            });
          }}
        />
      </MRVinput>
      <div className={`inputRow`}>
        <MRVinput flex={"2 2 0rem"}>
          <input
            placeholder="Store"
            type="text"
            value={parLocState.storeNumField}
            onChange={(event) => {
              const fieldInput = event.target.value;
              setParLocState((draft) => {
                draft.storeNumField = fieldInput;
              });
            }}
          />
        </MRVinput>
        <MRVinput flex={"3 3 0rem"}>
          <input
            type="date"
            placeholder="Sale Date"
            value={parLocState.dateField}
            onChange={(event) => {
              const fieldInput = event.target.value;
              setParLocState((draft) => {
                draft.dateField = fieldInput;
              });
            }}
          />
        </MRVinput>
      </div>
      <div className={`inputRow`}>
        <button
          form="addItemForm"
          type="submit"
          className={`secondary minWidth`}
        >
          Add Receipt
        </button>
      </div>
    </form>
  );
};

export { ItemEntry, ReceiptEntry };
