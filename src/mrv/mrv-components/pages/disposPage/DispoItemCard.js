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
  setSessionState = () => console.log("No Session State Setter Provided"),
}) => {
  const refBaseReturnState = baseReturnState({});
  const refItemDisposObj = new ItemDisposObj({});
  const refSingleDispo = new SingleDispo({});

  const thisAtom = thisItemDisposObj.dispoItemAtom || new returnAtom({});
  const thisItemNum = thisAtom.atomItemNum;

  const isActive =
    thisItemNum === parLocState.activeItemNum
      ? "selected"
      : "";

  const allProvided =
    thisItemDisposObj.qtySansDispo === thisItemDisposObj.dispoItemAtom.itemQty;

  const sProvidedColor = allProvided
    ? "color__green__text"
    : "color__red__text";

  const handleCardClick = () => { };


  return (
    <div
      key={thisItemNum}
      className={`cardStyle hasHover disposGrid ${isActive}`}
      onClick={(e) => {
        e.stopPropagation();
        setParLocState( (draft) => {
          draft.activeItemNum = thisItemNum;
        });
      }}
    >
      <div className="itemDetailsCtnr">
        <MRVitemDetails
          showPrice={false}
          showQty={false}
          thisItemAtom={thisAtom}
        />
      </div>
      <div className={`gCol itemQty`}>
        <div
          className={`heading__medium color__primary__text hBox minFlex minWidth`}
        >
          {thisItemDisposObj.itemQty}
        </div>
      </div>
      <div className={`gCol dispoQty`}>
        <div
          className={`heading__medium ${sProvidedColor} hBox minFlex minWidth`}
        >
          {thisItemDisposObj.itemQty - thisItemDisposObj.qtySansDispo}
        </div>
      </div>
      <div className={`gCol disposBadges`}></div>
    </div>
  );
};

export { DispoItemCard };
