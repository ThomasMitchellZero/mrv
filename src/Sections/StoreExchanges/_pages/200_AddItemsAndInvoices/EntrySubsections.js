import "./_AddItemsAndInvos.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useOutletContext } from "react-router";

import {
  useAddItemAtom,
  useReturnAtomizer,
} from "../../../../mrv/MRVhooks/MRVhooks";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry = ({ parentLocSt, setParentLocSt }) => {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;
  const addItemAtom = useAddItemAtom();
  const returnAtomizer = useReturnAtomizer();

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

      if (outItemsObj) {
        setSession((draft) => {
          draft.returnItems = outItemsObj;
          draft.atomizedReturnItems = returnAtomizer({
            sessionItemsObj: outItemsObj,
            sessionInvosObj: draft.sessionInvos,
          });
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
      <MRVinput flex={"1 1 0rem"}>
        <input
          type="text"
          value={parLocState.itemNumField}
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
                draft.oActiveErrorState = null;
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
