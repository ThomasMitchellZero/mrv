import {
  returnAtom,
  baseReturnState,
  ItemDisposObj,
  SingleDispo,
} from "../../../../../globalFunctions/globalJS_classes";

import { TitleBarMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/CashTotalMRV";
import { TableRowBYD } from "./TableRowBYD";

import { HeaderBYDMRV } from "../../../../../mrv/byd_mrv/HeaderBYDMRV";

import { DispoItemCard } from "../../../../../mrv/mrv-components/pages/disposPage/DispoItemCard";

const DispoItems70BYD = ({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
  handleContinue = () => console.log("No Continue Handler Provided"),

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
      <HeaderBYDMRV title={`Return Item List`} />

      <div className={`main_content`}>
        {/*headers*/}
        <div className={`disposGrid BYDheaderRow`}>
          <div className={`gCol activeBar `}></div>
          <div className={`gCol spaceBar `}></div>
          <div className={`gCol invoice body__small bold`}>Invoice #</div>
          <div className="itemDetailsCtnr body__small bold">
            Product Details
          </div>

          <div className={`gCol unitPrice body__small bold`}>Unit Price</div>
          <div className={`gCol itemQty body__small bold`}>Qty</div>
          <div className={`gCol totalPrice body__small bold`}>Total Price</div>
          <div className={`gCol status body__small bold`}>Status</div>
        </div>
        <div className={`cardContainer disposGrid`}>{uiCardArray}</div>
      </div>
      <div className={`footer_content color__surface__subdued`}>
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

export { DispoItems70BYD };
