//itemCard

import { useOutletContext } from "react-router";

import {
  centStringifier,
  centsToDollars,
} from "../../../../../mrv/MRVhooks/MRVhooks";
import { useDispoMainMethods } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";
import {
  returnAtom,
  baseReturnState,
  baseLocState,
  ItemDisposObj,
  SingleDispo,
} from "../../../../../globalFunctions/globalJS_classes";

import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";

import { BadgeMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/BadgeMRV";

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
      className={` disposGrid BYDtableRow ${isActive}`}
      onClick={(e) => {
        handleCardClick(e);
      }}
    >
      <div className={`gCol activeBar`}></div>
      <div className={`gCol spaceBar`}></div>
      <div className={`gCol invoice`}>
        <div
          className={`body__small color__primary__text minFlex minWidth`}
        >#888333</div>
      </div>
      <div className="itemDetailsCtnr">
        <MRVitemDetails
          showPrice={false}
          showQty={false}
          thisItemAtom={thisAtom}
          underArr={[...uiAssignedDidntWant, ...uiAssignedDamaged]}
        />
      </div>

      <div className={`gCol unitPrice`}>
        <div className={`body bold color__primary__text minFlex minWidth`}>
          {centStringifier({
            valueInCents: thisItemDisposObj.dispoItemAtom.atomMoneyObj.subTotal,
          })}
        </div>
      </div>
      <div className={`gCol itemQty`}>
        <div className={`body__small color__primary__text minFlex minWidth`}>
          {thisItemDisposObj.itemQty}
        </div>
      </div>
      <div className={`gCol totalPrice`}>
        <div className={`body bold color__primary__text minFlex minWidth`}>
          {centStringifier({
            valueInCents:
              thisItemDisposObj.dispoItemAtom.atomMoneyObj.subTotal *
              thisItemDisposObj.itemQty,
          })}
        </div>
      </div>
      <div className={`gCol status`}></div>
    </div>
  );
};

export { TableRowBYD };
