//itemCard

import { useOutletContext } from "react-router";
import { useDispoMainMethods } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";
import {
  returnAtom,
  baseReturnState,
  baseLocState,
  ItemDisposObj,
  SingleDispo,
} from "../../../../../globalFunctions/globalJS_classes";

import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";

const TableRowBYD = ({
  thisItemDisposObj = new ItemDisposObj({}),
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
}) => {

  const locMethods = useDispoMainMethods({
    sessionState,
    setSessionState,
  });

  // refit these to use context, but later.
  const sessionSt = sessionState;
  const locSt = sessionSt.locSt;


  const refLocState = baseLocState({});

  const thisAtom = thisItemDisposObj.dispoItemAtom || new returnAtom({});
  const thisItemNum = thisAtom.atomItemNum;

  const isActive = thisItemNum === locSt.pageActiveKey1 ? "selected" : "";

  const allProvided =
    thisItemDisposObj.qtySansDispo === thisItemDisposObj.dispoItemAtom.itemQty;

  const sProvidedColor = allProvided
    ? "color__green__text"
    : "color__red__text";

  const handleCardClick = (e) => {
    e.stopPropagation();
    locMethods.setActiveItem({ keyStr: thisItemNum });
  };

  return (
    <div
      key={thisItemNum}
      className={`cardStyle hasHover disposGrid BYDtableRow ${isActive}`}
      onClick={(e) => {
        handleCardClick(e);
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
        <p>fart</p>
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

export { TableRowBYD };
