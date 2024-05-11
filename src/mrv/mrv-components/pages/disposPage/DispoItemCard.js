//itemCard

import { MRVitemDetails } from "../../DisplayOutputs/mrvItemDetails";
import {
  Invoice_SR,
  returnAtom,
  baseReturnState,
  ItemDisposObj,
  SingleDispo,
} from "../../../../globalFunctions/globalJS_classes";

const DispoItemCard = ({
  thisItemDisposObj = new ItemDisposObj({}),
  parLocState,
  setParLocState,
  sessionState = baseReturnState({}),
}) => {
  const refBaseReturnState = baseReturnState({});
  const refItemDisposObj = new ItemDisposObj({});
  const refSingleDispo = new SingleDispo({});

  const thisAtom = thisItemDisposObj.dispoItemAtom || new returnAtom({});

  return (
    <div
      key={`123`}
      className={`cardStyle`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MRVitemDetails
        showPrice={false}
        showQty={false}
        thisItemAtom={thisAtom}
      />
    </div>
  );
};

export { DispoItemCard };
