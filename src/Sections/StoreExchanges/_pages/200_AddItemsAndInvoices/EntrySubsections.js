import "./_AddItemsAndInvos.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useOutletContext } from "react-router";
import { useContext } from "react";

import {
  useAddItemAtom,
  useReturnAtomizer,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useAutoDeriverSTRX } from "../../_resources/hooks/STRXhooks";
import cloneDeep from "lodash.clonedeep";
import InvoContext from "../../../../store/invo-context";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry = ({ parentLocSt, setParentLocSt }) => {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;
  const addItemAtom = useAddItemAtom();
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
      const outItemsArr = addItemAtom({
        targetItemsArr: sessionState.returnItems,
        itemNumToAdd: parLocState.itemNumField,
        qtyToAdd: parLocState.itemQtyField,
      });

      // addItemAtom returns false if itemNumToAdd is isn't in itemCtx, hence this check.

      if (outItemsArr) {

        // Set the session state to include this item.
        let outSessionState = cloneDeep(sessionState);
        outSessionState.returnItems = outItemsArr;
        outSessionState = autoDeriverSTRX(outSessionState);

        setSession(() => {
          return outSessionState;
        });

        // clear the input fields in the local state.
        let outLocState = cloneDeep(parLocState);
        outLocState = { ...outLocState, ...parLocState.clearableFields };
        setParLocState(() => outLocState);
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
  const strxCtx = useOutletContext();
  const invoCtx = useContext(InvoContext);
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;
  const autoDeriverSTRX = useAutoDeriverSTRX();

  let invoFormValid = true;

  const handleAddInvo = (event) => {
    event.preventDefault();

    if (invoFormValid) {
      const thisCtxInvo = invoCtx[parLocState.receiptNumField];
      if (thisCtxInvo) {
        // Set the session state to include this receipt.
        let outSessionState = cloneDeep(sessionState);
        outSessionState.sessionInvos[parLocState.receiptNumField] = thisCtxInvo;
        outSessionState = autoDeriverSTRX(outSessionState);
        setSession(() => {
          return outSessionState;
        });
        // clear the input fields in the local state.
        let outLocState = cloneDeep(parLocState);
        outLocState = { ...outLocState, ...parLocState.clearableFields };
        setParLocState(() => outLocState);
      }
    }
  };

  return (
    <form
      id={"addInvoForm"}
      className={`inputSection`}
      onSubmit={handleAddInvo}
    >
      <MRVinput flex={"1 1 0rem"} width={`100%`}>
        <input
          type="text"
          placeholder="Receipt Number"
          value={parLocState.receiptNumField}
          onChange={(event) => {
            const fieldInput = event.target.value.toUpperCase();
            setParLocState((draft) => {
              draft.receiptNumField = fieldInput;
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
          form="addInvoForm"
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
