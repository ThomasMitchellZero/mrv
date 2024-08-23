import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { MessageRibbonMRV } from "../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

import { Methods_AddItemsAndInvosSTRX } from "./AddItemsAndInvosSTRX";
import { useOutletContext } from "react-router";
import { useContext } from "react";

import { cloneDeep, isEmpty } from "lodash";

import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedInputs,
  errorObj,
  clearedErrors,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useSetSessionInvos,
  useSetSessionItems,
  useResetLocStFields,
} from "../../../../mrv/MRVhooks/MRVhooks";

import InvoContext from "../../../../store/invo-context";
import ProductContext from "../../../../store/product-context";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const locStRt = sessionMRV.locSt;
  const parentRt = sessionMRV.locSt.AllEntry30;
  const locMethods = Methods_AddItemsAndInvosSTRX({});

  const setSessionItems = useSetSessionItems();
  const productCtx = useContext(ProductContext);
  const invoCtx = useContext(InvoContext);

  const oErrors = {
    invalidItem: new errorObj({
      str: "Invalid Item Number",
    }),
    invalidQty: new errorObj({
      str: "Invalid Quantity",
    }),
  };

  const refClearErrors = clearedErrors;
  const activeErrorStr = parentRt?.activeError1?.str || "";

  /*
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
  */

  const refLocFields = locStFields;
  const refClearInputs = clearedInputs;

  const errorInItemForm = () => {
    const itemNumInput = parentRt.input1;
    const itemQtyInput = parentRt.input2;
    const itemNumValid = itemNumInput in productCtx;
    const itemQtyValid = itemQtyInput > 0;

    let outFormError = !itemNumValid
      ? oErrors.invalidItem
      : !itemQtyValid
      ? oErrors.invalidQty
      : false;

    return outFormError;
  };

  //const itemErrorStr = parLocState.oErrorStates[parLocState.activeErrorKey];

  const handleAddItem = (event) => {
    event.preventDefault();

    const formError = errorInItemForm();

    if (formError) {
      setSessionMRV((draft) => {
        draft.locSt.AllEntry30.activeError1 = formError;
      });
    } else {
      const outAtom = new returnAtom({
        atomItemNum: parentRt.input1,
        atomItemQty: parentRt.input2, // is this needed?
      });

      setSessionItems({
        itemAtom: outAtom,
        newQty: parentRt.input2,
        actionType: "add",
        itemsArrRouteStr: "returnItems",
      });

      // clear the inputs and then set the parent's local state.
      const outParLocSt = { ...cloneDeep(parentRt), ...clearedInputs };

      setSessionMRV((draft) => {
        draft.locSt.AllEntry30 = outParLocSt;
      });
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
        hasError={activeErrorStr === oErrors.invalidItem.str}
      >
        <input
          type="text"
          value={parentRt.input1}
          placeholder="Item Number"
          onChange={(event) => {
            const itemNumField = event.target.value;
            setSessionMRV((draft) => {
              draft.locSt.AllEntry30.input1 = itemNumField;
            });
          }}
        />
      </MRVinput>

      <div className={`inputRow`}>
        <MRVinput
          width={"8rem"}
          hasError={activeErrorStr === oErrors.invalidQty.str}
        >
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Qty"
            value={parentRt.input2}
            onChange={(event) => {
              const inputQty = parseInt(event.target.value) || "";
              setSessionMRV((draft) => {
                draft.locSt.AllEntry30.input2 = inputQty;
              });
            }}
          />
        </MRVinput>
        <div className={`hBox maxFlex`} />
        <button form="addItemForm" type="submit" className={`secondary`}>
          Add Item
        </button>
      </div>
      <p className={`warning`}>{activeErrorStr}</p>
    </form>
  );
};

/* &&&&&&&&&&&&&&   Receipt Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ReceiptEntry = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const parentRt = sessionMRV.locSt.AllEntry30;
  const locStRt = sessionMRV.locSt;
  const locMethods = Methods_AddItemsAndInvosSTRX({});

  const setSessionItems = useSetSessionItems();
  const setSessionInvosMRV = useSetSessionInvos();
  const productCtx = useContext(ProductContext);

  const noInvos = isEmpty(sessionMRV.sessionInvos);

  const invoCtx = useContext(InvoContext);

  const oErrors = {
    invalidReceipt: new errorObj({
      str: "Invalid Receipt Number",
    }),
    duplicateInvo: new errorObj({
      str: "Receipt Already Added",
    }),
  };

  const activeErrorStr = parentRt?.activeError1?.str || "";

  const errorInInvoForm = () => {
    const thisInvoNum = parentRt.input1;
    const invoNumValid = thisInvoNum in invoCtx;
    const invoAlreadyAdded = thisInvoNum in sessionMRV.sessionInvos;

    let outFormError = !invoNumValid
      ? oErrors.invalidReceipt
      : invoAlreadyAdded
      ? oErrors.duplicateInvo
      : false;

    console.log("outFormError function result was was", outFormError);

    return outFormError;
  };

  const handleAddInvo = (event) => {
    event.preventDefault();
    const invoFormError = errorInInvoForm();

    if (invoFormError) {
      console.log(invoFormError);
      setSessionMRV((draft) => {
        draft.locSt.AllEntry30.activeError1 = invoFormError;
      });
    } else {
      setSessionInvosMRV({
        invosRtStr: "sessionInvos",
        invoNum: parentRt.input1,
        actionType: "add",
      });

      // clear the input fields in the local state.
      let outLocState = { ...cloneDeep(parentRt), ...clearedInputs };
      setSessionMRV((draft) => {
        draft.locSt.AllEntry30 = outLocState;
      });
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
        hasError={
          activeErrorStr === oErrors.duplicateInvo.str ||
          activeErrorStr === oErrors.invalidReceipt.str
        }
      >
        <input
          type="text"
          placeholder="Receipt Number"
          value={parentRt.input1}
          onChange={(event) => {
            const fieldInput = event.target.value.toUpperCase();
            setSessionMRV((draft) => {
              draft.locSt.AllEntry30.input1 = fieldInput;
            });
          }}
        />
      </MRVinput>
      <div className={`inputRow`}>
        <MRVinput flex={"2 2 0rem"}>
          <input placeholder="Store" type="text" />
        </MRVinput>
        <MRVinput flex={"3 3 0rem"}>
          <input type="date" placeholder="Sale Date" />
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
      <p className={`warning`}>{activeErrorStr}</p>
    </form>
  );
};

export { ItemEntry, ReceiptEntry };
