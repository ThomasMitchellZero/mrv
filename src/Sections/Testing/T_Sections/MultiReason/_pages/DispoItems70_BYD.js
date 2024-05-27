

import {
  returnAtom,
  baseReturnState,
  ItemDisposObj,
  SingleDispo,
} from "../../../../../globalFunctions/globalJS_classes";

import { TitleBarMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/CashTotalMRV";
import { TableRowBYD } from "./TableRowBYD";



const DispoItems70 = ({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
  handleContinue = () => console.log("No Continue Handler Provided"),
  titleBar = (
    <TitleBarMRV
      showProductName={true}
      headerTitle={`Return Items List`}
    />
  ),
  cashTotal = <CashTotalMRV mode={"exchDelta"} sessionState={sessionState} />,
}) => {

  const uiCardArray = sessionState.returnItemDispos.map((iItemDispoObj) => {
    const refItemDisposObj = new ItemDisposObj({});

    return (
      <TableRowBYD
        key={iItemDispoObj.dispoItemNum}
        thisItemDisposObj={iItemDispoObj}
        sessionState={sessionState}
        setSessionState={setSessionState}
      />
    );
  });

  return (
    <main className={`mrvPanel__main`}>
      {titleBar}
      <div className={`main_content`}>
        <div className={`cardContainer disposGrid`}>{uiCardArray}</div>
      </div>
      <div className={`footer_content`}>
        {cashTotal}
        <div
          onClick={(e) => {
            console.log("button BG register");
            e.stopPropagation();
          }}
          className={`buttonBox25`}
        >
          <button className={`primary jumbo maxFlex`} onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </main>
  );
};

export { DispoItems70 };
