//itemCard

import { MRVitemDetails } from "../../DisplayOutputs/mrvItemDetails";

import { useDispoMainMethods } from "./DispoMainPageMRV";

import { baseLocState } from "../../../../globalFunctions/globalJS_classes";

import { BadgeMRV } from "../../DisplayOutputs/BadgeMRV";

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
  
    const allAssignedDisposObj = locMethods.filterAssignedDispos({
      thisItemDisposObj: thisItemDisposObj,
    });
  
    // separating these two in case I want to handle them differently later.
    const uiAssignedDamaged = allAssignedDisposObj.damaged.map(
      (thisSingleDispo) => {
        const refSingleDispo = new SingleDispo({});
        const badgeText = `${thisSingleDispo.strLabel} : ${thisSingleDispo.dispoQty}`;
        return <BadgeMRV key={thisSingleDispo.dispoKey} badgeText={badgeText} />;
      }
    );
    const uiAssignedDidntWant = allAssignedDisposObj.didntWant.map(
      (thisSingleDispo) => {
        const refSingleDispo = new SingleDispo({});
        const badgeText = `${thisSingleDispo.strLabel}`;
        return <BadgeMRV key={thisSingleDispo.dispoKey} badgeText={badgeText} />;
      }
    );
  
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
            underArr={[...uiAssignedDidntWant, ...uiAssignedDamaged]}
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
