import { DispoItemCard } from "./DispoItemCard";

import {
    SingleDispo,
    ItemDisposObj,
    baseReturnState,
  } from "../../../../globalFunctions/globalJS_classes";
  import { TitleBarMRV } from "../../DisplayOutputs/TitleBarMRV";
  import { CashTotalMRV } from "../../DisplayOutputs/CashTotalMRV";



const DispoItems70 = ({
  parLocState,
  setParLocState,
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
  handleContinue = () => console.log("No Continue Handler Provided"),
  titleBar = (
    <TitleBarMRV
      showProductName={true}
      headerTitle={`Provide reason for return`}
    />
  ),
  cashTotal = <CashTotalMRV mode={"exchDelta"} sessionState={sessionState} />,
}) => {
  const uiCardArray = sessionState.returnItemDispos.map((iItemDispoObj) => {
    const refItemDisposObj = new ItemDisposObj({});

    return (
      <DispoItemCard
        key={iItemDispoObj.dispoItemNum}
        thisItemDisposObj={iItemDispoObj}
        parLocState={parLocState}
        setParLocState={setParLocState}
        sessionState={sessionState}
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
