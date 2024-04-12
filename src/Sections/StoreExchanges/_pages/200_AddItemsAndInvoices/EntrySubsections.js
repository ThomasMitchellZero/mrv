import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useOutletContext } from "react-router";
import { useContext } from "react";

import { returnAtom } from "../../../../globalFunctions/globalJS_classes";

import {} from "../../../../mrv/MRVhooks/MRVhooks";

import {
  useSetSessionItemsSTRX,
  useSetSessionInvosSTRX,
} from "../../_resources/hooks/STRXhooks";
import cloneDeep from "lodash.clonedeep";
import InvoContext from "../../../../store/invo-context";
import ProductContext from "../../../../store/product-context";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry = ({ parentLocSt, setParentLocSt }) => {
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;
  const setSessionItemsSTRX = useSetSessionItemsSTRX();
  const productCtx = useContext(ProductContext);
  const invoCtx = useContext(InvoContext);

  const clearableFields = {
    itemNumField: "",
    itemQtyField: "",
    receiptNumField: "",
    activeItemAtom: null,
    storeNumField: "",
    dateField: "",
    oActiveErrorState: null,
    activeErrorKey: "",
    active30: "AllEntry30",
  };

  const oErrorStates = {
    invalidItem: {},
    invalidQty: {},
  };

  const errorInItemForm = () => {
    const thisItemNum = parLocState.itemNumField;
    const thisQty = parLocState.itemQtyField;
    const itemNumValid = thisItemNum in productCtx;
    console.log(itemNumValid);
    console.log(thisQty);

    let outFormError = !itemNumValid
      ? "invalidItem"
      : !thisQty
      ? "invalidQty"
      : false;

    return outFormError;
  };

  const itemErrorStr = parLocState.oErrorStates[parLocState.activeErrorKey];

  const handleAddItem = (event) => {
    event.preventDefault();

    const formError = errorInItemForm();

    if (formError) {
      setParLocState((draft) => {
        draft.activeErrorKey = formError;
      });
    } else {
      const outAtom = new returnAtom({
        atomItemNum: parLocState.itemNumField,
        atomItemQty: parLocState.itemQtyField,
      });

      setSessionItemsSTRX({
        itemAtom: outAtom,
        newQty: parLocState.itemQtyField,
        actionType: "add",
        itemsArrRouteStr: "returnItems",
      });

      // reset the clearable fields in the local state.
      let outLocState = cloneDeep(parLocState);
      outLocState = { ...outLocState, ...parLocState.clearableFields };
      setParLocState(() => outLocState);
    }
  };

  return (
    <form
      id={"addItemForm"}
      onSubmit={handleAddItem}
      className={`inputSection`}
    >
      <MRVinput
        flex={"1 1 0rem"}
        width={`100%`}
        hasError={parLocState.activeErrorKey === "invalidItem"}
      >
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
        <MRVinput
          width={"8rem"}
          hasError={parLocState.activeErrorKey === "invalidQty"}
        >
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
      <p className={`warning`}>{itemErrorStr}</p>
    </form>
  );
};

/* &&&&&&&&&&&&&&   Receipt Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ReceiptEntry = ({ parentLocSt, setParentLocSt }) => {
  const invoCtx = useContext(InvoContext);
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;
  const setSessionInvosSTRX = useSetSessionInvosSTRX();

  const errorInInvoForm = () => {
    const thisInvoNum = parLocState.receiptNumField;
    const invoNumValid = thisInvoNum in invoCtx;

    let outFormError = !invoNumValid ? "invalidReceipt" : false;

    return outFormError;
  };

  const invoErrorStr = parLocState.oErrorStates[parLocState.activeErrorKey];

  const handleAddInvo = (event) => {
    event.preventDefault();
    const invoFormError = errorInInvoForm();

    if (invoFormError) {
      setParLocState((draft) => {
        draft.activeErrorKey = invoFormError;
      });
    } else {
      setSessionInvosSTRX({
        invosRtStr: "sessionInvos",
        invoNum: parLocState.receiptNumField,
        actionType: "add",
      });

      // clear the input fields in the local state.
      let outLocState = cloneDeep(parLocState);
      outLocState = { ...outLocState, ...parLocState.clearableFields };
      setParLocState(() => outLocState);
    }
  };

  return (
    <form
      id={"addInvoForm"}
      className={`inputSection`}
      onSubmit={handleAddInvo}
    >
      <MRVinput
        flex={"1 1 0rem"}
        width={`100%`}
        hasError={parLocState.activeErrorKey === "invalidReceipt"}
      >
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
      <p className={`warning`}>{invoErrorStr}</p>
    </form>
  );
};

export { ItemEntry, ReceiptEntry };
