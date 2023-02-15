import classes from "./FinalizeRefund.module.css";

import tenderSort from "../functions/tenderSort";
import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "../functions/tenderStatusCodes";

// Shared Components
import TenderBadges from "./TenderBadges";
import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TenderTypesLI from "./TenderTypesLI";
import InPageTitleBox from "../../../components/UI/DisplayOutputs/InPageTitleBox";
import MessageRibbon from "../../../components/UI/DisplayOutputs/MessageRibbon";

//70 Panels
import UserInput70 from "./Finalize70panels/UserInput70";
import ConfirmCash70 from "./Finalize70panels/ConfirmCash70";
import Payout70 from "./Finalize70panels/Payout70";
import Placeholder from "../../Placeholder/Placeholder";

import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

const FinalizeRefund = () => {
  console.log("DING");
  // Returns Session
  const sessionCtx = useOutletContext().session;
  const dispatchSession = useOutletContext().dispatchSession;

  const ctxTendersPack = sessionCtx.refunds_by_tender;
  const failureScenario = sessionCtx.scenarios.totalTenderFailure;
  const dispatchTenderArr = (newTendersArr) => {
    dispatchSession({
      type: "UPDATE_TENDERS",
      payload: { newtendersArr: newTendersArr },
    });
  };

  // Specifics from Returns Session state
  const tendersArr = ctxTendersPack.tendersArr;
  const activeIndex = ctxTendersPack.activeIndex;

  const activeTenderObj = tendersArr[activeIndex];
  const activeStatus = activeTenderObj.status;
  const activeType = activeTenderObj.tenderType;

  // ---- SHARED FUNCTIONS ----

  //TODO - can probably be universalized to handle cash, too?
  const tTypeSwapper = (swapTo) => {
    const swappedLabels = {
      [tType.cash]: "Cash",
      [tType.storeCredit]: "Store Credit",
    };

    //0-0 pay attention, cloneDeep caused an error when called.
    let outTendersArr = [...tendersArr]

    // Change the active tender's info to Swapped.
    outTendersArr[activeIndex] = {
      ...activeTenderObj,
      status: tStatus.swapped,
      swapLabel: swappedLabels[swapTo],
    };

    //Adjust the type being swapped to.
    const activePaid = activeTenderObj.paid;
    let foundIndex = outTendersArr.findIndex((tender) => {
      return tender.tenderType === tType[swapTo];
    });

    // If this type doesn't already exist...
    if (foundIndex === -1) {
      // add it to start of array
      outTendersArr.unshift({
        tenderType: tType[swapTo],
        paid: 0,
      });
      foundIndex = 0;
    }
    outTendersArr[foundIndex] = {...outTendersArr.foundIndex}
    outTendersArr[foundIndex].paid += activePaid;
    dispatchTenderArr(outTendersArr);
  };

  // Not sure if needed
  const emptyUI = (
    <Placeholder
      titleText="Blank"
      extraClasses={`seventy_panel `}
      pageText="You shouldn't be here"
    />
  );

  /*
<button
  type="button"
  className={`baseButton secondary large ${isActive}`}
  onClick={() => {
    dispatchLookup({ type: "SET_ACTIVE", payload: searchType });
  }}
>
  {icon}
  {text}
</button>
  
  
  */

  const testFunc = (swapTo)=>{
    console.log(swapTo)
  }


  const buttoner = (style, text, whenClicked) => {
    const sizes = {
      primary: "contained70",
      secondary: "containedBtn2",
    };
    return (
      <button
        onClick={whenClicked}
        className={`baseButton large ${style} ${sizes[style]}`}
      >
        {text}
      </button>
    );
  };

  const paths70 = {
    [tStatus.failure]: (
      <UserInput70
        activeTenderObj={activeTenderObj}
        mainButton={buttoner("primary", "Refund Store Credit", ()=> tTypeSwapper(tType.storeCredit))}
        altButton={buttoner("secondary", "Refund Cash")}
      />
    ),

    [tStatus.progress2Line]: <ConfirmCash70 />,

    [tStatus.inProgress]: {
      [tType.cash]: <Payout70 activeTenderObj={activeTenderObj} />,
      [tType.storeCredit]: <Payout70 activeTenderObj={activeTenderObj} />,
      [tType.debit]: <UserInput70 />,
      [tType.check]: <UserInput70 />,
    },
  };

  // Use active panel for active Status unless panel also depends on Type
  //TODO - this is a crappy description.
  const active70 =
    paths70?.[activeStatus]?.[activeType] ?? paths70?.[activeStatus] ?? emptyUI;

  // Make array of the <TenderTypesLI>s  from the sorted tendersArr
  const tendersLIarr = tendersArr.map((thisTenderObj) => {
    return (
      <TenderTypesLI key={thisTenderObj.primaryKey} tenderObj={thisTenderObj} />
    );
  });

  console.log("dong");

  return (
    <section className={classes.container}>
      <section className={`thirty_panel }`}>
        <TitleBar>Tender Types</TitleBar>
        <section className={`${classes.mainContent} ${classes.content30}`}>
          {tendersLIarr}
        </section>
        <FooterContainer></FooterContainer>
      </section>
      {active70}
    </section>
  );
};

export default FinalizeRefund;
