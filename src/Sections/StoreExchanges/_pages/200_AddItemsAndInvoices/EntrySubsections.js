import "./_AddItemsAndInvos.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry = ({ parentLocSt, setParentLocSt }) => {
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;

  const oErrorStates = {
    invalidItem:{},
    invalidQty:{}
  }

  return (
    <form className={`inputSection`}>
      <div className={``}>
        <MRVinput flex={"1 1 0rem"}>
          <input
            type="text"
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
      <div className={`inputRow`}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
            value={parLocState.itemQtyField}
            onChange={(event) => {
              const fieldInput = event.target.value;
              setParLocState((draft) => {
                draft.itemNumField = fieldInput;
              });
            }}
          />
        </MRVinput>
        <button className={`secondary`}>Add Item</button>
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
