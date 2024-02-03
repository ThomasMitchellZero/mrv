import "./_AddItemsAndInvos.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

const ItemEntry = ({ parentLocSt, setParentLocSt }) => {
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;

  return (
    <form>
      <div className={`inputSection`}>
        <MRVinput flex={"1 1 0rem"}>
          <input
            type="string"
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
      <div className={`inputSection`}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
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
    </form>
  );
};

const ReceiptEntry = ({ parentLocSt, setParentLocSt }) => {
  const parLocState = parentLocSt;
  const setParLocState = setParentLocSt;

  return (
    <>
      <div className={`inputSection`}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
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
